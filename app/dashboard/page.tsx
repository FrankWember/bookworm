// HomePage.jsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
type ReviewCardProps = {
  user: string;
  book: string;
  review: string;
  image: string;
};

export default function BookwormHomePage() {
  return (
    <div className="min-h-screen bg-[#f3f2ec]">
      {/* Header */}
      <header className="w-full bg-white/90 backdrop-blur-md shadow-md py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-gray-900">
            Bookworm
          </Link>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/explore")}
            >
              Explore
            </Button>
            <Button
              variant="default"
              onClick={() => (window.location.href = "/auth/profile")}
            >
              My Profile
            </Button>
          </div>
        </div>
      </header>

      {/* Intro Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Welcome to Bookworm
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
          A vibrant community where book lovers share insights, discover new
          reads, and connect over their favorite stories. Whether you're into
          thrillers, classics, or poetry—Bookworm is your new reading home.
        </p>
      </section>

      {/* Community Feed Preview */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Top Reviews
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReviewCard
              user="@emma_reads"
              book="The Midnight Library"
              review="A beautiful meditation on regret and possibility. This one stayed with me."
              image="/Midnight.jpg"
            />
            <ReviewCard
              user="@alexpoetry"
              book="Milk and Honey"
              review="Raw, emotional, and empowering."
              image="/milkHoney.jpg"
            />
            <ReviewCard
              user="@litlover"
              book="1984"
              review="Hits too close to home in today’s world. Must-read."
              image="/1984.webp"
            />
          </div>
        </div>
      </section>

      {/* Join Discussion Section */}
      <section className="bg-[#f9f7ed] py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Join the Discussion
        </h2>
        <p className="text-gray-700 mb-6 max-w-xl mx-auto">
          Dive into trending topics, genre-specific forums, and buddy reads.
          Bookworm isn’t just about reading—it’s about sharing.
        </p>
        <Button onClick={() => (window.location.href = "/community")}>
          Explore Community
        </Button>
      </section>
    </div>
  );
}

function ReviewCard({ user, book, review, image }: ReviewCardProps) {
  return (
    <Card className="rounded-xl overflow-hidden shadow-md p-0">
      <div className="w-full h-[320px] relative">
        <Image src={image} alt={book} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{book}</h3>
        <p className="text-gray-600 italic mb-2">by {user}</p>
        <p className="text-gray-700">{review}</p>
      </CardContent>
    </Card>
  );
}
