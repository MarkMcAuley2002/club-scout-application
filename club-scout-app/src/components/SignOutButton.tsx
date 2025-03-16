"use client";

import { signOut } from "next-auth/react";
import Button from "./Button";
import { useState } from "react";
// Todo implement log out, create button component with different style options
const SignOutButton: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // Disable the button while waiting for the user to be logged out.
  const handleClick = async () => {
    setLoading(true);

    await signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/sign-in`
    });
    // Enable the button again, not really necessary as the component will not be rendered after the user is logged out.
    setLoading(false);
  };

  return (
    <Button
      accent={"danger"}
      onClick={handleClick}
      loading={loading}
    >
      Sign out
    </Button>
  );
};

export default SignOutButton;
