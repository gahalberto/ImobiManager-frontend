import SlideCarrouselImovel from "@/app/_components/carrousel-slide";
import { api } from "@/app/_utils/api";
import { Card, CardContent } from "@/app/_components/ui/card";
import { metadata } from "@/app/layout";
import { Metadata } from "next";

type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const imovel = await api.get(`/properties/${id}`);

  return {
    title: `${metadata.title} - ${imovel.data.title} - Nome do Site`,
  };
}

const ImovelPage = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const params = await props.params;
  const id = params.id;

  const imovel = await api.get(`/properties/${id}`);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Carrossel de Imagens */}
      <SlideCarrouselImovel images={imovel.data.photos} />

      {/* Título do Imóvel */}
      <div className="mt-6 mb-4">
        <h1 className="text-4xl font-bold text-gray-800">
          {imovel.data.title}
        </h1>
      </div>

      {/* Informações do Imóvel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Descrição e detalhes */}
        <div>
          <div
            className="text-lg text-gray-700 mb-4"
            dangerouslySetInnerHTML={{ __html: imovel.data.description }}
          />
          {/* Formatação da descrição com HTML */}

          <div className="flex items-center mb-4">
            <span className="text-sm text-gray-600 font-semibold">Preço:</span>
            <span className="text-2xl font-semibold text-green-600 ml-2">
              R${parseInt(imovel.data.price).toLocaleString()}
            </span>
          </div>

          <div className="flex items-center mb-4">
            <span className="text-sm text-gray-600 font-semibold">
              Endereço:
            </span>
            <p className="text-lg text-gray-700 ml-2">
              {imovel.data.address_street}, {imovel.data.address_number},{" "}
              {imovel.data.address_complement} <br />
              {imovel.data.address_neighborhood} - {imovel.data.address_city},{" "}
              {imovel.data.address_state} <br />
              CEP: {imovel.data.address_zipcode}
            </p>
          </div>

          <div className="flex items-center mb-4">
            <span className="text-sm text-gray-600 font-semibold">
              Quartos:
            </span>
            <span className="text-lg text-gray-800 ml-2">
              {imovel.data.bedrooms}
            </span>
          </div>

          <div className="flex items-center mb-4">
            <span className="text-sm text-gray-600 font-semibold">
              Banheiros:
            </span>
            <span className="text-lg text-gray-800 ml-2">
              {imovel.data.bathrooms}
            </span>
          </div>
        </div>

        {/* Detalhes do Construtor */}
        <div>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Construtora
              </h3>
              <p className="text-md text-gray-600">
                {imovel.data.company.name}
              </p>
              <p className="text-sm text-gray-500">
                Publicado em:{" "}
                {new Date(imovel.data.company.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImovelPage;
