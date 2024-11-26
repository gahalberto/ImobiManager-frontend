import Image from "next/image";
import { propertyType } from "../_types/propertyType";
import { Card, CardContent } from "./ui/card";
import CustomButton from "./button";

const ImovelCard = ({ imovel }: { imovel: propertyType }) => {
  const firstPhoto = imovel.photos && imovel.photos[0];
  const imageUrl = firstPhoto
    ? `http://localhost:3333/${firstPhoto.filePath}`
    : "";

  return (
    <Card>
      <CardContent className="p-0">
        {firstPhoto && imageUrl && (
          <div className="relative w-full h-[150px] overflow-hidden">
            <Image
              src={imageUrl}
              alt={`Foto do imóvel ${imovel.title}`}
              style={{ objectFit: "cover", objectPosition: "center" }}
              className="object-center"
              width={500} //
              height={500} //
            />
          </div>
        )}
        <div className="p-6">
          <h2 className="text-xl font-bold">{imovel.title}</h2>
          <p className="text-sm text-gray-500">
            {imovel.address_street}, {imovel.address_number} -{" "}
            {imovel.address_neighborhood}, {imovel.address_city} -{" "}
            {imovel.address_state}
          </p>
          <p className="text-lg font-bold mt-2">
            R${" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(imovel.price)}
          </p>
        </div>
        <div className="px-4 pt-0 pb-2">
          <CustomButton
            label="Ver detalhes"
            color="bg-blue-600"
            href={`/${imovel.id}`}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ImovelCard;
