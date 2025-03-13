"use client";

import React, { useActionState } from "react";
import { signup } from "@/app/actions/auth";
import { FormInput } from "lucide-react";
import { z } from "zod";
import { useFormState } from "react-dom";
import Link from "next/link";

export interface SignInFormData {
  email?: FormDataEntryValue | null;
  password?: FormDataEntryValue | null;
}

const SignInForm: React.FC = () => {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <div className="bg-gray-100 shadow-md rounded-md p-5">
      <h2 className="text-xl font-semibold text-center mb-2">Sign In</h2>
      <form action={action}>
        <div className="">
          {/* Username Field */}
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
          <div className="mb-10">
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
              Array.isArray(state?.errors?.password) && (
                <div className="absolute">
                  {state?.errors?.password.map((error, index) => (
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
              Log In
            </button>
          </div>
        </div>
      </form>
      <div
        className="mx-auto my-4 flex w-full items-center justify-evenly
        before:mr-4 before:block before:h-px before:flex-grow before:bg-gray-400
        after:ml-4 after:block after:h-px after:flex-grow after:bg-gray-400"
      >
        or
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don&apos;t have an account, please&nbsp;
        <Link
          className="text-blue-500 hover:text-blue-700 hover:underline"
          href={"/sign-up"}
        >
          sign up.
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;

// Change Profile Pic - Could be useful
//  <div className="col-span-full">
//    <label className="block text-sm/6 font-medium text-gray-900">Photo</label>
//    <div className="mt-2 flex items-center gap-x-3">
//      <svg
//        className="size-12 text-gray-300"
//        viewBox="0 0 24 24"
//        fill="currentColor"
//        aria-hidden="true"
//        data-slot="icon"
//      >
//        <path
//          fill-rule="evenodd"
//          d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
//          clip-rule="evenodd"
//        />
//      </svg>
//      <button
//        type="button"
//        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
//      >
//        Change
//      </button>
//    </div>
//  </div>;
