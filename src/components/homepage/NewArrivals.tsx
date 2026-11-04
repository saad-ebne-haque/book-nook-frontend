import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const newArrivals = [
  {
    title: "The Quiet Between Pages",
    author: "Mara Ellison",
    category: "Literary Fiction",
    cover: "garden",
  },
  {
    title: "A Map of Small Wonders",
    author: "Jonah Reed",
    category: "Adventure",
    cover: "atlas",
  },
  {
    title: "The Light We Keep",
    author: "Nora Vale",
    category: "Contemporary",
    cover: "light",
  },
  {
    title: "Wildflower Season",
    author: "Elliot James",
    category: "Nature",
    cover: "wildflower",
  },
  {
    title: "An Atlas of Ordinary Days",
    author: "Sofia Bennett",
    category: "Essays",
    cover: "ordinary",
  },
  {
    title: "The Last Bookshop Lane",
    author: "Aria North",
    category: "Mystery",
    cover: "bookshop",
  },
];

export default function NewArrivals() {
  return (
    <section
      className="booknook-home-arrivals"
      aria-labelledby="home-arrivals-title"
    >
      <div className="booknook-home-section-heading">
        <div>
          <p className="booknook-eyebrow">A first look at the shelf</p>
          <h2 id="home-arrivals-title">New Arrivals</h2>
          <p className="booknook-home-section-intro">
            A static preview with illustrative titles and cover artwork.
          </p>
        </div>
      </div>

      <div className="booknook-home-book-grid">
        {newArrivals.map((book) => (
          <article className="booknook-home-book-card" key={book.title}>
            <div className="booknook-home-book-cover-stage">
              <div
                className={`booknook-home-book-cover booknook-home-cover-${book.cover}`}
                role="img"
                aria-label={`Illustrated cover for ${book.title} by ${book.author}`}
              >
                <svg
                  className="booknook-home-cover-art"
                  viewBox="0 0 320 420"
                  aria-hidden="true"
                >
                  <circle cx="238" cy="104" r="72" />
                  <path d="M38 292c48-72 92-72 132 0s80 72 112 0" />
                  <path d="M44 316c42-46 78-46 112 0s76 46 112 0" />
                </svg>
                <span className="booknook-home-cover-line" aria-hidden="true" />
                <BookOpen
                  className="booknook-home-cover-mark"
                  size={28}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="booknook-home-cover-title">{book.title}</span>
                <span className="booknook-home-cover-author">{book.author}</span>
              </div>
            </div>

            <div className="booknook-home-book-details">
              <Badge
                className="booknook-home-book-category"
                variant="outline"
              >
                {book.category}
              </Badge>
              <h3>{book.title}</h3>
              <p>by {book.author}</p>
              <Button
                className="booknook-home-details-button"
                size="sm"
                type="button"
                variant="outline"
              >
                View Details
              </Button>
            </div>
          </article>
        ))}
      </div>

      <div className="booknook-home-arrivals-action">
        <Button asChild>
          <Link href="/books">
            See All Books
            <ArrowRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
