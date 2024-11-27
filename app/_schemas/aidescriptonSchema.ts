import { z } from "zod";

export const generateAiReportSchema = z.object({
  title: z.string().min(1, {
    message: "O título do imóvel é obrigatório",
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
  address_neighborhood: z.string().min(1, {
    message: "O bairro é obrigatório",
  }),
  address_city: z.string().min(1, {
    message: "A cidade é obrigatória",
  }),
  address_state: z.string().min(1, {
    message: "O estado é obrigatório",
  }),
  bathrooms: z.number().min(1, {
    message: "O número de banheiros é obrigatório",
  }),
  bedrooms: z.number().min(1, {
    message: "O número de quartos é obrigatório",
  }),
});

export type GenerateAiReportSchema = z.infer<typeof generateAiReportSchema>;
