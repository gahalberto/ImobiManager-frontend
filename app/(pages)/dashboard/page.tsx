"use client";
import AddImovelButton from "@/app/_components/add-imovel-button";
import Navbar from "@/app/_components/Nav";

const DashboardPage = () => {
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <AddImovelButton />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
