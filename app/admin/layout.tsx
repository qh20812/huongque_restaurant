import React from 'react';
import Sidebar from './components/Sidebar';
import NavBar from './components/Navbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <Sidebar />
      <main className="flex-1">
        <NavBar />
        <div className="p-6 lg:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
