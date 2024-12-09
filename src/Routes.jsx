import React from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom"; // Corrigindo a importação de Routes
import Login from "./pages/Login";
import Register from "./pages/Register"; // Corrigindo a importação de Register
import Dashboard from "./pages/Dashboard";

const Routes = ({ transactions, handleAddTransaction }) => (
  <RouterRoutes> {/* Usando RouterRoutes para definir as rotas */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/dashboard"
      element={<Dashboard transactions={transactions} />}
    />
  </RouterRoutes>
);

export default Routes;
