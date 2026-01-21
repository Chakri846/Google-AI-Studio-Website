
import React, { useState } from 'react';
import { AppProvider } from './store';
import { Layout } from './components/Layout';
import { HomePage } from './features/frontend/HomePage';
import { AdminDashboard } from './features/admin/Dashboard';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'admin'>('home');

  return (
    <Layout 
      isAdmin={currentPage === 'admin'} 
      onNavigate={(page) => setCurrentPage(page)}
    >
      {currentPage === 'home' ? <HomePage /> : <AdminDashboard />}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
