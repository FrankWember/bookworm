"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { BeatLoader } from "react-spinners";
import { register } from "@/actions/register";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons";
type SignUpFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignUpForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    setError("");
    setSuccess("");

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    startTransition(() => {
      register(data).then((res) => {
        setError(res.error);
        setSuccess(res.success);
      });
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jane Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <BeatLoader size={10} color="#fff" />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive">
          <ExclamationTriangleIcon className="h-12 w-12" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert>
          <RocketIcon className="h-6 w-6" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      <div className="relative">
        <div className="my-6 h-px w-full bg-gray-300"></div>
        <span className="absolute left-1/2 top-[-12px] -translate-x-1/2 bg-white px-2 text-sm text-muted-foreground">
          or continue with
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="outline" className="flex items-center gap-2 w-full">
          <Image src="/google.svg" alt="Google Icon" width={16} height={16} />
          Sign up with Google
        </Button>
        {/* <Button variant="outline" className="flex items-center gap-2 w-full">
          <Image
            src="/facebook.svg"
            alt="Facebook Icon"
            width={16}
            height={16}
          />
          Sign up with Facebook
        </Button> */}
      </div>
    </div>
  );
}
