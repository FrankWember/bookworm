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

type SignInFormValues = {
  email: string;
  password: string;
};

export function SignInForm() {
  const form = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInFormValues) => {
    console.log("Mock submit:", data);
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
          <Button type="submit" className="w-full">
            Sign In
          </Button>
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
        <Button variant="outline" className="flex items-center gap-2 w-full">
          <Image src="/google.svg" alt="Google Icon" width={16} height={16} />
          Sign in with Google
        </Button>
        <Button variant="outline" className="flex items-center gap-2 w-full">
          <Image
            src="/facebook.svg"
            alt="Facebook Icon"
            width={16}
            height={16}
          />
          Sign in with Facebook
        </Button>
      </div>
    </div>
  );
}
