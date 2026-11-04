import { BookOpenCheck, CalendarDays, LibraryBig } from "lucide-react";
import MyBorrowsPreviewTable from "@/components/books/MyBorrowsPreviewTable";
import { previewBooks } from "@/data/previewBooks";

const previewBorrowDates = [
  { borrowedOn: "2026-10-23", returnBy: "2026-11-06" },
  { borrowedOn: "2026-10-27", returnBy: "2026-11-10" },
  { borrowedOn: "2026-10-30", returnBy: "2026-11-13" },
];

export default function MyBorrowsPage() {
  const borrowPreviews = previewBooks.slice(0, 3).map((book, index) => ({
    ...book,
    ...previewBorrowDates[index],
  }));

  return (
    <section
      className="booknook-my-borrows"
      aria-labelledby="my-borrows-title"
    >
      <header className="booknook-my-borrows-heading">
        <p className="booknook-eyebrow">
          <BookOpenCheck size={16} aria-hidden="true" />
          Your reading, in good company
        </p>
        <h1 id="my-borrows-title">My Borrowed Books</h1>
        <p>
          Keep track of the stories you have with you and the dates they are
          due back.
        </p>
      </header>

      <div className="booknook-my-borrows-toolbar">
        <div className="booknook-my-borrows-list-heading">
          <div className="booknook-my-borrows-list-icon" aria-hidden="true">
            <LibraryBig size={18} />
          </div>
          <div>
            <h2>Borrowing history</h2>
            <p>{borrowPreviews.length} books in this preview</p>
          </div>
        </div>
        <p className="booknook-my-borrows-preview-note">
          Illustrative preview only — sample dates, not saved borrow records.
        </p>
      </div>

      <MyBorrowsPreviewTable books={borrowPreviews} />

      <div className="booknook-my-borrows-note" role="note">
        <CalendarDays size={17} aria-hidden="true" />
        <p>
          Borrow and return details shown here are for visual preview only.
        </p>
      </div>
    </section>
  );
}
