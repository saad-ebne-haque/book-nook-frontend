import { Badge } from "@heroui/react";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import PreviewBookCard from "@/components/books/PreviewBookCard";
import { previewBooks } from "@/data/previewBooks";

export default function AllBooksPage() {
  return (
    <section className="booknook-catalog" aria-labelledby="catalog-title">
      <header className="booknook-catalog-heading">
        <p className="booknook-eyebrow">
          <Sparkles size={16} aria-hidden="true" />
          Find your next favorite
        </p>
        <h1 id="catalog-title">Explore Our Books</h1>
        <p>
          Wander through stories, ideas, and new perspectives waiting to be
          discovered.
        </p>
        <p className="booknook-catalog-preview-note">
          These book listings are illustrative previews.
        </p>
      </header>

      <div className="booknook-home-book-grid">
        {previewBooks.map((book) => (
          <PreviewBookCard
            key={book.id}
            book={book}
            titleLevel="h2"
            categoryBadge={
              <Badge className="booknook-home-book-category" variant="soft">
                {book.category}
              </Badge>
            }
            action={
              <Link
                className="booknook-home-details-button"
                href={`/books/${book.id}`}
              >
                View Details
              </Link>
            }
          />
        ))}
      </div>
    </section>
  );
}
