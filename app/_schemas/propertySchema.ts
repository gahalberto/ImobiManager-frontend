import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(1, {
    message: "O título do imóvel é obrigatório",
  }),
  companies: z.string().min(1, {
    message: "A construtora é obrigatória",
  }),
  address_zipcode: z.string().min(1, {
    message: "O CEP é obrigatório",
  }),
  address_street: z.string().min(1, {
    message: "A rua é obrigatória",
  }),
  address_number: z.string().min(1, {
    message: "O número é obrigatório",
  }),
  address_complement: z.string().min(1, {
    message: "O complemento é obrigatório",
  }),
  address_neighborhood: z.string().min(1, {
    message: "O bairro é obrigatório",
  }),
  address_city: z.string().min(1, {
    message: "A cidade é obrigatória",
  }),
  address_state: z.string().min(1, {
    message: "O estado é obrigatório",
  }),
  price: z.number().min(1, {
    message: "O preço é obrigatório",
  }),
  description: z.string().min(1, {
    message: "A descrição é obrigatória",
  }),
  images: z.array(z.string()).optional(),
  bedrooms: z.number().min(1, {
    message: "O número de quartos é obrigatório",
  }),
  bathrooms: z.number().min(1, {
    message: "O número de banheiros é obrigatório",
  }),
});
