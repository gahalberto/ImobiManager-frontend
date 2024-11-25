"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { PlusIcon } from "lucide-react";
import AddImovelForm from "./add-imovel-form";

const AddImovelButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-blue-600 p-5">
          Adicionar Imóvel
          <PlusIcon className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar imóvel</DialogTitle>
        </DialogHeader>
        <AddImovelForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddImovelButton;
