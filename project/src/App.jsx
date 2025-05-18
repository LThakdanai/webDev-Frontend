import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, AuthContext } from "./AuthContext";
import { DataProvider } from "./Datacontext";

import Sidebar from "./components/Sidebar";
import Headerbar from "./components/Headerbar";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Monitoring from "./Pages/Monitoring";
import CycleTime from "./Pages/CycleTime";
import Overview from "./Pages/production_Overview";

function Layout({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div className="w-screen h-screen">{children}</div>; // Login page
  }

  return (
    <div className="w-screen h-screen grid grid-cols-[clamp(14rem,16vw,20rem)_1fr] grid-rows-[auto_1fr] bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="col-start-1 row-start-1 row-span-2 bg-[#171d2d] text-white shadow-lg">
        <Sidebar />
      </aside>

      {/* Headerbar */}
      <div className="col-start-2 row-start-1">
        <Headerbar />
      </div>

      {/* Main Content */}
      <main className="col-start-2 row-start-2 overflow-y-auto p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}

// Route สำหรับหน้า Auth
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
};

// Routes รวม
const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/monitoring"
        element={
          <PrivateRoute>
            <Layout>
              <Monitoring />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/cycletime"
        element={
          <PrivateRoute>
            <Layout>
              <CycleTime />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/overview"
        element={
          <PrivateRoute>
            <Layout>
              <Overview />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
};

// Main App
export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <AppRoutes />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}
