/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { loginSchema } from "@/app/_schemas/authSchema";
import { Input } from "@/app/_components/ui/input";
import { LogInIcon, UserIcon } from "lucide-react";
import { z } from "zod";
import CustomButton from "../button";
import { Separator } from "../ui/separator";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

// Componente do Formulário de Login

export function LoginForm() {
  // Recebe a sessão do usuário

  // Formulário de login com reackhook form e zod
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      setLoading(true);
      const response = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      setErrorMessage(null); // Limpa a mensagem de erro em caso de sucesso
      if (response?.error) {
        setErrorMessage("E-mail e/ou senha inválidos.");
      }

      setLoading(false);
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.error || "Erro desconhecido");
      }
    } finally {
      redirect("/dashboard");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Digite o seu e-mail"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Digite a sua senha"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && (
          <div className="text-red-500 font-bold">{errorMessage}</div>
        )}
        <Button type="submit" disabled={loading} className="w-full">
          <LogInIcon /> {loading ? "Carregando..." : "Entrar"}
        </Button>
        <Separator />
        <div className="w-full">
          <CustomButton
            label="Regitre-se"
            href="/signup"
            type="button"
            color="bg-blue-700"
            icon={<UserIcon />}
          />
        </div>
      </form>
    </Form>
  );
}
