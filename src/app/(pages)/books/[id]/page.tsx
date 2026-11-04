import { Badge, Card } from "@heroui/react";
import { ArrowLeft, BookOpen, Check, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import BorrowConfirmationModalPreview from "@/components/books/BorrowConfirmationModalPreview";
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
          <div
            className={`booknook-book-detail-cover booknook-home-cover-${book.cover}`}
            role="img"
            aria-label={`Illustrative cover artwork for ${book.title} by ${book.author}`}
          >
            <div className="booknook-book-detail-cover-window" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <span className="booknook-book-detail-cover-orbit" aria-hidden="true" />
            <span className="booknook-book-detail-cover-border" aria-hidden="true" />
            <BookOpen
              className="booknook-book-detail-cover-mark"
              size={42}
              strokeWidth={1.35}
              aria-hidden="true"
            />
            <span className="booknook-book-detail-cover-title">
              {book.title}
            </span>
            <span className="booknook-book-detail-cover-author">{book.author}</span>
          </div>
          <p className="booknook-book-cover-caption">
            <BookOpen size={15} aria-hidden="true" />
            Cover artwork shown for preview
          </p>
        </div>

        <div className="booknook-book-detail-content">
          <Badge className="booknook-book-preview-badge" variant="soft">
            Illustrative book preview
          </Badge>
          <p className="booknook-eyebrow">A story to settle into</p>
          <h1>{book.title}</h1>
          <p className="booknook-book-detail-byline">
            by <span>{book.author}</span>
          </p>

          <div className="booknook-book-detail-meta">
            <Badge className="booknook-home-book-category" variant="soft">
              {book.category}
            </Badge>
            <span className="booknook-book-detail-edition">Sample listing</span>
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
              <span>Added by</span>
              <strong>BookNook preview member</strong>
            </div>
            <div>
              <span>Availability</span>
              <strong className="booknook-book-availability">
                <Check size={16} aria-hidden="true" />
                {book.availableCopies} sample{" "}
                {book.availableCopies === 1 ? "copy" : "copies"} available
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
