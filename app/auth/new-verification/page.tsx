"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Noto_Sans } from "next/font/google";
import { VerificationForm } from "../_component/new-verification-form";
import { Suspense } from "react";

const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const VerifyPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left: Form */}
      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md p-4">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">
              Email Verification
            </CardTitle>
            <CardDescription>
              Verifying your email… this won’t take long.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={<div className="text-center mt-10">Loading...</div>}
            >
              <VerificationForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      {/* Right: Illustration */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center bg-white">
        <Image
          src="/signin.png"
          alt="Verification illustration"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 brightness-75"
        />
        <div
          className={`relative z-10 flex flex-col items-center h-full p-3 max-w-md justify-center text-center gap-4 mt-10 ${noto.className}`}
        >
          <h1 className="text-5xl font-bold text-white items-center">
            BOOKWORM
          </h1>
          <p className="text-white text-xl justify-center">
            Unlock a deeper reading journey with verified access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
