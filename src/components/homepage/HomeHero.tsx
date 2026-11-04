import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";
import { previewBooks } from "@/data/previewBooks";

export default function HomeHero() {
  const featuredBook = previewBooks[0];

  return (
    <section className="booknook-home-hero" aria-labelledby="home-hero-title">
      <div className="booknook-home-hero-inner">
        <div className="booknook-home-hero-copy">
          <p className="booknook-eyebrow">
            <Sparkles size={16} aria-hidden="true" />
            A library for curious minds
          </p>
          <h1 id="home-hero-title">
            Discover <span>great books</span>, one story at a time.
          </h1>
          <p className="booknook-home-intro">
            Find a little inspiration for your next chapter in a thoughtfully
            curated collection made for readers who love getting lost in a good
            story.
          </p>
          <div className="booknook-home-actions">
            <Link
              className="booknook-button booknook-button-primary booknook-home-primary-action"
              href="/books"
            >
              Browse Books
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <p className="booknook-home-note">
            <BookOpen size={16} aria-hidden="true" />
            Your next favorite is waiting to be discovered.
          </p>
        </div>

        <div
          className="booknook-home-hero-art"
          role="img"
          aria-label="A sunlit reading corner with a stack of books and a leafy plant"
        >
          <div className="booknook-home-art-sun" aria-hidden="true" />
          <div className="booknook-home-art-window" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="booknook-home-art-plant" aria-hidden="true">
            <span />
            <span />
            <span />
            <i />
          </div>
          <div
            className="booknook-home-art-book booknook-home-art-book-back"
            aria-hidden="true"
          >
            <span />
          </div>
          <div
            className="booknook-home-art-book booknook-home-art-book-middle"
            aria-hidden="true"
          >
            <span />
          </div>
          <div
            className="booknook-home-art-book booknook-home-art-book-front"
            aria-hidden="true"
          >
            <BookOpen size={30} strokeWidth={1.5} />
            <span>{featuredBook?.title ?? "Explore the shelf"}</span>
          </div>
          <div className="booknook-home-art-shelf" aria-hidden="true" />
          <div className="booknook-home-art-caption" aria-hidden="true">
            <span className="booknook-home-caption-mark">
              <BookOpen size={19} />
            </span>
            <span>
              <strong>A quieter corner</strong>
              <small>For your next chapter</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
