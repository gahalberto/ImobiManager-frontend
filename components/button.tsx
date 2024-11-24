import { Button } from "./ui/button";
import { ReactNode } from "react";

type Props = {
  label: string;
  color: string;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
};

const CustomButton = ({ label, color, type = "button", icon }: Props) => {
  return (
    <Button type={type} className={`${color} w-full`}>
      {icon ? icon : null}
      {label}
    </Button>
  );
};

export default CustomButton;
