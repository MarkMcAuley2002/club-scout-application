"use client";

import { SignInFormSchema, SignUpFormSchema } from "../lib/definitions";
import { SignUpFormData } from "@/components/form/SignUpForm";
import { SignInFormData } from "@/components/form/SignInForm";
import { signIn } from "next-auth/react";

export async function signup(prevSate: unknown, formData: FormData) {
  const validateFormFields = SignInFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const rawData: SignUpFormData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const validatedData = SignUpFormSchema.safeParse(rawData);

  if (!validateFormFields.success) {
    return {
      success: false,
      message: "Invalid input",
      errors: validatedData.error?.flatten().fieldErrors,
      input: rawData,
    };
  }

  try {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: rawData.username,
        email: rawData.email,
        password: rawData.password,
      }),
    });

    if (!response.ok) {
      return { success: false, message: "Club Scout: Failed to register user" };
    } else {
      return { success: true, message: "User registered" };
    }
  } catch (error) {
    return { success: false, message: "Club Scout: Server error", error };
  }
}

export async function signin(prevSate: unknown, formData: FormData) {
  const rawData: SignInFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedData = SignInFormSchema.safeParse(rawData);
  if (!validatedData.success) {
    return {
      success: false,
      message: "Club Scout: Unable to validate user data",
      errors: validatedData.error.flatten().fieldErrors,
      input: rawData,
    };
  }

  // StartHere
  
  const signInData = await signIn("credentials", {
    email: rawData.email,
    password: rawData.password,
    callbackUrl: '/admin'
  })
  if(signInData?.error){
    console.log(signInData.error);
  }else{
    return { success: true, message: "Successfully signed in user" }; 
  }

  // Call provider Database to create a user or check if one already exists.
}

export async function createClub(prevSate: unknown, formData: FormData){
  return {success: true, message: "Success"};
}
