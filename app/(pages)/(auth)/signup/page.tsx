"use server";
import { SignupForm } from "@/app/_components/auth/signupForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { metadata } from "@/app/layout";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { LogInIcon } from "lucide-react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${metadata.title} -  Crie uma conta`,
  };
}

const SignupPage = async () => {
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
              <h1>Crie uma conta</h1>
            </CardTitle>
            <CardDescription>
              Registre-se na ImobiManager ou faça login em uma conta.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
