import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="rounded-md mt-2 min-h-screen bg-inherit">
      <main className="w-full p-6">{children}</main>
    </div>
  );
};

export default AuthLayout;
