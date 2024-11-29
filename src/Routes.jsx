// src/Routes.js
import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddTransaction from './AddTransaction';

const Routes = ({ transactions, handleAddTransaction }) => (
  <>
    {/* Página de Login */}
    <Route path="/login" element={<Login />} />

    {/* Página do Dashboard */}
    <Route 
      path="/dashboard" 
      element={<Dashboard transactions={transactions} />} 
    />

    {/* Página de Adicionar Transação */}
    <Route 
      path="/addtransaction" 
      element={<AddTransaction onAddTransaction={handleAddTransaction} />} 
    />
  </>
);

export default Routes;
