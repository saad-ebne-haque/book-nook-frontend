import type { Metadata } from "next";
import { ArrowRight, LibraryBig, Plus } from "lucide-react";
import Link from "next/link";
import MyBooksPreviewGrid from "@/components/books/MyBooksPreviewGrid";
import { previewBooks } from "@/data/previewBooks";

export const metadata: Metadata = {
  title: "My Library",
  description: "Explore your BookNook library.",
};

export default function MyBooksPage() {
  const myBooksPreview = previewBooks.slice(0, 3);

  return (
    <section className="booknook-my-books" aria-labelledby="my-books-title">
      <header className="booknook-my-books-heading">
        <p className="booknook-eyebrow">
          <LibraryBig size={16} aria-hidden="true" />
          Your personal collection
        </p>
        <h1 id="my-books-title">My Library</h1>
        <p>
          Keep the books you share with BookNook together in one thoughtful
          little corner.
        </p>
      </header>

      <div className="booknook-my-books-toolbar">
        <p className="booknook-my-books-preview-note">
          Illustrative preview books — these are not saved to your account.
        </p>
        <Link className="booknook-my-books-add-link" href="/add-book">
          <Plus size={17} aria-hidden="true" />
          Add a book
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <MyBooksPreviewGrid books={myBooksPreview} />
    </section>
  );
}
