import "../styles/globals.css";
import TopBar from "../components/TopBar";

export const metadata = {
  title: "Admin Panel",
  description: "Manage users and reports",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <TopBar /> {/* ✅ Sidebar will be controlled inside TopBar */}
        <main className="flex-1 min-h-screen p-6 bg-white">{children}</main>
      </body>
    </html>
  );
}
