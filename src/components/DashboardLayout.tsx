'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import ProtectedRoute from './ProtectedRoute';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 overflow-x-hidden">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <TopNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="lg:ml-72 pt-16 p-4 lg:p-8 w-full min-w-0">
          <div className="max-w-full">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
