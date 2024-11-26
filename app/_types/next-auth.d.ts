import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      token?: string | null; // Token adicional se necessário
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    token?: string; // Adicionar se o token estiver vindo no authorize()
  }
}
