"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { PlusIcon } from "lucide-react";
import AddImovelForm from "./add-imovel-form";

{
  /* Componente do Dialog que abre o modal com  form de novos imoveis */
}

const AddImovelButton = () => {
  return (
    <>
      {/* Dialog do Shadcn */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full bg-blue-600 p-5">
            Adicionar Imóvel
            <PlusIcon className="ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Adicionar imóvel</DialogTitle>
          </DialogHeader>
          {/* Componente do Formulário de adicionar imóvel */}
          <AddImovelForm />
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddImovelButton;
