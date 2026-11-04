"use client";

import { Button } from "@heroui/react";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import EditBookModalPreview from "@/components/books/EditBookModalPreview";
import PreviewBookCard from "@/components/books/PreviewBookCard";
import type { PreviewBook } from "@/data/previewBooks";

type MyBooksPreviewGridProps = {
  books: PreviewBook[];
};

export default function MyBooksPreviewGrid({
  books,
}: MyBooksPreviewGridProps) {
  const [editingBook, setEditingBook] = useState<PreviewBook | null>(null);

  return (
    <>
      <div className="booknook-home-book-grid booknook-my-books-grid">
        {books.map((book) => (
          <PreviewBookCard
            key={book.id}
            book={book}
            titleLevel="h2"
            action={
              <div className="booknook-my-books-actions">
                <Button
                  aria-label={`Edit ${book.title}`}
                  className="booknook-my-books-edit"
                  onPress={() => setEditingBook(book)}
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
      <EditBookModalPreview
        book={editingBook}
        onClose={() => setEditingBook(null)}
      />
    </>
  );
}
