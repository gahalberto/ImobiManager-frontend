import AddImovelForm from "@/app/_components/add-imovel-form";
import { metadata } from "@/app/layout";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${metadata.title} - Adicionar Imóvel`,
  };
}

const CreateImovelPage = () => {
  return (
    <>
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
