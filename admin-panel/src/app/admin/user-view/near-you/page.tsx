// src/app/admin/user-view/near-you/page.tsx
"use client";

import React from 'react';
import NearYouContent from '../../../user/near-you/content';

export default function AdminNearYouView() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User View: Near You</h1>
      <p className="text-gray-500 mb-6">You're viewing this page as an admin</p>
      
      <div className="border-t border-gray-200 pt-6">
        <NearYouContent />
      </div>
    </div>
  );
}