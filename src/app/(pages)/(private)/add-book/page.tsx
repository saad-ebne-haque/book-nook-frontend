import { Button, Input, Label, ListBox, Select, TextArea } from "@heroui/react";
import {
  BookPlus,
  ChevronDown,
  Image as ImageIcon,
  LibraryBig,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { previewBookCategories } from "@/data/previewBooks";

export default function AddBookPage() {
  return (
    <section className="booknook-add-book-page" aria-labelledby="add-book-title">
      <header className="booknook-add-book-heading">
        <span className="booknook-add-book-heading-icon" aria-hidden="true">
          <LibraryBig size={22} />
        </span>
        <p className="booknook-eyebrow">Grow the reading room</p>
        <h1 id="add-book-title">Share a Book</h1>
        <p>
          Add a title to the shelves and help someone find their next favorite
          story.
        </p>
      </header>

      <div className="booknook-add-book-card">
        <div className="booknook-add-book-card-heading">
          <div>
            <h2>Book details</h2>
            <p>Tell readers a little about the book you are sharing.</p>
          </div>
          <span className="booknook-add-book-required-note">
            <span aria-hidden="true">*</span> Required fields
          </span>
        </div>

        <div className="booknook-add-book-fields">
          <div className="booknook-add-book-field">
            <Label htmlFor="book-title">Book title <span aria-hidden="true">*</span></Label>
            <Input
              className="booknook-add-book-input"
              id="book-title"
              placeholder="e.g. The Midnight Library"
              aria-label="Book title"
            />
          </div>

          <div className="booknook-add-book-field">
            <Label htmlFor="book-author">Author name <span aria-hidden="true">*</span></Label>
            <Input
              className="booknook-add-book-input"
              id="book-author"
              placeholder="e.g. Matt Haig"
              aria-label="Author name"
            />
          </div>

          <div className="booknook-add-book-field">
            <Label htmlFor="book-category">Category <span aria-hidden="true">*</span></Label>
            <Select
              className="booknook-add-book-select"
              id="book-category"
              placeholder="Choose a category"
              aria-label="Category"
            >
              <Select.Trigger className="booknook-add-book-select-trigger">
                <Select.Value />
                <Select.Indicator>
                  <ChevronDown size={17} aria-hidden="true" />
                </Select.Indicator>
              </Select.Trigger>
              <Select.Popover className="booknook-add-book-select-popover">
                <ListBox>
                  {previewBookCategories.map((category) => (
                    <ListBox.Item key={category} id={category} textValue={category}>
                      {category}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          <div className="booknook-add-book-field">
            <Label htmlFor="book-image-url">Book image URL</Label>
            <div className="booknook-add-book-input-wrap">
              <ImageIcon size={17} aria-hidden="true" />
              <Input
                className="booknook-add-book-input"
                id="book-image-url"
                type="url"
                placeholder="https://example.com/book-cover.jpg"
                aria-label="Book image URL"
              />
            </div>
            <p className="booknook-add-book-help">
              Paste a link to the book cover image.
            </p>
          </div>

          <div className="booknook-add-book-field booknook-add-book-description">
            <Label htmlFor="book-description">
              Short description <span aria-hidden="true">*</span>
            </Label>
            <TextArea
              className="booknook-add-book-textarea"
              id="book-description"
              placeholder="What makes this book worth discovering?"
              rows={4}
              aria-label="Short description"
            />
            <p className="booknook-add-book-help">
              A few sentences can help readers decide if it is for them.
            </p>
          </div>

          <div className="booknook-add-book-field">
            <Label htmlFor="book-copies">Total copies <span aria-hidden="true">*</span></Label>
            <Input
              className="booknook-add-book-input"
              id="book-copies"
              type="number"
              min={1}
              placeholder="1"
              aria-label="Total copies"
            />
          </div>
        </div>

        <div className="booknook-add-book-account">
          <div className="booknook-add-book-card-heading">
            <div>
              <h2>Your account</h2>
              <p>These details are read-only and come from your account.</p>
            </div>
            <LockKeyhole size={17} aria-hidden="true" />
          </div>
          <div className="booknook-add-book-fields">
            <div className="booknook-add-book-field">
              <Label htmlFor="book-owner-name">User name</Label>
              <div className="booknook-add-book-input-wrap booknook-add-book-readonly">
                <UserRound size={17} aria-hidden="true" />
                <Input
                  className="booknook-add-book-input"
                  id="book-owner-name"
                  placeholder="Your account name"
                  aria-label="User name"
                  readOnly
                />
              </div>
            </div>
            <div className="booknook-add-book-field">
              <Label htmlFor="book-owner-email">User email</Label>
              <div className="booknook-add-book-input-wrap booknook-add-book-readonly">
                <Mail size={17} aria-hidden="true" />
                <Input
                  className="booknook-add-book-input"
                  id="book-owner-email"
                  type="email"
                  placeholder="Your account email"
                  aria-label="User email"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        <div className="booknook-add-book-actions">
          <p>Fields marked <span aria-hidden="true">*</span> are required.</p>
          <Button
            className="booknook-add-book-submit"
            type="button"
            variant="primary"
            size="lg"
          >
            <BookPlus size={18} aria-hidden="true" />
            Add Book
          </Button>
        </div>
      </div>
    </section>
  );
}
