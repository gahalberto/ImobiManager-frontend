export type Photos = {
  id: number; // ID da foto (se necessário)
  filePath: string; // Caminho ou URL da foto
  // Adicione outras propriedades conforme necessário, como:
  // altText: string;  // Caso queira adicionar um texto alternativo
};

export type propertyType = {
  id: string;
  title: string;
  company: string;
  address_zipcode: string;
  address_street: string;
  address_number: string;
  address_complement: string;
  address_neighborhood: string;
  address_city: string;
  address_state: string;
  price: number;
  description: string;
  bathrooms: number;
  bedrooms: number;
  photos: Photos[];
  firstPhoto?: string;
};
