"use client";

import { SignInFormSchema, SignUpFormSchema } from "../lib/definitions";
import { SignUpFormData } from "@/components/form/SignUpForm";
import { SignInFormData } from "@/components/form/SignInForm";
import { signIn } from "next-auth/react";
import { CreateClubFormData } from "@/components/modal/CreateClubModal";
import { supabase } from "@/lib/supabaseClient";
import { EditClubFormData } from "@/components/modal/EditClubModal";

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

  // Call sign in with user credentials to authenticate the user session, then navigate to /admin
  const signInData = await signIn("credentials", {
    email: rawData.email,
    password: rawData.password,
    callbackUrl: "/admin",
  });
  if (signInData?.error) {
    console.log(signInData.error);
  } else {
    return { success: true, message: "Successfully signed in user" };
  }
}

export async function createClub(prevSate: unknown, formData: FormData) {
  console.log("createClub function called!", formData.get("club-tags"));

  const rawTags = formData.get("club-tags") as string;
  const tagsArray = rawTags ? JSON.parse(rawTags) : [];

  const rawData: CreateClubFormData = {
    name: formData.get("clubName"),
    description: formData.get("description"),
    clubImageFile: formData.get("image-file"),
    tags: tagsArray,
  };

  let clubImageUrl: string | undefined;
  const file = rawData.clubImageFile;
  try {
    if (file) {
      const fileName = `${Date.now()}-${(file as File).name}`;

      const { error } = await supabase.storage
        .from("club-card-images")
        .upload(fileName, file);
      if (error) {
        return { success: false, message: "File error not found" };
      }

      const { data: publicUrlData } = supabase.storage
        .from("club-card-images")
        .getPublicUrl(fileName);
      if (!publicUrlData || !publicUrlData.publicUrl) {
        return { success: false, message: "URL error" };
      }
      clubImageUrl = publicUrlData.publicUrl;
    } else {
      clubImageUrl =
        "https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742159481855-image.png";
    }

    // Send the api request
    const response = await fetch("/api/create/club", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: rawData.name,
        description: rawData.description,
        tags: rawData.tags,
        clubImage: clubImageUrl,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Club Scout: Failed to create club",
      };
    } else {
      const data = await response.json();
      // data.club now contains the newly created club data
      return { success: true, message: "Club created", club: data.club };
    }
  } catch (error) {
    return { success: false, message: "Club Scout: Server error", error };
  }
}

export async function editClub(prevState: unknown, formData: FormData) {
  console.log("Edit Club function called!", formData.get("club-tags"));

  const rawTags = formData.get("club-tags") as string;
  const tagsArray = rawTags ? JSON.parse(rawTags) : [];

  const rawData: EditClubFormData = {
    about: formData.get("about"),
    description: formData.get("description"),
    clubImageFile: formData.get("image-file"),
    tags: tagsArray,
    id: formData.get("id"),
  };

  const parsedId = rawData.id ? Number(rawData.id) : null;

  const file = rawData.clubImageFile;
  try {
    const clubImageUrl = await uploadImage(file as File, "club-card-images");

    const response = await fetch("/api/edit/club", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        about: rawData.about,
        description: rawData.description,
        tags: rawData.tags,
        clubImage: clubImageUrl,
        id: parsedId,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        message: "Club Scout: Failed to apply changes to the club",
      };
    }
    return { success: true, message: "Changes Applied" };
  } catch (error) {
    return { success: false, message: "Club Scout: Server error", error };
  }
}

async function uploadImage(file: File, uploadPath: string) {
  let clubImageUrl: string | undefined;
  try {
    if (file.name) {
      const fileName = `${Date.now()}-${file.name}`;

      // Upload the image file to the database storage bucket
      const { error } = await supabase.storage
        .from(uploadPath)
        .upload(fileName, file);
      if (error) {
        throw new Error("Error uploading image");
      }
      // retrieve the new url from storage and return it.
      const { data: publicUrlData } = supabase.storage
        .from(uploadPath)
        .getPublicUrl(fileName);

      clubImageUrl = publicUrlData.publicUrl;
    } else {
      clubImageUrl =
        "https://lrlhssmwttwvviyjtfes.supabase.co/storage/v1/object/public/club-card-images//1742159481855-image.png";
    }
    return clubImageUrl;
  } catch (error) {
    throw Error("Error uploading Image");
  }
}
