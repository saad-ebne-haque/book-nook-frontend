"use client";

import Image from "next/image";
import { BookOpen } from "lucide-react";
import { useState } from "react";
import type { PreviewBook } from "@/data/previewBooks";

type PreviewBookCoverProps = {
  book: PreviewBook;
  preload?: boolean;
  sizes?: string;
};

export default function PreviewBookCover({
  book,
  preload = false,
  sizes = "(max-width: 40rem) 45vw, (max-width: 56rem) 30vw, 22vw",
}: PreviewBookCoverProps) {
  const [showCoverImage, setShowCoverImage] = useState(true);

  return (
    <div className="booknook-home-book-cover">
      <div
        className="booknook-home-book-cover-fallback"
        role={showCoverImage ? undefined : "img"}
        aria-label={
          showCoverImage
            ? undefined
            : `Cover image unavailable for ${book.title} by ${book.author}`
        }
        aria-hidden={showCoverImage}
      >
        <BookOpen size={34} strokeWidth={1.4} />
        <span>{book.title}</span>
        <small>{book.author}</small>
      </div>
      {showCoverImage ? (
        <Image
          className="booknook-home-book-cover-image"
          src={book.cover}
          alt={`Book cover for ${book.title} by ${book.author}`}
          fill
          sizes={sizes}
          preload={preload}
          unoptimized
          onError={() => setShowCoverImage(false)}
          onLoad={(event) => {
            if (event.currentTarget.naturalWidth <= 1) {
              setShowCoverImage(false);
            }
          }}
        />
      ) : null}
    </div>
  );
}
