"use client";

import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";

// This is used to wrap src/app/layout.tsx without having to set 'use client' there.
interface ProviderProps {
  children: ReactNode;
}

const Provider: FC<ProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
