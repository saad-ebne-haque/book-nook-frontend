import { Badge, Button } from "@heroui/react";
import { ArrowRight, LibraryBig, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import PreviewBookCard from "@/components/books/PreviewBookCard";
import { previewBooks } from "@/data/previewBooks";

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

      <div className="booknook-home-book-grid booknook-my-books-grid">
        {myBooksPreview.map((book) => (
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
              <div className="booknook-my-books-actions">
                <Button
                  aria-label={`Edit ${book.title}`}
                  className="booknook-my-books-edit"
                  size="sm"
                  type="button"
                  variant="outline"
                >
                  <Pencil size={15} aria-hidden="true" />
                  Edit
                </Button>
                <Button
                  aria-label={`Delete ${book.title}`}
                  className="booknook-my-books-delete"
                  size="sm"
                  type="button"
                  variant="danger-soft"
                >
                  <Trash2 size={15} aria-hidden="true" />
                  Delete
                </Button>
              </div>
            }
          />
        ))}
      </div>
    </section>
  );
}
