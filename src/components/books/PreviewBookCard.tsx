import type { ReactNode } from "react";
import type { PreviewBook } from "@/data/previewBooks";
import PreviewBookCover from "@/components/books/PreviewBookCover";

type PreviewBookCardProps = {
  book: PreviewBook;
  titleLevel: "h2" | "h3";
  categoryBadge: ReactNode;
  action: ReactNode;
};

export default function PreviewBookCard({
  book,
  titleLevel,
  categoryBadge,
  action,
}: PreviewBookCardProps) {
  const Heading = titleLevel;

  return (
    <article className="booknook-home-book-card">
      <PreviewBookCover book={book} />
      <div className="booknook-home-book-details">
        {categoryBadge}
        <Heading>{book.title}</Heading>
        <p>by {book.author}</p>
        {action}
      </div>
    </article>
  );
}
