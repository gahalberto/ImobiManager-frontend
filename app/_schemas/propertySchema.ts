import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(1, {
    message: "O título do imóvel é obrigatório",
  }),
  company: z.string().min(1, {
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
  bathrooms: z.number().min(1, {
    message: "O número de banheiros é obrigatório",
  }),
  bedrooms: z.number().min(1, {
    message: "O número de quartos é obrigatório",
  }),
  images: z
    .any()
    .optional()
    .refine((value) => {
      if (!value) return true; // Campo opcional
      if (typeof window !== "undefined" && value instanceof FileList) {
        return true; // No cliente, valide como FileList
      }
      if (Array.isArray(value)) {
        return value.every((file) => typeof file === "string"); // No servidor, valide como array de strings
      }
      return false;
    }, "Imagens devem ser enviadas como FileList no cliente ou array de strings no servidor"),
});
