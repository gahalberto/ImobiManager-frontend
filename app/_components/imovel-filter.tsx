"use client";
import React, { useState, useEffect } from "react";
import ImovelCard from "@/app/_components/ImovelCard";
import { api } from "@/app/_utils/api";
import PropertyFilter from "./imovel-filter-form";
import { Skeleton } from "@/app/_components/ui/skeleton";

const ImovelFilterSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [imoveis, setImoveis] = useState([]);
  const [filters, setFilters] = useState({
    price_min: "",
    price_max: "",
    bedrooms: "",
    bathrooms: "",
    address_city: "",
  });

  // Função para buscar imóveis filtrados
  const fetchProperties = async (filters: any) => {
    try {
      setIsLoading(true);
      const { data } = await api.get("/properties", { params: filters });
      setImoveis(data); // Atualiza o estado com as propriedades filtradas
    } catch (error) {
      console.error("Erro ao buscar propriedades", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função chamada quando os filtros mudam
  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
    fetchProperties(newFilters); // Faz a requisição com os filtros
  };

  // Efeito que busca as propriedades inicialmente (sem filtro)
  useEffect(() => {
    fetchProperties(filters);
  }, []); // Carrega inicialmente sem filtro

  return (
    <div>
      <PropertyFilter onFilter={handleFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 p-10">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-full">
                <Skeleton className="h-[250px] w-full rounded-xl" />
                <div className="space-y-2 mt-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))
          : imoveis.map((imovel) => (
              <ImovelCard key={imovel.id} imovel={imovel} />
            ))}
      </div>
    </div>
  );
};

export default ImovelFilterSection;
