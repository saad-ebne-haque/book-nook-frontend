import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PreviewBookCard from "@/components/books/PreviewBookCard";
import type { PreviewBook } from "@/data/previewBooks";

type HomepageBookSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  books: PreviewBook[];
};

export default function HomepageBookSection({
  id,
  eyebrow,
  title,
  description,
  books,
}: HomepageBookSectionProps) {
  return (
    <section
      className="booknook-home-arrivals"
      aria-labelledby={id}
    >
      <div className="booknook-home-section-heading">
        <div>
          <p className="booknook-eyebrow">{eyebrow}</p>
          <h2 id={id}>{title}</h2>
          <p className="booknook-home-section-intro">{description}</p>
        </div>
      </div>

      <div className="booknook-home-book-grid">
        {books.map((book) => (
          <PreviewBookCard
            key={book._id}
            book={book}
            titleLevel="h3"
            action={
              <Link
                className="booknook-home-details-button"
                href={`/books/${book._id}`}
              >
                View Details
              </Link>
            }
          />
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
