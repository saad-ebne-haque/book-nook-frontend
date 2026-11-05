"use client";

import { useState } from "react";
import { Button, Input, Label, Modal } from "@heroui/react";
import { BookCheck, Eye, Mail, UserRound } from "lucide-react";
import PreviewBookCover from "@/components/books/PreviewBookCover";
import type { PreviewBook } from "@/data/previewBooks";
import { authClient } from "@/lib/auth-client";

type BorrowConfirmationModalPreviewProps = {
  book: PreviewBook;
};

export default function BorrowConfirmationModalPreview({
  book,
}: BorrowConfirmationModalPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
const userSession = authClient.useSession();
  const user = userSession.data?.user || null;


  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <Button
        className="booknook-book-borrow-button"
        onPress={() => setIsOpen(true)}
        type="button"
        variant="primary"
        size="lg"
      >
        Borrow This Book
      </Button>

      <Modal.Backdrop
        className="booknook-borrow-confirm-backdrop"
        isDismissable
      >
        <Modal.Container
          className="booknook-borrow-confirm-container"
          size="md"
        >
          <Modal.Dialog className="booknook-borrow-confirm-dialog">
            <Modal.Header className="booknook-borrow-confirm-header">
              <span className="booknook-borrow-confirm-icon" aria-hidden="true">
                <BookCheck size={20} />
              </span>
              <div>
                <Modal.Heading className="booknook-borrow-confirm-title">
                  Confirm Your Borrow Request
                </Modal.Heading>
                <p>Review the book and reader details before confirming.</p>
              </div>
            </Modal.Header>

            <Modal.Body className="booknook-borrow-confirm-body">
              <div className="booknook-borrow-confirm-notice" role="note">
                <Eye size={15} aria-hidden="true" />
                <span>Static preview only — no borrow request will be sent.</span>
              </div>

              <section
                className="booknook-borrow-confirm-book"
                aria-label="Selected book"
              >
                <div className="booknook-borrow-confirm-cover">
                  <PreviewBookCover book={book} />
                </div>
                <div>
                  <span className="booknook-borrow-confirm-book-label">
                    Selected book
                  </span>
                  <h2>{book.title}</h2>
                  <p>by {book.author}</p>
                </div>
              </section>

              <div className="booknook-borrow-confirm-fields">
                <div className="booknook-borrow-confirm-field">
                  <Label htmlFor="borrow-preview-name">
                    <UserRound size={14} aria-hidden="true" />
                    User name
                  </Label>
                  <Input
                    className="booknook-borrow-confirm-input"
                    id="borrow-preview-name"
                    value={user?.name || "Sample Reader"}
                    readOnly
                    aria-label="Sample user name"
                  />
                </div>
                <div className="booknook-borrow-confirm-field">
                  <Label htmlFor="borrow-preview-email">
                    <Mail size={14} aria-hidden="true" />
                    User email
                  </Label>
                  <Input
                    className="booknook-borrow-confirm-input"
                    id="borrow-preview-email"
                    value={user?.email || "reader@booknook.example"}
                    readOnly
                    aria-label="Sample user email"
                  />
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer className="booknook-borrow-confirm-footer">
              <Button
                className="booknook-borrow-confirm-cancel"
                onPress={() => setIsOpen(false)}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                className="booknook-borrow-confirm-submit"
                isDisabled
                type="button"
                variant="primary"
              >
                Confirm Borrow
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
