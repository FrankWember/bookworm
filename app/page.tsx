"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BookwormLandingPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

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
      <div className="relative w-full justify-center items-center min-h-[60vh] overflow-hidden">
        <div className="relative w-full aspect-[16/9]">
          <Image
            src="/hero-backdrop.jpg"
            alt="Backdrop"
            fill
            priority
            className="object-cover brightness-35"
          />
        </div>

        {/* Overlay content */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl text-center px-6"
          >
            <h1 className="text-5xl font-bold tracking-tight text-white mb-6">
              Discover, Connect & Share
            </h1>
            <p className="text-2xl text-gray-200 mb-8">
              Bookworm is the social space for book lovers. Share reviews, track
              your reading, and meet others who vibe with your shelf.
            </p>

            <Card className="shadow-xl">
              <CardContent className="p-6">
                <p className="text-lg font-medium mb-4">Join the waitlist</p>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button className="px-6">Notify Me</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Pain Journey Section */}
      <section className="mt-25 max-w-6xl space-y-24">
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
            On Bookworm, you can connect with people who vibe with your taste,
            see what your friends are reading, and chat about the stories you
            love. AI-powered recommendations—based on your shelf, your friends’,
            and your past reads—make discovery feel personal, not random.
          </p>
        </motion.div>
      </section>

      {/* Feature Section */}
      <section className="mt-28 w-full max-w-6xl px-4">
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
          Bookworm isn’t just another book app. It’s your reading companion,
          your friends, your bookshelf — all in one.
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
      className="bg-white p-2 rounded-2xl shadow-md border border-gray-200 text-left flex flex-col items-center transition-transform duration-300"
    >
      {/* Parent container with defined height */}
      <div className="relative w-full h-64 mb-4">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="rounded-xl object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
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
