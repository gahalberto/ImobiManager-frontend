"use server";
import { LoginForm } from "@/app/_components/auth/signinForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { LogInIcon } from "lucide-react";
import Image from "next/image";
import type { Metadata } from "next";
import { metadata } from "@/app/layout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${metadata.title} - Register`,
  };
}

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }
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
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="flex space-x-2">
              <LogInIcon />
              <h1>Login</h1>
            </CardTitle>
            <CardDescription>
              Entre na sua conta ou registre-se.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Componente de Login */}
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
