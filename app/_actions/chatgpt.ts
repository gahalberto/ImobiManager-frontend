"use server";

import OpenAI from "openai";
import { propertySchema } from "../_schemas/propertySchema";
import { NextApiRequest, NextApiResponse } from "next";

export interface ImovelPropsType {
  title: string;
  address_zipcode: string;
  address_street: string;
  address_number: string;
  address_complement: string;
  address_neighborhood: string;
  address_city: string;
  address_state: string;
  price: number;
  bathrooms: number;
  bedrooms: number;
}

export const generatePropertyDescription = async (
  propertyData: ImovelPropsType
) => {
  propertySchema.parse(propertyData); // Validação com Zod

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Chave da API OpenAI não configurada.");
  }

  const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const content = `
    Gere uma descrição detalhada e atrativa para um imóvel com as seguintes características:
    - Título: ${propertyData.title}
    - Quartos: ${propertyData.bedrooms}
    - Banheiros: ${propertyData.bathrooms}
    - Endereço: ${propertyData.address_street}, ${
    propertyData.address_number
  }, ${propertyData.address_neighborhood}, ${propertyData.address_city} - ${
    propertyData.address_state
  }, CEP ${propertyData.address_zipcode}.
    - Complemento: ${propertyData.address_complement || "Não informado"}
    - Preço: R$ ${propertyData.price.toFixed(2)}
    
    Inclua aspectos que tornam o imóvel atrativo e mencione detalhes como localização, proximidade a serviços e características de destaque.
  `;

  const completion = await openAi.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content:
          "Você é um especialista em marketing imobiliário, escrevendo descrições atraentes de imóveis.",
      },
      {
        role: "user",
        content,
      },
    ],
  });

  return completion.choices[0].message.content;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Apenas POST é permitido." });
  }

  try {
    const description = await generatePropertyDescription(req.body);
    return res.status(200).json({ description });
  } catch (error) {
    console.error("Erro ao gerar descrição:", error);
    return res.status(500).json({ error: "Erro ao gerar descrição." });
  }
}
