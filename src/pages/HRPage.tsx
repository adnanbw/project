import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { EmployeeList } from '../components/hr/EmployeeList';
import { EmployeeForm } from '../components/hr/forms/EmployeeForm';
import { Modal } from '../components/common/Modal';
import { getEmployees, createEmployee } from '../services/hr/employees';
import type { Employee } from '../types/employee';

export function HRPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNewEmployeeModalOpen, setIsNewEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    async function loadEmployees() {
      try {
        setLoading(true);
        const data = await getEmployees();
        setEmployees(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load employees');
      } finally {
        setLoading(false);
      }
    }

    loadEmployees();
  }, []);

  const handleNewEmployee = async (employee: Omit<Employee, 'id'>) => {
    try {
      const newEmployee = await createEmployee(employee);
      setEmployees(prev => [newEmployee, ...prev]);
      setIsNewEmployeeModalOpen(false);
    } catch (err) {
      console.error('Failed to create employee:', err);
      alert('Failed to create employee. Please try again.');
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="text-red-600">Error: {error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Employee Management
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage employee information, attendance, and leave requests
          </p>
        </div>

        <div className="space-y-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Employees</h3>
              <button
                onClick={() => setIsNewEmployeeModalOpen(true)}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Add Employee
              </button>
            </div>
            {loading ? (
              <div className="text-center py-4">Loading employees...</div>
            ) : (
              <EmployeeList
                employees={employees}
                onSelect={setSelectedEmployee}
              />
            )}
          </section>
        </div>
      </div>

      <Modal
        isOpen={isNewEmployeeModalOpen}
        onClose={() => setIsNewEmployeeModalOpen(false)}
        title="Add New Employee"
      >
        <EmployeeForm
          onSubmit={handleNewEmployee}
          onCancel={() => setIsNewEmployeeModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        title="Employee Details"
      >
        {selectedEmployee && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <img
                src={selectedEmployee.imageUrl}
                alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
                className="h-16 w-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-medium">
                  {selectedEmployee.firstName} {selectedEmployee.lastName}
                </h3>
                <p className="text-sm text-gray-500">{selectedEmployee.position}</p>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Department</dt>
                <dd className="mt-1 text-sm text-gray-900">{selectedEmployee.department}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{selectedEmployee.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="mt-1 text-sm text-gray-900">{selectedEmployee.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Join Date</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(selectedEmployee.joinDate).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </Modal>
    </Layout>
  );
}