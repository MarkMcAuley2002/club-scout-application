import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="rounded-md mt-2">
      <main>
        <div className="max-w-md w-full lg:max-w-lg xl:max-w-2xl shadow-md">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
