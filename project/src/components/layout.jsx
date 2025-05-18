import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import './Layout.css'; // ใช้ CSS ภายนอกเพื่อจัดการ layout

const Layout = ({ children, user, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitles = {
    '/dashboard': 'Dashboard',
    '/monitoring': 'Monitoring',
    '/cycletime': 'Cycle Time',
    '/overview': 'Overview',
  };

  return (
    <div className="w-screen h-screen flex bg-gray-100 font-sans">
      {/* Sidebar */}
      {user && (
        <div className="sidebar">
          <h1 className="text-white text-[clamp(1.8rem,2vw,2.5rem)] font-bold">LITTLE DEV</h1>
          <p className="mode">Prototype Mode</p>
          <hr className="my-4 border-gray-700" />

          <div className="text-xs text-slate-400 font-bold uppercase mb-2">Main Menu</div>
          <nav className="flex flex-col gap-2">
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            <button onClick={() => navigate('/monitoring')}>Monitoring</button>
            <button onClick={() => navigate('/cycletime')}>Cycle Time</button>
            <button onClick={() => navigate('/overview')}>Overview</button>
          </nav>

          <div className="bottom-links mt-auto">
            <div className="text-xs text-slate-400 font-bold uppercase">Support</div>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-[clamp(14rem,16vw,20rem)] overflow-hidden">
        {/* Header */}
        {user && (
          <header className="flex justify-between items-center px-[clamp(1rem,2vw,3rem)] py-3 bg-white shadow sticky top-0 z-20">
            <h1 className="text-[clamp(1.5rem,2vw,2.5rem)] font-bold">
              {pageTitles[location.pathname] || 'Over All Dashboard'}
            </h1>
            <div className="flex items-center gap-6">
              <FaEnvelope className="text-xl text-gray-600" />
              <div className="hidden md:flex items-center gap-3">
                <img src="/avatar.jpg" alt="Profile" className="w-10 h-10 rounded-full" />
                <span className="text-gray-700 font-medium">{user.name}</span>
                <IoIosArrowDown />
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-[clamp(1rem,2vw,2rem)]">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
