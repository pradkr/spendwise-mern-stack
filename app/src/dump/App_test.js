// import React, { useState, useEffect } from 'react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login_test";
import Dashboard    from "./components/Dashboard_test";
import AuthProvider from "./context/AuthProvider";
import {PrivateRoute} from "./components/PrivateRoute";
// import {ErrorBoundary} from './context/ErrorBoundary';

function App() {
  return (
    <div>
        <Router>
            <AuthProvider>
            {/* <ErrorBoundary> */}
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
                {/* </ErrorBoundary> */}
            </AuthProvider>
        </Router>
    </div>
  )
}
export default App;
