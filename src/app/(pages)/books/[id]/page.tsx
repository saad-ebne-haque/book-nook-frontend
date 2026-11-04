import { Badge, Card } from "@heroui/react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronRight,
  Sparkles,
  Star,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import BorrowConfirmationModalPreview from "@/components/books/BorrowConfirmationModalPreview";
import PreviewBookCover from "@/components/books/PreviewBookCover";
import { previewBooks } from "@/data/previewBooks";

export function generateStaticParams() {
  return previewBooks.map(({ id }) => ({ id }));
}

export default async function BookDetailsPage({
  params,
}: PageProps<"/books/[id]">) {
  const { id } = await params;
  const book = previewBooks.find((item) => item.id === id);

  if (!book) {
    notFound();
  }

  return (
    <section className="booknook-book-detail-page">
      <nav className="booknook-book-breadcrumb" aria-label="Breadcrumb">
        <Link href="/books">
          <ArrowLeft size={15} aria-hidden="true" />
          All Books
        </Link>
        <ChevronRight size={15} aria-hidden="true" />
        <span aria-current="page">{book.title}</span>
      </nav>

      <div className="booknook-book-preview-note" role="note">
        <Sparkles size={16} aria-hidden="true" />
        Illustrative preview — this is sample content, not a catalog record.
      </div>

      <div className="booknook-book-detail-layout">
        <div className="booknook-book-cover-column">
          <div className="booknook-book-detail-cover">
            <PreviewBookCover
              book={book}
              preload
              sizes="(max-width: 45rem) 76vw, 22rem"
            />
          </div>
          <p className="booknook-book-cover-caption">
            <BookOpen size={15} aria-hidden="true" />
            Book cover
          </p>
        </div>

        <div className="booknook-book-detail-content">
          <p className="booknook-eyebrow">A story to settle into</p>
          <h1>{book.title}</h1>
          <p className="booknook-book-detail-byline">
            by <span>{book.author}</span>
          </p>

          <div className="booknook-book-detail-meta">
            <Badge className="booknook-home-book-category" variant="soft">
              {book.category}
            </Badge>
            <span className="booknook-book-detail-edition">
              {book.language} · {book.publishedYear}
            </span>
          </div>

          <div
            className="booknook-home-book-rating"
            aria-label={`Rated ${book.rating.toFixed(1)} out of 5`}
          >
            <Star size={15} fill="currentColor" aria-hidden="true" />
            <span>{book.rating.toFixed(1)}</span>
          </div>

          <Card className="booknook-book-description-card">
            <Card.Content>
              <Card.Title className="booknook-book-detail-subheading">
                About this book
              </Card.Title>
              <Card.Description className="booknook-book-detail-description">
                {book.description}
              </Card.Description>
            </Card.Content>
          </Card>

          <div className="booknook-book-detail-facts">
            <div>
              <span>Published</span>
              <strong>{book.publishedYear}</strong>
            </div>
            <div>
              <span>Language</span>
              <strong>{book.language}</strong>
            </div>
            <div>
              <span>ISBN</span>
              <strong>{book.isbn}</strong>
            </div>
            <div>
              <span>Availability</span>
              <strong
                className={
                  book.availableCopies > 0
                    ? "booknook-book-availability"
                    : "booknook-book-unavailable"
                }
              >
                {book.availableCopies > 0 ? (
                  <>
                    <Check size={16} aria-hidden="true" />
                    {book.availableCopies}{" "}
                    {book.availableCopies === 1 ? "copy" : "copies"} available
                  </>
                ) : (
                  "Currently unavailable"
                )}
              </strong>
            </div>
          </div>

          <div className="booknook-book-borrow-action">
            <BorrowConfirmationModalPreview book={book} />
            <p>Preview only — no borrow request will be submitted.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
