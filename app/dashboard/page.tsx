"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center flex-col gap-10">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push("/auth/signin")}
      >
        Sign In (sm)
      </Button>
      <Button
        variant="destructive"
        size="lg"
        onClick={() => router.push("/auth/signin")}
      >
        Sign In (large)
      </Button>
      <Button
        variant="ghost"
        size="lg"
        onClick={() => router.push("/auth/signup")}
      >
        Sign Up (ghost)
      </Button>
      <Button
        variant="link"
        size="lg"
        onClick={() => router.push("/auth/signup")}
      >
        Sign Up (link)
      </Button>
      <Button variant="myButton" onClick={() => router.push("/auth/signup")}>
        Custom Signup
      </Button>
    </div>
  );
}
