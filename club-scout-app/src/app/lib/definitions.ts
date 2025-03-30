import { title } from "process";
import z, { date } from "zod";

export const SignInFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .trim(),
  password: z
    .string()
    .nonempty({ message: "This field is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
      message: "Must contain at least one letter and one number",
    })
    .trim(),
});

export const SignUpFormSchema = z
  .object({
    username: z
      .string()
      .nonempty({ message: "This field is required" })
      .min(2, { message: "User name must be at least 2 characters long" })
      .max(15, { message: "User name must be at most 20 characters long" })
      .regex(/^[a-zA-Z0-9_]*$/, {
        message:
          "User name must contain only letters, numbers, and underscores",
      })
      .trim(),
    email: z
      .string()
      .nonempty({ message: "This field is required" })
      .email({ message: "Please enter a valid email address" })
      .trim(),
    password: z
      .string()
      .nonempty({ message: "This field is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
        message: "Must contain at least one letter and one number",
      })
      .trim(),
    confirmPassword: z
      .string()
      .nonempty({ message: "This field is required" })
      .trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

// Define a Schema for input validation
export const NewUserSchema = z.object({
  username: z
    .string()
    .nonempty({ message: "This field is required" })
    .min(2, { message: "User name must be at least 2 characters long" })
    .max(15, { message: "User name must be at most 20 characters long" })
    .regex(/^[a-zA-Z0-9_]*$/, {
      message: "User name must contain only letters, numbers, and underscores",
    })
    .trim(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .trim(),
  password: z
    .string()
    .nonempty({ message: "This field is required" })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d).+$/, {
      message: "Must contain at least one letter and one number",
    })
    .trim(),
});

export const newClubSchema = z.object({
  name: z.string().nonempty({ message: "This field is required" }).trim(),
  description: z.string().trim(),
  tags: z.array(z.string()),
  clubImage: z.string().trim(),
});

export const newMembershipSchema = z.object({
  club_id: z.number(),
  role: z.string(),
});

export const removeMembershipSchema = z.object({
  club_id: z.number(),
});

export const newEventSchema = z.object({
  title: z.string().trim(),
  date: z
    .string()
    .refine((date) => new Date(date).toString() !== "Invalid Date", {
      message: "A valid date is required",
    })
    .transform((date) => new Date(date)),
  details: z.string(),
  club_id: z.number(),
});
