import React, { useState } from "react";
import { MoneyInput } from "./money-input";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/app/_components/ui/drawer";
import { Button } from "./ui/button";
import CustomButton from "./button";
import { FilterIcon } from "lucide-react";
import { FilterValues } from "../_types/filterType";

{
  /* Componente de filtro de propriedades */
}

const PropertyFilter = ({
  onFilter,
}: {
  onFilter: (filters: FilterValues) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const [filters, setFilters] = useState({
    price_min: "",
    price_max: "",
    bedrooms: "",
    bathrooms: "",
    address_city: "",
  });

  // Função para atualizar o estado do filtro e garantir que o valor seja limpo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Para os campos de preço (price_min e price_max), remove tudo que não for número ou ponto
    if (name === "price_min" || name === "price_max") {
      const cleanValue = value.replace(/[^\d.-]/g, "");
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: cleanValue,
      }));
    } else {
      // Para os outros campos, permite qualquer caractere (como no campo cidade)
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  {
    /* Função para enviar os filtros para o componente pai e 
    fechar o drawer após o envio */
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const filtersToSend: FilterValues = {
      ...filters,
      price_min: filters.price_min
        ? filters.price_min
            .replace(/\./g, "") // Remove todos os pontos de milhar
            .replace(",", ".") // Substitui a vírgula por ponto
        : "",
      price_max: filters.price_max
        ? filters.price_max
            .replace(/\./g, "") // Remove todos os pontos de milhar
            .replace(",", ".") // Substitui a vírgula por ponto
        : "",
    };

    onFilter(filtersToSend);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="flex  m-6 justify-center items-center">
          <CustomButton
            type="button"
            label="Filtrar Imóveis"
            color="bg-blue-600"
            icon={<FilterIcon />}
            onClick={() => setOpen(true)}
          />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filtros de Propriedade</DrawerTitle>
          <DrawerDescription>
            Aplicar filtros para a pesquisa.
          </DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit}
          className="overflow-x-auto overflow-y-auto flex flex-wrap gap-4 p-4 mx-10"
        >
          <div className="w-full sm:w-1/2 md:w-1/3">
            <label htmlFor="price_min">Preço Mínimo</label>
            <MoneyInput
              name="price_min"
              value={filters.price_min}
              onChange={handleChange}
              className="border p-2 w-full"
              placeholder="R$ ...."
            />
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3">
            <label htmlFor="price_max">Preço Máximo</label>
            <MoneyInput
              name="price_max"
              value={filters.price_max}
              onChange={handleChange}
              className="border p-2 w-full"
              placeholder="R$ ...."
            />
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3">
            <label htmlFor="bedrooms">Quartos</label>
            <input
              id="bedrooms"
              type="number"
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3">
            <label htmlFor="bathrooms">Banheiros</label>
            <input
              id="bathrooms"
              type="number"
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>

          <div className="w-full sm:w-1/2 md:w-1/3">
            <label htmlFor="address_city">Cidade</label>
            <input
              id="address_city"
              type="text"
              name="address_city"
              value={filters.address_city}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
        </form>

        <DrawerFooter>
          <Button className="bg-blue-600 text-white" onClick={handleSubmit}>
            <FilterIcon /> Filtrar
          </Button>
        </DrawerFooter>

        <DrawerClose>
          <div className="p-5">Fechar</div>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default PropertyFilter;
