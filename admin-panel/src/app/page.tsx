export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-600">Manage users, reports, and system settings.</p>

      {/* Example Stats Section */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold">Users</h2>
          <p>120 Active Users</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold">Reports</h2>
          <p>15 Open Reports</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold">Admins</h2>
          <p>5 Active Admins</p>
        </div>
      </div>
    </div>
  );
}
