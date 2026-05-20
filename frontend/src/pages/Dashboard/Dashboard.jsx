import React from "react";
import { useAuth } from "../../context/AuthContext";

import WorkerDashboard from "./WorkerDashboard";
import ClientDashboard from "./ClientDashboard";

function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      {user.role === "client" ? (
        <ClientDashboard />
      ) : (
        <WorkerDashboard />
      )}
    </>
  );
}

export default Dashboard;