/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { api } from "../_utils/api";

export async function SignUp(data: {
  firstName: string;
  lastname: string;
  email: string;
  password: string;
}) {
  try {
    const res = await api.post("/signup", data);
    console.log("User created:", res.data);
    return res.data;
  } catch (error) {
    if ((error as any).response) {
      console.error("Error response:", (error as any).response.data);
      throw new Error(
        `Falha ao criar a conta: ${
          (error as any).response.data.error || "Unknown error"
        }`
      );
    } else {
      console.error("Error message:", (error as any).message);
      throw new Error(`Falha ao criar a conta: ${(error as any).message}`);
    }
  }
}
