import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  accent?: "navigate" | "submit" | "danger" | "create" | "join";
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  accent = "navigate",
  style,
  children,
  loading,
  onClick,
  ...props
}: ButtonProps) => {
  const defaultStyle =
    "px-4 rounded-xl font-medium border-solid border-2 text-center text-white min-w-20 max-w-fit min-h-9 max-h-9";
  const buttonAccept = {
    navigate:
      "bg-black border-solid border-2 border-bg-zinc-200 w-20 text-center text-white hover:bg-blue-300",
    submit: "bg-green-500 hover:bg-green-400",
    danger: "bg-red-500 hover:bg-red-400  border-bg-zinc-200",
    create: "bg-yellow-500 hover:bg-yellow-400",
    join: "bg-blue-600 hover:bg-blue-700 ",
  };

  return (
    <button
      className={`${defaultStyle} ${buttonAccept[accent]} ${style}`}
      disabled={loading}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
