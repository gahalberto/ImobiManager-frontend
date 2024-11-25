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
import { useEffect, useState, useCallback } from "react";
import { companyType } from "../_types/companyType";
import { api } from "../_utils/api";
import { Button } from "./ui/button";
import { MoneyInput } from "./money-input";
import { formatCEP } from "../_utils/cepFormat";
import axios from "axios";

const AddImovelForm = () => {
  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      companies: "",
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
      images: [],
    },
  });

  const [companies, setCompanies] = useState<companyType[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await api.get("/company");
        setCompanies(response.data);
        console.log("response", response);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  // Função para buscar dados do CEP
  const fetchAddressByZipcode = useCallback(
    async (zipcode: string) => {
      console.log("Fetching address for ZIP code:", zipcode); // Log para verificar o CEP
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${zipcode}/json/`
        );
        const data = response.data;
        console.log("API Response:", data); // Log para verificar a resposta da API

        if (!data.erro) {
          // Preencher os campos do formulário com os dados recebidos
          form.setValue("address_street", data.logradouro);
          form.setValue("address_neighborhood", data.bairro);
          form.setValue("address_city", data.localidade);
          form.setValue("address_state", data.uf);
        } else {
          console.error("CEP não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar endereço:", error);
      }
    },
    [form]
  );

  // Efeito para preencher os campos quando o CEP mudar
  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log("Current ZIP code value:", value.address_zipcode); // Log para verificar o valor do CEP
      if (value.address_zipcode?.length === 7) {
        // Verifica se o CEP tem 8 dígitos
        fetchAddressByZipcode(value.address_zipcode);
      }
    });

    return () => subscription.unsubscribe(); // Limpar a assinatura
  }, [form, fetchAddressByZipcode]);

  const onSubmit = () => {};

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
                <Input placeholder="Insira um titúlo..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Construtora  */}
        <FormField
          control={form.control}
          name="companies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Construtora</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha pelo menos um empreedimento" />
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
                  placeholder="Insira quantidade de quartos..."
                  {...field}
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
                  placeholder="Insira quantidade de banheiros..."
                  {...field}
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
                  onChange={(e) => {
                    field.onChange(formatCEP(e.target.value));
                  }}
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
                <Input placeholder="Insira a rua..." {...field} />
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
                <Input placeholder="Insira o número..." {...field} />
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
                <Input placeholder="Insira o complemento..." {...field} />
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
                <Input placeholder="Insira o bairro..." {...field} />
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
                <Input placeholder="Insira a cidade..." {...field} />
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
                <Input placeholder="Insira o estado..." {...field} />
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
                <Input placeholder="Insira uma descrição..." {...field} />
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
                <MoneyInput placeholder="R$ ...." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-blue-600" type="submit">
          Adicionar
        </Button>
      </form>
    </Form>
  );
};

export default AddImovelForm;
