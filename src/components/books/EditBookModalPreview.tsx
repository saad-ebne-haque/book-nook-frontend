"use client";

import {
  Button,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  TextArea,
} from "@heroui/react";
import {
  ChevronDown,
  Image as ImageIcon,
  LockKeyhole,
  Pencil,
} from "lucide-react";
import {
  previewBookCategories,
  type PreviewBook,
} from "@/data/previewBooks";

type EditBookModalPreviewProps = {
  book: PreviewBook | null;
  onClose: () => void;
};

export default function EditBookModalPreview({
  book,
  onClose,
}: EditBookModalPreviewProps) {
  return (
    <Modal
      isOpen={book !== null}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose();
        }
      }}
    >
      {book && (
        <Modal.Backdrop
          className="booknook-edit-preview-backdrop"
          isDismissable
        >
          <Modal.Container className="booknook-edit-preview-container" size="lg">
            <Modal.Dialog className="booknook-edit-preview-dialog">
              <Modal.Header className="booknook-edit-preview-header">
                <span className="booknook-edit-preview-icon" aria-hidden="true">
                  <Pencil size={19} />
                </span>
                <div>
                  <Modal.Heading className="booknook-edit-preview-title">
                    Edit Book
                  </Modal.Heading>
                  <p>Update the details readers see on your book listing.</p>
                </div>
              </Modal.Header>

              <Modal.Body className="booknook-edit-preview-body">
                <div
                  className="booknook-edit-preview-notice"
                  role="note"
                  aria-label="Preview only"
                >
                  <LockKeyhole size={15} aria-hidden="true" />
                  <span>Static preview — changes are not saved.</span>
                </div>

                <div className="booknook-add-book-fields booknook-edit-preview-fields">
                  <div className="booknook-add-book-field">
                    <Label htmlFor="edit-preview-title">
                      Book title <span aria-hidden="true">*</span>
                    </Label>
                    <Input
                      className="booknook-add-book-input"
                      id="edit-preview-title"
                      value={book.title}
                      readOnly
                      aria-label="Book title"
                    />
                  </div>

                  <div className="booknook-add-book-field">
                    <Label htmlFor="edit-preview-author">
                      Author name <span aria-hidden="true">*</span>
                    </Label>
                    <Input
                      className="booknook-add-book-input"
                      id="edit-preview-author"
                      value={book.author}
                      readOnly
                      aria-label="Author name"
                    />
                  </div>

                  <div className="booknook-add-book-field">
                    <Label htmlFor="edit-preview-category">
                      Category <span aria-hidden="true">*</span>
                    </Label>
                    <Select
                      className="booknook-add-book-select"
                      id="edit-preview-category"
                      defaultSelectedKey={book.category}
                      isDisabled
                      aria-label="Category"
                    >
                      <Select.Trigger className="booknook-add-book-select-trigger">
                        <Select.Value>{book.category}</Select.Value>
                        <Select.Indicator>
                          <ChevronDown size={17} aria-hidden="true" />
                        </Select.Indicator>
                      </Select.Trigger>
                      <Select.Popover className="booknook-add-book-select-popover">
                        <ListBox>
                          {previewBookCategories.map((category) => (
                            <ListBox.Item
                              key={category}
                              id={category}
                              textValue={category}
                            >
                              {category}
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  <div className="booknook-add-book-field">
                    <Label htmlFor="edit-preview-image">Book image URL</Label>
                    <div className="booknook-add-book-input-wrap booknook-edit-preview-readonly">
                      <ImageIcon size={17} aria-hidden="true" />
                      <Input
                        className="booknook-add-book-input"
                        id="edit-preview-image"
                        value={book.cover}
                        readOnly
                        aria-label="Book image URL"
                      />
                    </div>
                  </div>

                  <div className="booknook-add-book-field booknook-add-book-description">
                    <Label htmlFor="edit-preview-description">
                      Description <span aria-hidden="true">*</span>
                    </Label>
                    <TextArea
                      className="booknook-add-book-textarea booknook-edit-preview-description"
                      id="edit-preview-description"
                      value={book.description}
                      rows={4}
                      readOnly
                      aria-label="Description"
                    />
                  </div>

                  <div className="booknook-add-book-field">
                    <Label htmlFor="edit-preview-language">Language</Label>
                    <Input
                      className="booknook-add-book-input"
                      id="edit-preview-language"
                      value={book.language}
                      readOnly
                      aria-label="Language"
                    />
                  </div>

                  <div className="booknook-add-book-field">
                    <Label htmlFor="edit-preview-year">Published year</Label>
                    <Input
                      className="booknook-add-book-input"
                      id="edit-preview-year"
                      value={String(book.publishedYear)}
                      readOnly
                      aria-label="Published year"
                    />
                  </div>

                  <div className="booknook-add-book-field">
                    <Label htmlFor="edit-preview-copies">Available copies</Label>
                    <Input
                      className="booknook-add-book-input"
                      id="edit-preview-copies"
                      value={String(book.availableCopies)}
                      readOnly
                      aria-label="Available copies"
                    />
                  </div>

                  <div className="booknook-add-book-field">
                    <Label htmlFor="edit-preview-rating">Rating</Label>
                    <Input
                      className="booknook-add-book-input"
                      id="edit-preview-rating"
                      value={book.rating.toFixed(1)}
                      readOnly
                      aria-label="Rating"
                    />
                  </div>
                </div>
              </Modal.Body>

              <Modal.Footer className="booknook-edit-preview-footer">
                <Button
                  className="booknook-edit-preview-cancel"
                  onPress={onClose}
                  type="button"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button
                  className="booknook-edit-preview-save"
                  type="button"
                  variant="primary"
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      )}
    </Modal>
  );
}
