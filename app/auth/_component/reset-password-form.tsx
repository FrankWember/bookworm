"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { updatePassword } from "@/actions/update-password";
import { useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: any) => {
    setError("");
    setSuccess("");

    const { password, confirmPassword } = data;

    // Validate passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Check for token
    if (!token) {
      setError("No reset token provided");
      return;
    }

    setIsLoading(true);

    try {
      const res = await updatePassword(token, password);

      if (res?.error) {
        setError(res.error);
        setIsLoading(false);
        return;
      }

      if (res?.success) {
        setSuccess(res.success);
        setTimeout(() => {
          window.location.href = "/auth/signin";
        }, 1000);
      }
    } catch (err) {
      console.error("Error updating password:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex items-center gap-x-4">
                <FormLabel className="w-35">Password</FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="flex items-center gap-x-4">
                <FormLabel className="w-35">Confirm Password</FormLabel>
                <div className="flex-1">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <Button
            variant="default"
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
          <Button
            variant="link"
            className="text-xs underline"
            onClick={() => (window.location.href = "/auth/signin")}
            disabled={isLoading}
          >
            Back to Sign In
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ResetPasswordForm;
