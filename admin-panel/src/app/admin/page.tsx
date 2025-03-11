// src/app/admin/page.tsx
"use client";

import React from 'react';
import UsersTable from '../../components/UsersTable';

export default function AdminPage()
{
  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <UsersTable />
    </>
  );
}