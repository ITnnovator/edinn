"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import { signOut } from 'next-auth/react';

import Image from 'next/image';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const isLoginPage = pathname?.startsWith('/admin/login');

  // Nuclear option: Force override any lingering display: none styles
  React.useEffect(() => {
    if (!isLoginPage) {
      const sidebar = document.querySelector('.admin-sidebar') as HTMLElement;
      if (sidebar) {
        sidebar.style.display = 'flex';
        sidebar.style.removeProperty('display'); // Let CSS take over if possible, or leave it flex if inline is needed
        sidebar.style.display = 'flex'; // Re-assert
      }
    }
  }, [pathname, isLoginPage]);

  const menuItems = [
    { name: 'Dashboard', icon: 'fa-chart-pie', href: '/admin' },
    { name: 'Teachers', icon: 'fa-chalkboard-teacher', href: '/admin/teachers' },
    { name: 'Gallery', icon: 'fa-images', href: '/admin/gallery' },
    { name: 'Notices', icon: 'fa-bullhorn', href: '/admin/notices' },
    { name: 'Settings', icon: 'fa-cog', href: '/admin/settings' },
  ];

  return (
    <div className="admin-container">
      {/* Sidebar - Conditionally rendered to prevent display bugs */}
      {/* Sidebar - Conditionally rendered to prevent display bugs */}
      {/* Sidebar - Conditionally rendered to prevent display bugs */}
      {!isLoginPage && (
        <aside
          key="admin-sidebar"
          className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}
          style={{
            display: 'flex',
            width: isSidebarOpen ? '250px' : '80px',
            transition: 'width 0.3s ease'
          }}
        >
            {isSidebarOpen && (
              <div className="logo-container" style={{ padding: '0 24px', marginBottom: '20px' }}>
                <Image 
                  src="/webImages/logo.png" 
                  alt="E&D School" 
                  width={180}
                  height={60}
                  style={{ width: 'auto', height: '50px' }}
                  priority
                />
              </div>
            )}

          <nav className="sidebar-nav">
            <ul>
              {menuItems.map((item) => (
                <li key={item.href} className={pathname === item.href ? 'active' : ''}>
                  <Link href={item.href} title={item.name}>
                    <i className={`fas ${item.icon}`}></i>
                    {isSidebarOpen && (
                      <span>
                        {item.name}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sidebar-footer">
            <button className="logout-btn" onClick={() => signOut({ callbackUrl: '/admin/login' })}>
              <i className="fas fa-sign-out-alt"></i>
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="admin-main" style={{ padding: isLoginPage ? 0 : undefined }}>
        {!isLoginPage && (
          <header className="admin-header">
            <div className="breadcrumbs">
              Admin / {pathname.split('/').pop()}
            </div>
            <div className="user-profile">
              <div className="avatar">A</div>
              <span>Admin User</span>
            </div>
          </header>
        )}
        <div className={`content-wrapper ${isLoginPage ? 'login-wrapper' : ''}`} style={{ padding: isLoginPage ? 0 : '30px' }}>
          <Toaster position="top-right" reverseOrder={false} />
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ height: '100%' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <style jsx global>{`
        :root {
          --admin-bg: #f4f7fe;
          --admin-sidebar-bg: #ffffff;
          --admin-text: #2b3674;
          --admin-active: #000000;
          --glass-border: rgba(255, 255, 255, 0.2);
        }

        .dark {
          --admin-bg: #0b1437;
          --admin-sidebar-bg: #111c44;
          --admin-text: #ffffff;
        }

        .admin-container {
          display: flex;
          height: 100vh; /* Fixed height viewport */
          overflow: hidden; /* Prevent body scroll */
          background: var(--admin-bg);
          color: var(--admin-text);
          /* Removed 'DM Sans' to use default system fonts */
        }

        .admin-sidebar {
          background: var(--admin-sidebar-bg);
          height: 100%; /* Full height of container */
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(0,0,0,0.05);
          overflow-y: auto; /* Allow sidebar itself to scroll if needed */
          z-index: 100;
          flex-shrink: 0; /* Prevent sidebar shrinking */
        }

        .sidebar-header {
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
          flex-shrink: 0;
        }

        .sidebar-header h2 {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          white-space: nowrap;
          color: var(--admin-active);
        }

        .toggle-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--admin-text);
          font-size: 18px;
        }

        .sidebar-nav {
          flex: 1;
          padding: 20px 0;
          overflow-y: auto; /* Internal nav scroll */
        }

        .sidebar-nav ul {
          list-style: none;
          padding: 0;
        }

        .sidebar-nav li {
          margin-bottom: 8px;
          position: relative;
        }

        .sidebar-nav li a {
          display: flex;
          align-items: center;
          padding: 12px 24px;
          color: #a3aed0;
          text-decoration: none;
          transition: all 0.3s;
          font-weight: 500;
          white-space: nowrap;
          gap: 12px;
        }

        .sidebar-nav li.active a,
        .sidebar-nav li a:hover {
          color: var(--admin-active);
          background: rgba(67, 24, 255, 0.05);
          border-right: 3px solid var(--admin-active);
        }

        .sidebar-nav li i {
          width: 20px;
          text-align: center;
        }

        .sidebar-footer {
          padding: 20px;
          border-top: 1px solid rgba(0,0,0,0.05);
          flex-shrink: 0;
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border: none;
          background: #ffe5e5;
          color: #d32f2f;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          justify-content: center;
        }

        .admin-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%; /* Full height */
          overflow: hidden; /* Prevent double scrollbars */
          position: relative;
        }

        .admin-header {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          background: rgba(255,255,255,0.5);
          backdrop-filter: blur(10px);
          flex-shrink: 0;
          border-bottom: 1px solid rgba(0,0,0,0.02);
        }

        .breadcrumbs {
          font-weight: 500;
          text-transform: capitalize;
        }

        .content-wrapper {
          padding: 30px;
          flex: 1;
          overflow-y: auto; /* SCROLL HERE */
          height: 100%;
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }

        .avatar {
          width: 36px;
          height: 36px;
          background: var(--admin-active);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
      `}</style>
      
      {/* Enhanced Modern Modern CSS overrides */}
      <style jsx global>{`
        .sidebar-nav li a {
          border-radius: 12px;
          margin: 0 10px;
          width: calc(100% - 20px) !important;
        }

        .sidebar-nav li.active a,
        .sidebar-nav li a:hover {
            background: #000000;
            color: white !important;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            border-right: none;
        }
        
        .sidebar-nav li.active i,
        .sidebar-nav li a:hover i {
           color: white !important;
        }
      `}</style>
    </div>
  );
}
