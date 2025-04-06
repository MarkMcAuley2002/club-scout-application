"use client";
import { signup } from "@/app/actions/auth";
import Link from "next/link";
import React, { useActionState } from "react";
import { useRouter } from "next/navigation";

export interface SignUpFormData {
  username?: FormDataEntryValue | null;
  email?: FormDataEntryValue | null;
  password?: FormDataEntryValue | null;
  confirmPassword?: FormDataEntryValue | null;
}

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [state, action, pending] = useActionState(signup, undefined);

  // Redirect if signup is successful
  React.useEffect(() => {
    if (state?.success) {
      router.push("/sign-in");
    }
  }, [state, router]);

  return (
    <div className="bg-gray-100 shadow-md rounded-md p-5 ">
      <h2 className="text-xl font-semibold text-center mb-2">Sign Up</h2>
      <form action={action}>
        <div className="">
          {/* Username Field */}
          <div className="mb-3">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              defaultValue={state?.input?.username?.toString()}
              type="text"
              name="username"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 
                       rounded-md focus:outline-none 
                       focus:ring-2 focus:ring-indigo-200 mb-1"
              placeholder="username"
            />

            {state?.errors?.username &&
              Array.isArray(state?.errors?.username) && (
                <div className="absolute">
                  {state?.errors?.username.map((error, index) => (
                    <p key={index} className="text-red-500 text-xs flex">
                      {error}
                    </p>
                  ))}
                </div>
              )}
          </div>
          {/* Email Field */}
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              defaultValue={state?.input?.email?.toString()}
              className="w-full px-3 py-2 border border-gray-300 
                       rounded-md focus:outline-none 
                       focus:ring-2 focus:ring-indigo-200 mb-1"
              placeholder="email@example.com"
            />

            {state?.errors?.email && Array.isArray(state.errors.email) && (
              <div className="absolute">
                {state.errors.email.map((error, index) => (
                  <p key={index} className="text-red-500 text-xs flex">
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>
          {/* Password Field */}
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 
                       rounded-md focus:outline-none 
                       focus:ring-2 focus:ring-indigo-200 mb-1"
              placeholder="********"
            />

            {state?.errors?.password &&
              Array.isArray(state.errors.password) && (
                <div className="absolute">
                  {state.errors.password.map((error, index) => (
                    <p key={index} className="text-red-500 text-xs">
                      {error}
                    </p>
                  ))}
                </div>
              )}
          </div>
          {/* Confirm Password Field */}
          <div className="mb-10">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm-password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 
                       rounded-md focus:outline-none 
                       focus:ring-2 focus:ring-indigo-200 mb-1"
              placeholder="********"
            />

            {state?.errors?.confirmPassword && (
              <div className="absolute">
                {state?.errors?.confirmPassword.map((error, index) => (
                  <p key={index} className="text-red-500 text-xs">
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className="mt-4 flex items-center justify-center ">
            <button
              type="submit"
              className="bg-black rounded-md  w-20 text-center text-white hover:bg-blue-300 m-2 p-1"
              disabled={pending}
            >
              Sign Up
            </button>
          </div>
          <div
            className="mx-auto my-4 flex w-full items-center justify-evenly
        before:mr-4 before:block before:h-px before:flex-grow before:bg-gray-400
        after:ml-4 after:block after:h-px after:flex-grow after:bg-gray-400"
          >
            or
          </div>
          {/* <GoogleSignInButton>Sign up with Google</GoogleSignInButton> */}
          <p className="text-center text-sm text-gray-600 mt-2">
            If you already have an account, please&nbsp;
            <Link
              className="text-blue-500 hover:text-blue-700 hover:underline"
              href={"/sign-in"}
            >
              sign in.
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
