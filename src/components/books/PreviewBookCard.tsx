import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import PreviewBookCover from "@/components/books/PreviewBookCover";
import type { PreviewBook } from "@/data/previewBooks";

type PreviewBookCardProps = {
  book: PreviewBook;
  titleLevel: "h2" | "h3";
  action?: ReactNode;
};

export default function PreviewBookCard({
  book,
  titleLevel,
  action,
}: PreviewBookCardProps) {
  const Heading = titleLevel;
  const isAvailable = book.availableCopies > 0;

  return (
    <article className="booknook-home-book-card">
      <Link
        className="booknook-home-book-link"
        href={`/books/${book.id}`}
      >
        <div className="booknook-home-book-cover-stage">
          <PreviewBookCover book={book} />
        </div>
        <div className="booknook-home-book-details">
          <Badge className="booknook-home-book-category" variant="outline">
            {book.category}
          </Badge>
          <Heading>{book.title}</Heading>
          <p className="booknook-home-book-author">by {book.author}</p>
          <div
            className="booknook-home-book-rating"
            aria-label={`Rated ${book.rating.toFixed(1)} out of 5`}
          >
            <Star size={15} fill="currentColor" aria-hidden="true" />
            <span>{book.rating.toFixed(1)}</span>
          </div>
          <p
            className={`booknook-home-book-availability${isAvailable ? "" : " booknook-home-book-availability-unavailable"}`}
          >
            {isAvailable
              ? `${book.availableCopies} copies available`
              : "Currently unavailable"}
          </p>
        </div>
      </Link>
      {action ? <div className="booknook-home-book-action">{action}</div> : null}
    </article>
  );
}
