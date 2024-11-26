/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { api } from "../_utils/api";
import { getServerSession } from "next-auth";

export async function CreateImovel(formData: FormData) {
  console.log(`---------------------`);
  console.log(`formData: ${formData}`);
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Você precisa estar autenticado.");
    }

    const token = session.user.token;
    const res = await api.post("/properties", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Property created:", res.data);
    return res.data;
  } catch (error) {
    console.error("Erro ao criar imóvel:", error);
    throw error;
  }
}
