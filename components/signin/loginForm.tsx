"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "@/app/_schemas/authSchema";
import { Input } from "@/components/ui/input";
import { LogInIcon, UserIcon } from "lucide-react";
import { z } from "zod";
import { signIn, useSession } from "next-auth/react";
import CustomButton from "../button";
import { redirect } from "next/navigation";

// Componente do Formulário de Login

export function LoginForm() {
  // Recebe a sessão do usuário
  const { data: session } = useSession();

  // Redireciona para a página de dashboard se o usuário estiver logado
  React.useEffect(() => {
    if (session?.user) {
      redirect("/dashboard");
    }
  }, [session]);

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

      console.log(response?.ok);
      setErrorMessage(null); // Limpa a mensagem de erro em caso de sucesso
      if (response?.error) {
        setErrorMessage("E-mail e/ou senha inválidos.");
      }
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        // A resposta da API está disponível
        setErrorMessage(error.response.data.error || "Erro desconhecido");
      } else {
        // Outro tipo de erro (ex: erro de rede)
        setErrorMessage("Erro de conexão. Tente novamente.");
      }
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="flex space-x-2">
          <LogInIcon />
          <h1>Login</h1>
        </CardTitle>
        <CardDescription>Entre na sua conta ou registre-se.</CardDescription>
      </CardHeader>
      <CardContent>
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
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="w-full">
          <CustomButton
            label="Regitre-se"
            color="bg-blue-700"
            icon={<UserIcon />}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
