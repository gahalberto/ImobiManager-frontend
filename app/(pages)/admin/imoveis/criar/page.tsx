import AddImovelForm from "@/app/_components/add-imovel-form";
import Navbar from "@/app/_components/Nav";

const CreateImovelPage = () => {
  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Adicionar novo imóvel</h1>
        </div>
        <AddImovelForm />
      </div>
    </>
  );
};

export default CreateImovelPage;
