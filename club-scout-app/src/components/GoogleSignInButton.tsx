import { FC } from "react";

interface GoogleSignInButton {
  children: React.ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButton> = ({ children }) => {
  const loginWithGoogle = () => {
    console.log("Login with Google");
  };

  return (
    <button
      className="bg-black rounded-xl p-1 border-solid border-2 border-bg-zinc-200 w-full text-center text-white hover:bg-blue-300"
      onClick={loginWithGoogle}
    >
      {children}
    </button>
  );
};

export default GoogleSignInButton;
