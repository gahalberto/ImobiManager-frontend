import { api } from "@/app/_utils/api";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          console.log("Credenciais ausentes");
          return null;
        }

        try {
          // Busca o usuário no banco de dados
          const res = await api.post("/signin", credentials);
          const user = res.data;

          // Verifica se a senha é válida
          if (user) {
            console.log("Usuário autorizado:", user);
            return {
              id: user.id,
              name: user.firstName,
              email: user.email,
            };
          }

          console.log("Credenciais inválidas");
          return null;
        } catch (error) {
          console.error("Erro na autenticação:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET || "default_jwt_secret",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
        } as {
          id?: string;
          name?: string | null | undefined;
          email?: string | null | undefined;
          image?: string | null | undefined;
        };
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
