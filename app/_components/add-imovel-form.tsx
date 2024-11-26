"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "@/app/_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useForm } from "react-hook-form";
import { propertySchema } from "../_schemas/propertySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { companyType } from "../_types/companyType";
import { api } from "../_utils/api";
import { Button } from "./ui/button";
import { MoneyInput } from "./money-input";
import { formatCEP } from "../_utils/cepFormat";
import { CreateImovel } from "../_actions/create-imovel";

const AddImovelForm = () => {
  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      company: "1",
      address_zipcode: "",
      address_street: "",
      address_number: "",
      address_complement: "",
      address_neighborhood: "",
      address_city: "",
      address_state: "",
      price: 0,
      bedrooms: 1,
      bathrooms: 1,
      images: null,
    },
  });

  const { setValue, watch, setFocus } = form;
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState<companyType[]>([]);
  const cep = watch("address_zipcode");

  // Buscar endereço por CEP
  const fetchAddressByCEP = async (cep: string) => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!response.ok) {
      throw new Error("Erro ao buscar o endereço");
    }
    return response.json();
  };

  useEffect(() => {
    if (cep && cep.replace("-", "").length === 8) {
      fetchAddressByCEP(cep.replace("-", ""))
        .then((data) => {
          if (!data.erro) {
            setValue("address_street", data.logradouro);
            setValue("address_neighborhood", data.bairro);
            setValue("address_city", data.localidade);
            setValue("address_state", data.uf);
            setFocus("address_number");
          }
        })
        .catch((error) => console.error("Erro ao buscar o endereço:", error));
    }
  }, [cep, setValue, setFocus]);

  // Buscar construtoras
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get("/company");
        setCompanies(response.data);
      } catch (error) {
        console.error("Erro ao buscar construtoras:", error);
      }
    };
    fetchCompanies();
  }, []);

  const onSubmit = async (data: z.infer<typeof propertySchema>) => {
    try {
      const formData = new FormData();

      for (const [key, value] of Object.entries(data)) {
        // Garantindo que os campos "bedrooms", "bathrooms" e "company" sejam números
        if (key === "images" && value) {
          const imagesArray = Array.from(value as FileList);
          imagesArray.forEach((file) => formData.append("images", file));
        } else if (
          key === "bedrooms" ||
          key === "bathrooms" ||
          key === "price"
        ) {
          formData.append(key, value.toString()); // Convertendo valores numéricos para string
        } else {
          formData.append(key, String(value)); // Converte os valores para string
        }
      }

      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      setLoading(true);
      const response = await CreateImovel(formData);
      console.log("Resposta do servidor:", response);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titúlo</FormLabel>
              <FormControl>
                <Input placeholder="Insira um título..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Construtora */}
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Construtora</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha pelo menos um empreendimento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id.toString()}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Quartos */}
        <FormField
          control={form.control}
          name="bedrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qtd. de Quartos:</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Insira quantidade de quartos..."
                  {...field}
                  value={field.value.toString()}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Banheiros */}
        <FormField
          control={form.control}
          name="bathrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qtd. de Banheiros:</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Insira quantidade de banheiros..."
                  {...field}
                  value={field.value.toString()}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CEP */}
        <FormField
          control={form.control}
          name="address_zipcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira o CEP..."
                  {...field}
                  value={formatCEP(field.value)}
                  onBlur={(e) => {
                    field.onChange(formatCEP(e.target.value));
                  }}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Rua */}
        <FormField
          control={form.control}
          name="address_street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rua:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira a rua..."
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Número */}
        <FormField
          control={form.control}
          name="address_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número:</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Insira o número..."
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Complemento */}
        <FormField
          control={form.control}
          name="address_complement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complemento:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira o complemento..."
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bairro */}
        <FormField
          control={form.control}
          name="address_neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira o bairro..."
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cidade */}
        <FormField
          control={form.control}
          name="address_city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira a cidade..."
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Estado */}
        <FormField
          control={form.control}
          name="address_state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira o estado..."
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Preço */}

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <MoneyInput
                  placeholder="R$ ...."
                  value={field.value}
                  onValueChange={({ floatValue }) => field.onChange(floatValue)}
                  onBlur={field.onBlur}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descrição */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira uma descrição..."
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Imagens */}
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagens</FormLabel>
              <FormControl>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Botão de adicionar */}
        <Button className="bg-blue-600 w-full" type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Adicionar"}
        </Button>
      </form>
    </Form>
  );
};

export default AddImovelForm;
