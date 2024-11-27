"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import {
  HousePlug,
  HousePlusIcon,
  LayoutDashboard,
  LogOutIcon,
  MenuIcon,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center border-b border-solid px-8 py-4 bg-slate-100">
      {/* LOGO */}
      <Link href="/">
        <Image
          src="/logo.png"
          alt="Logo"
          width={200} // Define a largura
          height={50} // Define a altura
          style={{ width: "100%", height: "auto" }} // Adicionando 'height: auto' para manter a proporção
          priority // Se for uma imagem acima da dobra, use "priority" para otimizar o carregamento
        />{" "}
      </Link>

      {/* MENU */}
      <Sheet>
        <SheetTrigger>
          <MenuIcon className="text-xl cursor-pointer" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="flex justify-center">
            {session?.user ? (
              <>
                <SheetTitle>Olá, {session.user.name}</SheetTitle>
                <SheetDescription
                  className="flex-col justify-center p-3"
                  asChild
                >
                  <div>
                    {/* Links no Menu */}
                    <Link href="/dashboard">
                      <div
                        className={`flex text-center cursor-pointer p-3 ${
                          pathname === "/dashboard" ? "text-blue-600" : ""
                        } hover:text-gray-800 hover:bg-gray-300 rounded transition-colors items-center gap-2`}
                      >
                        <LayoutDashboard size={20} /> Dashboard
                      </div>
                    </Link>

                    <Link href="/dashboard/imoveis/criar">
                      <div
                        className={`flex text-center cursor-pointer p-3 ${
                          pathname === "/dashboard/imoveis/criar"
                            ? "text-blue-600"
                            : ""
                        } hover:text-gray-800 hover:bg-gray-300 rounded transition-colors items-center gap-2`}
                      >
                        <HousePlusIcon size={20} /> Adicionar Imóvel
                      </div>
                    </Link>

                    {/* Logout */}
                    <div
                      className="flex text-center cursor-pointer p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-300 rounded transition-colors items-center gap-2"
                      onClick={() => signOut()}
                    >
                      <LogOutIcon size={20} /> Sair
                    </div>
                  </div>
                </SheetDescription>
              </>
            ) : (
              <>
                <SheetTitle>Olá, visitante</SheetTitle>
                <SheetDescription>
                  Faça o <Link href="/signin">login</Link> ou{" "}
                  <Link href="/signup">crie uma conta</Link>
                </SheetDescription>
              </>
            )}
          </SheetHeader>
          <Separator className="mt-5 mb-5" />

          <div className="flex flex-col gap-5">
            <Link
              href="/"
              className={`w-full text-center py-4 ${
                pathname === "/" ? "text-blue-600" : ""
              } hover:text-gray-800 hover:bg-gray-300 rounded transition-colors items-center gap-2`}
            >
              Imóveis
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
