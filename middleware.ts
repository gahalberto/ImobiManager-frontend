import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    console.log("Middleware running:", req.nextUrl.pathname); // Log para verificação
  },
  {
    pages: {
      signIn: "/signin", // Redireciona para a página de login se não autenticado
    },
    callbacks: {
      authorized: ({ token }) => {
        console.log(token);
        // Verifica se o token existe para autorizar o usuário
        if (token) {
          console.log("User authorized with token:", token);
          return true; // Se o token existe, permite o acesso
        }
        console.log("User not authorized, no token found");
        return false; // Sem token, não autoriza
      },
    },
  }
);

export const config = {
  // Protege apenas as rotas do dashboard
  matcher: ["/admin/:path*"], // Protege todas as rotas que começam com '/dashboard'
};
