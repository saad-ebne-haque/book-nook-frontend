import { BookOpen } from "lucide-react";
import type { PreviewBook } from "@/data/previewBooks";

type PreviewBookCoverProps = {
  book: PreviewBook;
};

export default function PreviewBookCover({ book }: PreviewBookCoverProps) {
  return (
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
  );
}
