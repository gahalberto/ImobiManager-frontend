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
import { registerSchema } from "@/app/_schemas/authSchema";
import { Input } from "@/app/_components/ui/input";
import { LogInIcon, UserIcon } from "lucide-react";
import { z } from "zod";
import CustomButton from "../button";
import { Separator } from "../ui/separator";
import { SignUp } from "@/app/_actions/signup";
import { signIn } from "next-auth/react";

// Componente do Formulário de Login

export function SignupForm() {
  // Formulário de login com reackhook form e zod
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastname: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      // Inicia o carregamento
      setLoading(true);
      setErrorMessage(null); // Limpa a mensagem de erro em caso de sucesso

      const res = await SignUp(data);

      // Verifica se a resposta da API contém um erro
      if (res?.error) {
        setErrorMessage(`Erro ao criar a conta ${res.error}`);
      }

      // Faz o login do usuário
      await signIn("credentials", {
        redirect: true,
        email: data.email,
        password: data.password,
      });
      setLoading(false);
    } catch (error: any) {
      setErrorMessage(error.message);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {/* Nome */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Digite o seu nome"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Sobrenome */}
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sobrenome</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Digite o seu sobrenome"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* E-mail */}
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

        {/* Senha */}
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

        {/* Confirmação da senha */}
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme a senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Digite a senha novamente"
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
          <LogInIcon /> {loading ? "Carregando..." : "Registrar"}
        </Button>
        <Separator />
        <div className="w-full">
          <CustomButton
            label="Fazer Login"
            href="/signin"
            type="button"
            color="bg-blue-700"
            icon={<UserIcon />}
          />
        </div>
      </form>
    </Form>
  );
}
