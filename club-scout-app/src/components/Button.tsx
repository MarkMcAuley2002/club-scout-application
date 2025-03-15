import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  //   className?: string;
  //   onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  //   text: string;
  accent?: "navigate" | "submit" | "danger" | "create";
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  accent = "navigate",
  className,
  children,
  loading,
  onClick,
  ...props
}: ButtonProps) => {
    const defaultStyle =
      "px-4 rounded-xl font-medium border-solid border-2 text-center text-white min-w-20 max-w-25 min-h-9 max-h-9";  
    const buttonAccept = {
      navigate:
        "bg-black border-solid border-2 border-bg-zinc-200 w-20 text-center text-white hover:bg-blue-300",
      submit: "bg-green-500 hover:bg-green-400",
      danger: "bg-red-500 hover:bg-red-400  border-bg-zinc-200",
      create: "bg-yellow-500 hover:bg-yellow-400",
    };

    return (
      <button className={`${defaultStyle} ${buttonAccept[accent]}`}
      disabled={loading}
      onClick={onClick}>
        {children}
      </button>
    );
};

export default Button;
