import Link from "next/link";
import { Button } from "./ui/button";
import { ReactNode } from "react";

type Props = {
  label: string;
  href?: string;
  color: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
};

const CustomButton = ({ label, href, color, type = "button", icon }: Props) => {
  return (
    <Link href={href || ""}>
      <Button type={type} className={`${color} w-full`}>
        {icon ? icon : null}
        {label}
      </Button>
    </Link>
  );
};

export default CustomButton;
