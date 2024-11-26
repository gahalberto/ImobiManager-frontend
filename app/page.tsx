import Navbar from "@/app/_components/Nav";
import { propertyType } from "@/app/_types/propertyType";
import { api } from "@/app/_utils/api";
import ImovelFilterSection from "./_components/imovel-filter";
import { Metadata } from "next";
import { metadata } from "./layout";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${metadata.title} - Início`,
  };
}

const HomePage = async () => {
  const imoveis = (await api.get("/properties")) as { data: propertyType[] };
  console.log(imoveis.data);

  return (
    <>
      <Navbar />
      <ImovelFilterSection />
    </>
  );
};

export default HomePage;
