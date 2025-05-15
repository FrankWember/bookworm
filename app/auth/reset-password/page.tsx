import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LockClosedIcon } from "@radix-ui/react-icons";
import React, { Suspense } from "react";
import Image from "next/image";

import { Noto_Sans } from "next/font/google";
import ResetPasswordForm from "../_component/reset-password-form";

const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

function NewPassword() {
  return (
    <div className="flex min-h-screen">
      {/* Left: New Password form */}
      <div className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md p-4">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold flex items-center justify-center space-x-2">
              <LockClosedIcon className="h-6 w-6" />
              <span>New Password</span>
            </CardTitle>
            <CardDescription>
              Ready to empower your Reading Journey? Let's get started.
            </CardDescription>
            <CardContent>
              <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordForm />
              </Suspense>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
      {/* Right: Illustration */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center bg-white">
        <div className="absolute inset-0 z-0 brightness-75">
          <Image
            src="/signin.png"
            alt="Book reading illustration"
            fill
            className="w-full h-full object-cover"
          />
        </div>
        {/* Foreground content */}
        <div
          className={`relative z-10 flex flex-col items-center h-full p-3 max-w-md justify-center text-center gap-4 mt-10 ${noto.className}`}
        >
          <h1 className="text-5xl font-bold text-white items-center">
            BOOKWORM
          </h1>
          <p className="text-white text-xl justify-center ">
            Every hero faces a setback. Reset your password and finish your arc
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
