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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PropertyFilter = ({ onFilter }: { onFilter: (filters: any) => void }) => {
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

    // Remove o "R$", pontos de milhar e qualquer outro caractere que não seja número ou ponto
    const cleanValue = value.replace(/[^\d.-]/g, "");

    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: cleanValue,
    }));
  };

  // Função para enviar os filtros para o backend
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // A função cleanValue agora é usada para garantir que valores limpos sejam enviados
    const filtersToSend = {
      ...filters,
      price_min: filters.price_min
        ? parseFloat(filters.price_min.replace(",", "."))
        : "",
      price_max: filters.price_max
        ? parseFloat(filters.price_max.replace(",", "."))
        : "",
    };

    console.log(filtersToSend); // Log para debug

    onFilter(filtersToSend); // Envia os filtros para o componente pai
    setOpen(false); // Fecha o drawer
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <div>Filtrar Imóveis</div>
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
            Filtrar
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
