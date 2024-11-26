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
  onClick?: () => void;
};

const CustomButton = ({
  label,
  href,
  color,
  type = "button",
  icon,
  onClick,
}: Props) => {
  return (
    <Link href={href || ""}>
      <Button type={type} className={`${color} w-full`} onClick={onClick}>
        {icon ? icon : null}
        {label}
      </Button>
    </Link>
  );
};

export default CustomButton;
