// src/Routes.js
import React from "react";
import { Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./AddTransaction";

const Routes = ({ transactions, handleAddTransaction }) => (
  <>
    <Route path="/login" element={<Login />} />

    <Route
      path="/dashboard"
      element={<Dashboard transactions={transactions} />}
    />
  </>
);

export default Routes;
