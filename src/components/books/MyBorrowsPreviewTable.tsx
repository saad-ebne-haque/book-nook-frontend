import { Button, Table } from "@heroui/react";
import { CalendarDays, RotateCcw } from "lucide-react";
import PreviewBookCover from "@/components/books/PreviewBookCover";
import type { PreviewBook } from "@/data/previewBooks";

type BorrowPreview = PreviewBook & {
  borrowedOn: string;
  returnBy: string;
};

type MyBorrowsPreviewTableProps = {
  books: BorrowPreview[];
};

function formatPreviewDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function PreviewBorrowDate({
  date,
  label,
}: {
  date: string;
  label: string;
}) {
  return (
    <span className="booknook-borrows-date">
      <span className="booknook-borrows-date-icon" aria-hidden="true">
        <CalendarDays size={15} />
      </span>
      <span>
        <span className="booknook-borrows-date-label">{label}</span>
        <time dateTime={date}>{formatPreviewDate(date)}</time>
      </span>
    </span>
  );
}

export default function MyBorrowsPreviewTable({
  books,
}: MyBorrowsPreviewTableProps) {
  return (
    <>
      <div className="booknook-my-borrows-table-wrap">
        <Table
          aria-label="Illustrative borrowed books"
          className="booknook-my-borrows-table"
          variant="primary"
        >
          <Table.ScrollContainer className="booknook-my-borrows-scroll">
            <Table.Content>
              <Table.Header>
                <Table.Column isRowHeader>Book cover</Table.Column>
                <Table.Column>Book title</Table.Column>
                <Table.Column>Borrow date</Table.Column>
                <Table.Column>Return date</Table.Column>
                <Table.Column>Action</Table.Column>
              </Table.Header>
              <Table.Body>
                {books.map((book) => (
                  <Table.Row key={book._id} id={book._id}>
                    <Table.Cell>
                      <div className="booknook-borrows-cover">
                        <PreviewBookCover book={book} />
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="booknook-borrows-book-title">
                        <strong>{book.title}</strong>
                        <span>by {book.author}</span>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      <PreviewBorrowDate
                        date={book.borrowedOn}
                        label="Borrowed"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <PreviewBorrowDate date={book.returnBy} label="Due back" />
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        aria-label={`Return ${book.title}`}
                        className="booknook-borrows-return"
                        type="button"
                        variant="outline"
                      >
                        <RotateCcw size={15} aria-hidden="true" />
                        Return Book
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      <div className="booknook-my-borrows-mobile-list">
        {books.map((book) => (
          <article className="booknook-my-borrows-mobile-card" key={book._id}>
            <div className="booknook-my-borrows-mobile-book">
              <div className="booknook-borrows-cover">
                <PreviewBookCover book={book} />
              </div>
              <div className="booknook-borrows-book-title">
                <strong>{book.title}</strong>
                <span>by {book.author}</span>
              </div>
            </div>
            <div className="booknook-my-borrows-mobile-dates">
              <PreviewBorrowDate date={book.borrowedOn} label="Borrowed" />
              <PreviewBorrowDate date={book.returnBy} label="Due back" />
            </div>
            <Button
              aria-label={`Return ${book.title}`}
              className="booknook-borrows-return"
              type="button"
              variant="outline"
            >
              <RotateCcw size={15} aria-hidden="true" />
              Return Book
            </Button>
          </article>
        ))}
      </div>
    </>
  );
}
