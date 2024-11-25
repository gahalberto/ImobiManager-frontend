"use client";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

const DashboardPage = () => {
  return (
    <div>
      <h1>Dashboard</h1>

      <div
        className="cursor-pointer p-3 text-blue-600 hover:text-gray-800 hover:bg-gray-300 rounded transition-colors flex items-center gap-2"
        onClick={() => signOut()}
      >
        <LogOutIcon /> Sair
      </div>
    </div>
  );
};

export default DashboardPage;
