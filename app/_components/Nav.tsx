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
  {
    /* O hook useSession() retorna um objeto com a propriedade user, que 
    contém os dados do usuário autenticado. */
  }
  {
    /* O hook usePathname() retorna a URL atual da página. */
  }
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center border-b border-solid px-8 py-4 bg-slate-100">
      {/* ESQUERDA - LOGO  */}
      <Link href="/">
        <Image src="/logo.png" alt="Logo" width={200} height={50} />
      </Link>
      {/* DIREITA - LINKS */}
      <Sheet>
        <SheetTrigger>
          <MenuIcon />
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
                    <Link href="/dashboard">
                      <div
                        className={`flex text-center cursor-pointer p-3 ${
                          pathname === "/dashboard" ? "text-blue-600" : ""
                        }  hover:text-gray-800 hover:bg-gray-300 rounded transition-colors items-center gap-2`}
                      >
                        <LayoutDashboard size={20} /> Dashboard
                      </div>
                    </Link>

                    <Link href="/dashboard/imoveis">
                      <div
                        className={`flex text-center cursor-pointer p-3 ${
                          pathname === "/dashboard/imoveis"
                            ? "text-blue-600"
                            : ""
                        }  hover:text-gray-800 hover:bg-gray-300 rounded transition-colors items-center gap-2`}
                      >
                        <HousePlug size={20} /> Todos os imóveis
                      </div>
                    </Link>

                    <Link href="/dashboard/imoveis/criar">
                      <div
                        className={`flex text-center cursor-pointer p-3 ${
                          pathname === "/dashboard/imoveis/criar"
                            ? "text-blue-600"
                            : ""
                        }  hover:text-gray-800 hover:bg-gray-300 rounded transition-colors items-center gap-2`}
                      >
                        <HousePlusIcon size={20} /> Adicionar Imóvel
                      </div>
                    </Link>

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
              className={`w-full text-center py-4  ${
                pathname === "/" ? "text-blue-600" : ""
              }  hover:text-gray-800 hover:bg-gray-300 rounded transition-colors items-center gap-2`}
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
