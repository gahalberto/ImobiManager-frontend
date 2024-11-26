import AddImovelButton from "@/app/_components/add-imovel-button";
import ImovelFilterSection from "@/app/_components/imovel-filter";
import Navbar from "@/app/_components/Nav";

const DashboardPage = async () => {
  return (
    <>
      {/* Responsividade: Navbar fixa no topo da tela */}
      <Navbar />

      {/* Título e um Modal do Shadcn (Dialog) de Adicionar um Imóvel */}
      {/* Dentro do modal, tem um formulário que também está componetizado, 
      o form pode ser usado em outras páginas sem necessariamente dentro de um modal 
      Dialog do shadcn */}
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <AddImovelButton />
        </div>

        {/* Componente que busca o imóvel! */}
        <ImovelFilterSection />
      </div>
    </>
  );
};

export default DashboardPage;
