"use client";

import { useEffect, useState, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons";
import { BeatLoader } from "react-spinners";
import { newVerification } from "@/actions/new-verification";

export function VerificationForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      setError("Verification token is missing.");
      return;
    }

    startTransition(() => {
      newVerification(token).then((res) => {
        if (res?.error) {
          setError(res.error);
        }
        if (res?.success) {
          setSuccess(res.success);
          setTimeout(() => {
            router.push("/auth/signin");
          }, 1000);
        }
      });
    });
  }, [token, router]);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {isPending && <BeatLoader color="#000" size={30} />}

      <div className="w-full max-w-md">
        {error && (
          <Alert variant="destructive" className="flex justify-start gap-4">
            <ExclamationTriangleIcon className="h-6 w-6 mt-1" />
            <div>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </div>
          </Alert>
        )}

        {success && (
          <Alert className="flex items-start gap-4">
            <RocketIcon className="h-6 w-6 mt-1" />
            <div>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </div>
          </Alert>
        )}
      </div>
    </div>
  );
}
