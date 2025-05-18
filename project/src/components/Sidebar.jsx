import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // ลบ token ทิ้ง (หรือ session อื่นๆ)
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <h1>LITTLE DEV</h1>
      <div className="text-sm font-bold text-slate-250 mb-2">Prototype Mode</div>
      <hr />
      <br />

      <div>
        <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-4">
          Main Menu
        </div>

        <br />

        <nav className="flex flex-col gap-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 rounded text-left font-bold transition hover:bg-gray-700 text-white"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate('/monitoring')}
            className="px-4 py-2 rounded text-left font-bold transition hover:bg-gray-700 text-white"
          >
            Monitoring
          </button>

          <button
            onClick={() => navigate('/cycletime')}
            className="px-4 py-2 rounded text-left font-bold transition hover:bg-gray-700 text-white"
          >
            Cycle Time Analysis
          </button>

          <button
            onClick={() => navigate('/Overview')}
            className="px-4 py-2 rounded text-left font-bold transition hover:bg-gray-700 text-white"
          >
            Production Overview
          </button>

          <button
            onClick={() => navigate('/exportdata')}
            className="px-4 py-2 rounded text-left font-bold transition hover:bg-gray-700 text-white"
          >
            Export Data
          </button>
        </nav>
      </div>

      <br /><br /><br /><br /><br />

      <div className="mt-auto">
        <div className="text-xs text-gray-400 font-bold uppercase tracking-wide mb-4">
          Help & Support
        </div>
        <br />
        <nav className="flex flex-col gap-2">
          <button
            onClick={() => navigate('/help')}
            className="px-4 py-2 rounded text-left font-bold transition hover:bg-gray-700 text-white"
          >
            Help & Support
          </button>

          <button
            onClick={() => navigate('/setting')}
            className="px-4 py-2 rounded text-left font-bold transition hover:bg-gray-700 text-white"
          >
            Setting
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded text-left font-bold text-white hover:bg-red-700 transition"
          >
            Log Out
          </button>
        </nav>
      </div>
    </div>
  );
}
