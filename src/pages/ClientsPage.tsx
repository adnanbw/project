import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from 'react';
import { Layout } from '../components/Layout';
import { ClientForm } from '../components/clients/forms/ClientForm';
import { Modal } from '../components/common/Modal';
import { Plus } from 'lucide-react';
import { getClients, createClient, updateClient, deleteClient } from '../services/clients/clients';
import type { Client } from '../types/client';
import { ClientList } from '../components/clients/ClientList';
import { getClientDetails } from '../services/clients/clients';



export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // For Add/Edit Client Modal
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedClientDetails, setSelectedClientDetails] = useState<Client | null>(null); // For Client Details Modal
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof Client>('company');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const clientsPerPage = 5;

  const handleSort = (field: keyof Client) => {
    if (sortBy === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const handleViewDetails = async (client: Client) => {
    try {
      const { client: detailedClient, projects } = await getClientDetails(client.id); // Use client.id to fetch details
      setSelectedClientDetails({ ...detailedClient, projects }); // Include projects in the details
    } catch (err) {
      console.error('Error fetching client details:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };


  useEffect(() => {
    async function loadClients() {
      try {
        setLoading(true);
        const data = await getClients();
        console.log('Fetched clients:', data);
        setClients(data);
      } catch (err) {
        console.error('Error fetching clients:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadClients();
  }, []);

  const totalPages = Math.ceil(clients.length / clientsPerPage);
  const filteredClients = clients.filter((client) => {
    const name = client.company?.toLowerCase() || '';
    const email = client.email?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();

    return name.includes(query) || email.includes(query);
  });

  const sortedAndFilteredClients = [...filteredClients].sort((a, b) => {
    const fieldA = a[sortBy]?.toString().toLowerCase() || '';
    const fieldB = b[sortBy]?.toString().toLowerCase() || '';
    if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedClients = sortedAndFilteredClients.slice(
    (currentPage - 1) * clientsPerPage,
    currentPage * clientsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
/*
  const handleCreateOrUpdate = async (client: Omit<Client, 'id' | 'createdAt' | 'projects'>) => {
    try {
      if (selectedClient) {
        // Update existing client
        const updatedClient = await updateClient({ ...selectedClient, ...client });
        setClients((prev) =>
          prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
        );
      } else {
        // Create new client
        const newClient = await createClient(client);
        setClients((prev) => [...prev, newClient]);
      }
      setIsModalOpen(false);
      setSelectedClient(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error saving client');
    }
  };  
*/
const handleCreateOrUpdate = async (client: Omit<Client, 'id' | 'createdAt' | 'projects'>) => {
  try {
    if (selectedClient) {
      const updatedClient = await updateClient({ ...selectedClient, ...client });
      setClients((prev) =>
        prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
      );
    } else {
      const newClient = await createClient(client);
      setClients((prev) => [...prev, newClient]);
    }
    setIsModalOpen(false);
    setSelectedClient(null);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Error saving client');
  }
};



  const handleDelete = async (clientId: string) => {
    try {
      await deleteClient(clientId);
      setClients((prev) => prev.filter((client) => client.id !== clientId));
    } catch (err: any) {
      if (err.code === '23503') {
        setError('This client is connected to a project and cannot be deleted.');
      } else {
        setError(err.message || 'Error deleting client');
      }
    }
  };

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clients</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
          />
          <button
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              setSelectedClient(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="mr-2 h-5 w-5" /> Add Client
          </button>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <ClientList
          clients={paginatedClients}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSort={handleSort}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onViewDetails={handleViewDetails}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedClient ? 'Edit Client' : 'Add Client'}
      >
        <ClientForm
          initialData={selectedClient}
          onSave={handleCreateOrUpdate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!selectedClientDetails}
        onClose={() => setSelectedClientDetails(null)}
        title="Client Details"
      >
        {selectedClientDetails && (
          <div className="space-y-4">
            <p><strong>ID:</strong> {selectedClientDetails.id}</p>
            <p><strong>Email:</strong> {selectedClientDetails.email || 'Not provided'}</p>
            <p><strong>Phone:</strong> {selectedClientDetails.phone || 'Not provided'}</p>
            <p><strong>Company:</strong> {selectedClientDetails.company || 'Not provided'}</p>
            <p><strong>Type:</strong> {selectedClientDetails.type || 'Not provided'}</p>
            <p><strong>Status:</strong> {selectedClientDetails.status || 'Not provided'}</p>
            <p><strong>Notes:</strong> {selectedClientDetails.notes || 'Not provided'}</p>

            {/* Associated Projects */}
            <div>
              <h3 className="text-lg font-semibold">Associated Projects:</h3>
              {selectedClientDetails.projects?.length > 0 ? (
                <ul className="list-disc ml-6">
                  {selectedClientDetails.projects.map((project: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; status: any; }) => (
                    <li key={project.id}>
                      <strong>{project.name}</strong> - {project.status || 'Not provided'}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No associated projects.</p>
              )}
            </div>
          </div>
        )}
      </Modal>


      <div className="flex justify-between items-center mt-4">
        <button
          className="btn btn-secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </Layout>
  );
}
