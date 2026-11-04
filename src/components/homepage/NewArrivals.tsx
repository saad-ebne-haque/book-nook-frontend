import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PreviewBookCard from "@/components/books/PreviewBookCard";
import { previewBooks } from "@/data/previewBooks";

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
        {previewBooks.map((book) => (
          <PreviewBookCard
            key={book.title}
            book={book}
            titleLevel="h3"
            categoryBadge={
              <Badge className="booknook-home-book-category" variant="outline">
                {book.category}
              </Badge>
            }
            action={
              <Button
                className="booknook-home-details-button"
                size="sm"
                type="button"
                variant="outline"
              >
                View Details
              </Button>
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
