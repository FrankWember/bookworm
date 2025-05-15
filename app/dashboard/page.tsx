"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { signOut } from "next-auth/react"; // ✅ Import signOut

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export default function Home() {
  const router = useRouter();

  return (
    <div
      className={`flex justify-center items-center flex-col gap-10 ${poppins.className}`}
    >
      <h1 className="text-3xl font-bold">Welcome to Bookworm</h1>

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

      {/* ✅ Sign Out button */}
      <Button
        variant="secondary"
        size="lg"
        onClick={() => signOut({ callbackUrl: "/auth/signin" })}
      >
        Sign Out
      </Button>
    </div>
  );
}
