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
import Image from "next/image";
import { SignUpForm } from "../_component/sign-up-form";

const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const SignUpPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left: Sign-up form */}
      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md p-4">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-3xl font-bold">
              <LockClosedIcon className="h-6 w-6" />
              Sign Up
            </CardTitle>
            <CardDescription>
              Books brought you here. People will make you stay...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading...</div>}>
              <SignUpForm />
            </Suspense>
            {/* Navigation Button */}
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="text-blue-500 hover:underline"
                >
                  Sign In
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
          src="/signup.png"
          alt="Book reading illustration"
          fill
          className="object-cover absolute inset-0 z-0 backdrop-blur-sm brightness-55"
        />

        {/* Foreground content */}
        <div
          className={`relative z-10 flex flex-col items-center h-full p-3 max-w-l justify-center text-center mt-30 ${noto.className}`}
        >
          <h1 className="text-5xl font-bold text-white items-center">
            BOOKWORM
          </h1>
          <p className="text-white text-xl text-glow text-center mt-4 ">
            Every story you’ve loved left a mark.
            <br />
            Here, you will meet those who carry the same.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
