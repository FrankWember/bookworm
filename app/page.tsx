"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { startTransition, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { waitlist } from "@/actions/waitlist";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export default function BookwormLandingPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Clear error after a seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Initialize react-hook-form
  const form = useForm<{ email: string }>({
    defaultValues: { email: "" },
  });

  const handleWaitlistSubmit = (data: { email: string }) => {
    setError("");
    startTransition(() => {
      waitlist(data.email).then((res) => {
        if (res?.error) setError(res.error);
        if (res?.success) setSuccess(res.success);
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f7ed] to-[#dadad3] flex flex-col items-center">
      {/* Header Section */}
      <header className="w-full bg-white/80 backdrop-blur-md shadow-md py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-3xl font-bold text-gray-900 transition"
          >
            Bookworm
          </Link>

          {/* Auth Buttons */}
          <nav className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => router.push("/auth/signin")}
            >
              Login
            </Button>
            <Button
              variant="default"
              onClick={() => router.push("/auth/signup")}
            >
              Sign Up
            </Button>
          </nav>
        </div>
      </header>

      {/* Backdrop Section */}
      <div className="relative w-full h-[80vh] sm:h-[60vh]">
        <Image
          src="/hero-backdrop.jpg"
          alt="Backdrop"
          fill
          priority
          className="object-cover brightness-35"
        />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="w-full max-w-xl"
          >
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Discover, Connect & Share
            </h1>
            <p className="text-lg sm:text-2xl text-gray-200 mb-6">
              Bookworm is the social space for book lovers. Share reviews, track
              your reading, and meet others who vibe with your shelf.
            </p>
            <Card className="bg-white/90 shadow-lg flex flex-1 p-4 rounded-lg">
              <CardContent className="py-2">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleWaitlistSubmit)}
                    className="space-y-4"
                  >
                    <div className="flex gap-2 items-end mb-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="flex-1 ">
                            <FormLabel className="justify-center text-xl font-semibold ">
                              Join the waitlist
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                {...field}
                                className="w-full "
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="h-8 justify-center">
                        Join The Waitlist
                      </Button>
                    </div>
                    {error && <div className="text-red-500">{error}</div>}
                    {success && <div className="text-green-600">{success}</div>}
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Pain Journey Section */}
      <section className="mt-10 w-full max-w-6xl px-4 space-y-24">
        <ContentBlock
          imgSrc="/lonely-reader.png"
          title="Reading feels isolating"
          text="You finish an amazing book—your heart’s pounding, your mind’s racing... and there’s no one to share that with. No one who gets it. Reading becomes a solitary echo."
        />
        <ContentBlock
          imgSrc="/choice-fatigue.jpg"
          title="Overwhelmed by options"
          text="Thousands of new releases, dozens of unread recommendations. You spend more time browsing than reading—caught in decision fatigue."
          reversed
        />
        <ContentBlock
          imgSrc="/disconnected-notes.jpg"
          title="Notes scattered everywhere"
          text="Quotes in one app. Reviews on another. Your highlights lost in a sea of screenshots. You can't revisit what inspired you."
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            This is where Bookworm steps in.
          </h2>
          <p className="text-lg text-gray-700">
            Bookworm connects you with people who share your taste in books. See
            what friends are reading, chat about books you love, and get
            AI-powered reading recommendations based on your shelf, your
            friends’, and your reading history.
          </p>
        </motion.div>
      </section>

      {/* Feature Section */}
      <section className="mt-28 w-full max-w-6xl px-2">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <Feature
            title="Read Together"
            desc="Share your reads with people who get it—and keep the story alive together."
            imgSrc="/book-friends.png"
          />
          <Feature
            title="Track Progress"
            desc="Log your reads, jot down notes, and stay motivated."
            imgSrc="/track-books.png"
          />

          <Feature
            title="Smart Discovery"
            desc="Get book AI recommendations tailored to your exact taste."
            imgSrc="/book-ai.jpg"
          />
        </motion.div>
      </section>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mt-28 max-w-xl text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Your reading journey deserves more.
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Bookworm is your reading companion, your friends, and your bookshelf —
          all in one.
        </p>
        <Button className="px-6 py-3 text-lg mb-10">Get Early Access</Button>
      </motion.div>
    </div>
  );
}

function Feature({
  title,
  desc,
  imgSrc,
}: {
  title: string;
  desc: string;
  imgSrc: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-3 rounded-2xl shadow-md border border-gray-200 text-left flex flex-col items-center transition-transform duration-300 max-h-[420px]"
    >
      {/* Fixed-height image container */}
      <div className="w-full h-72 relative rounded-xl overflow-hidden mb-4">
        <Image src={imgSrc} alt={title} fill className="object-cover" />
      </div>

      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-gray-600 text-sm text-center">{desc}</p>
    </motion.div>
  );
}

function ContentBlock({
  imgSrc,
  title,
  text,
  reversed = false,
}: {
  imgSrc: string;
  title: string;
  text: string;
  reversed?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: true }}
      className={`flex flex-col-reverse sm:flex-row ${reversed ? "sm:flex-row-reverse" : ""} items-center gap-10`}
    >
      <div className="sm:w-1/2 text-center sm:text-left">
        <h3 className="text-3xl font-semibold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-700 text-lg">{text}</p>
      </div>
      <div className="sm:w-1/2">
        <Image
          src={imgSrc}
          alt={title}
          width={500}
          height={400}
          className="rounded-2xl object-cover shadow-md"
        />
      </div>
    </motion.div>
  );
}
