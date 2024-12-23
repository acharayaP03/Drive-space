"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAuthFormSchema } from "@/lib/utils";
import { createAccount } from "@/lib/actions/user.actions";

import Image from "next/image";
import Link from "next/link";
import FormField from "./FormFields/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

type FormType = "login" | "register";

export default function AuthForm({ type }: { type: FormType }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState("");

  const formSchema = useAuthFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const user = await createAccount({
        fullName: values.fullName,
        email: values.email,
      });

      setAccountId(user.accountId);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage("Failed to create account. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === "login" ? "Login" : "Register new account"}
          </h1>

          {type === "register" && (
            <FormField
              form={form}
              name="fullName"
              placeholderLabel="Enter your name"
              fieldLabel="Full name"
            />
          )}

          <FormField
            form={form}
            name="email"
            placeholderLabel="Enter your email"
            fieldLabel="Email"
          />

          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {type === "login" ? "Sign In" : "Create new account"}

            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && <p className="error-message">*{errorMessage}</p>}

          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "login" ? "/register" : "/login"}
              className="ml-1 font-medium text-brand"
            >
              {" "}
              {type === "login" ? "Create new account" : "Login"}
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
