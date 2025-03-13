"use server";

import { z } from "zod";
import { SignInFormSchema, SignUpFormSchema } from "../lib/definitions";
import { SignUpFormData } from "@/components/form/SignUpForm";
import { SignInFormData } from "@/components/form/SignInForm";

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
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (!response.ok) {
      return { success: false, message: "Failed to register user" };
    } else {
      return { success: true, message: "User registered" };
    }
  } catch (error) {
    return { success: false, message: "Server error", error };
  }
}

export async function signIn(prevSate: unknown, formData: FormData) {
  const rawData: SignInFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const validatedData = SignUpFormSchema.safeParse(rawData);
  if (!validatedData.success) {
    return {
      success: false,
      message: "Invalid input",
      errors: validatedData.error.flatten().fieldErrors,
      input: rawData,
    };
  }
  return { success: true, message: "Signup successful!" };

  // Call provider Database to create a user or check if one already exists.
}
