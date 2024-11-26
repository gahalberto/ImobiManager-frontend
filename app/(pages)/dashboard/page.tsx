import AddImovelButton from "@/app/_components/add-imovel-button";
import ImovelCard from "@/app/_components/ImovelCard";
import Navbar from "@/app/_components/Nav";
import { propertyType } from "@/app/_types/propertyType";
import { api } from "@/app/_utils/api";

const DashboardPage = async () => {
  const imoveis = (await api.get("/properties")) as { data: propertyType[] };
  console.log(imoveis.data);

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <AddImovelButton />
        </div>

        {/* Responsividade: 1 card por linha em mobile, 3 cards por linha em desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {imoveis.data.map((imovel) => (
            <ImovelCard key={imovel.id} imovel={imovel} />
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
