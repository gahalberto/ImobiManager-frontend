"use server";
import { LoginForm } from "@/components/signin/loginForm";
import Image from "next/image";

const LoginPage = async () => {
  return (
    <div className="flex min-h-screen overflow-hidden  justify-center items-center">
      <div className="flex flex-col items-center p-8 max-w-[400px]">
        <Image
          src="/logo.svg"
          width={173}
          height={39}
          alt="ImobiManager"
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
        <p className="mb-8 text-muted-foreground text-center">
          A ImobiManager é uma plataforma de gestão de imóveis que ajuda você a
          organizar e gerenciar seus imóveis de forma simples e eficiente.
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
