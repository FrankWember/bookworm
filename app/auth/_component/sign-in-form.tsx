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
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { use, useState, useTransition } from "react";
import { login } from "@/actions/login";
import { BeatLoader } from "react-spinners";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import { DEFAULT_SIGNIN_REDIRECT } from "@/constants/routes";

type SignInFormValues = {
  email: string;
  password: string;
};

export function SignInForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onClick = (provider = "google") => {
    signIn(provider, {
      callbackUrl: DEFAULT_SIGNIN_REDIRECT,
    });
  };
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in used with a different provider"
      : null;

  const onSubmit = (data: SignInFormValues) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(data).then((res) => {
        if (res?.error) setError(res.error);
        if (res?.success) {
          setSuccess(res.success);
        }
      });
    });
  };

  return (
    <div className="space-y-6">
      {/* Email/Password form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            rules={{ required: "Email is required" }}
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
            rules={{ required: "Password is required" }}
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
          {(error || urlError) && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-12 w-12" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error || urlError}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <RocketIcon className="h-6 w-6" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full">
            Sign In
          </Button>
          <div className="flex items-center">
            <Button
              variant="link"
              className="text-xs underline"
              onClick={() => router.push("/auth/forgot-password")}
            >
              Forgot password?
            </Button>
          </div>
        </form>
      </Form>

      {/* Divider */}
      <div className="relative">
        <div className="my-6 h-px w-full bg-gray-300"></div>
        <span className="absolute left-1/2 top-[-12px] -translate-x-1/2 bg-white px-2 text-sm text-muted-foreground">
          or continue with
        </span>
      </div>

      {/* OAuth Buttons (UI only) */}
      <div className="flex flex-col gap-3">
        <Button
          variant="outline"
          className="flex items-center gap-2 w-full"
          onClick={() => onClick("google")}
        >
          <Image src="/google.svg" alt="Google Icon" width={16} height={16} />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
