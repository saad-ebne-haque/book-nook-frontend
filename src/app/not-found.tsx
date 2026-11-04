"use client";

import { Button } from "@heroui/react";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="booknook-not-found" aria-labelledby="not-found-title">
      <div className="booknook-not-found-content">
        <div className="booknook-not-found-illustration" aria-hidden="true">
          <div className="booknook-not-found-orbit booknook-not-found-orbit-one" />
          <div className="booknook-not-found-orbit booknook-not-found-orbit-two" />
          <Sparkles className="booknook-not-found-sparkle" size={20} />
          <div className="booknook-not-found-books">
            <span />
            <span />
            <span />
          </div>
          <div className="booknook-not-found-open-book">
            <BookOpen size={58} strokeWidth={1.35} />
          </div>
          <span className="booknook-not-found-page-mark">404</span>
        </div>

        <p className="booknook-eyebrow">A little off the shelf</p>
        <h1 id="not-found-title">Oops! Page Not Found.</h1>
        <p className="booknook-not-found-description">
          We couldn’t find the page you were looking for. Let’s get you back to
          the reading room.
        </p>
        <Button
          className="booknook-not-found-home"
          onPress={() => router.push("/")}
          type="button"
          variant="primary"
          size="lg"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          Back to Home
        </Button>
      </div>
    </section>
  );
}
