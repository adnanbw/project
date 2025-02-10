import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ClientProvider } from './context/ClientContext';
import { AccountingPage } from './pages/AccountingPage';
import { HRPage } from './pages/HRPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ClientsPage } from './pages/ClientsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { TimeTracking } from './pages/TimeTracking';

export default function App() {
  return (
    <AuthProvider>
      <ClientProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AccountingPage />} />
            <Route path="/hr" element={<HRPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/time-tracking" element={<TimeTracking />} />
          </Routes>
        </BrowserRouter>
      </ClientProvider>
    </AuthProvider>
  );
}