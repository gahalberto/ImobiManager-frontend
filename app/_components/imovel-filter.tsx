"use client";
import React, { useState, useEffect } from "react";
import ImovelCard from "@/app/_components/ImovelCard";
import { api } from "@/app/_utils/api";
import PropertyFilter from "./imovel-filter-form";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { FilterValues } from "../_types/filterType";

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
  const [page, setPage] = useState(1); // Controle da página
  const [totalPages, setTotalPages] = useState(1); // Total de páginas

  // Função para buscar imóveis filtrados com paginação
  const fetchProperties = async (filters: FilterValues, page: number) => {
    try {
      setIsLoading(true);
      const { data } = await api.get("/properties", {
        params: { ...filters, page, limit: 9 },
      });
      setImoveis(data.properties);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Erro ao buscar propriedades", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função chamada quando os filtros mudam
  const handleFilter = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setPage(1); // Resetar para a primeira página
    fetchProperties(newFilters, 1); // Faz a requisição com os filtros e página 1
  };

  // Effect que busca as propriedades inicialmente (sem filtro)
  useEffect(() => {
    fetchProperties(filters, page);
  }, [filters, page]); // Atualiza a requisição ao mudar filtros ou página

  // Funções de navegação de página
  const goToNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const goToPreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div>
      <PropertyFilter onFilter={handleFilter} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 p-10">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3">
                <Skeleton className="h-[250px] w-full rounded-xl" />
                <div className="space-y-2 mt-4">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            ))
          : imoveis.map((imovel, index) => (
              <ImovelCard key={index} imovel={imovel} />
            ))}
      </div>

      {/* Controles de paginação */}
      <div className="flex justify-center items-center space-x-6 mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={page === 1}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Anterior
        </button>
        <span>
          {page} de {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={page === totalPages}
          className="p-2 bg-blue-600 text-white rounded"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default ImovelFilterSection;
