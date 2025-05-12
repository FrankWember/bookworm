"use client";

import Link from "next/link";
import { Noto_Sans } from "next/font/google";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { Suspense } from "react";
import { SignInForm } from "../_component/sign-in-form";
import Image from "next/image";

const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const SignInPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left: Sign-in form */}
      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md p-4">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-3xl font-bold">
              <LockClosedIcon className="h-6 w-6" />
              Sign In
            </CardTitle>
            <CardDescription>
              Ready to empower your Reading Journey? Let's get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading...</div>}>
              <SignInForm />
            </Suspense>
            {/* Navigation Button */}
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="text-blue-500 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right: Illustration */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center bg-white">
        {/* Background image */}
        <Image
          src="/signin.png"
          alt="Book reading illustration"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 brightness-75"
        />

        {/* Foreground content */}
        <div
          className={`relative z-10 flex flex-col items-center h-full p-3 max-w-md justify-center text-center gap-4 mt-10 ${noto.className}`}
        >
          <h1 className="text-5xl font-bold text-white items-center">
            BOOKWORM
          </h1>
          <p className="text-white text-xl justify-center ">
            Somewhere out there, someone underlined the same sentence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
