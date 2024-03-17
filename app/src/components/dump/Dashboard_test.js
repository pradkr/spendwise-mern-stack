import React from "react";
import { useAuth } from "../context/AuthProvider";

const Dashboard = () => {
  const auth = useAuth();
  console.log('in logout='+JSON.stringify(auth))
  return (
    <div className="container">
      <div>
        <h1>Welcome! {}</h1>
        <button onClick={() => auth.logOut()} className="btn-submit">
          logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;