"use client";
import Navbar from "@/app/_components/Nav";
import { Button } from "@/app/_components/ui/button";
import { PlusIcon } from "lucide-react";

const DashboardPage = () => {
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button className="rounded-full bg-blue-600 p-5">
            Adicionar Imóvel
            <PlusIcon className="ml-2" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
