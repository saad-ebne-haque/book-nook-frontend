import { Card } from "@heroui/react";
import { BookOpen, LibraryBig, Sparkles } from "lucide-react";

export default function AllBooksPage() {
  return (
    <section className="booknook-catalog" aria-labelledby="catalog-title">
      <header className="booknook-catalog-heading">
        <p className="booknook-eyebrow">
          <Sparkles size={16} aria-hidden="true" />
          Find your next favorite
        </p>
        <h1 id="catalog-title">Explore Our Books</h1>
        <p>
          Wander through stories, ideas, and new perspectives waiting to be
          discovered.
        </p>
      </header>

      <Card className="booknook-catalog-empty">
        <Card.Content className="booknook-catalog-empty-content">
          <span className="booknook-catalog-empty-icon" aria-hidden="true">
            <LibraryBig size={28} strokeWidth={1.6} />
            <BookOpen className="booknook-catalog-empty-book" size={17} />
          </span>
          <Card.Title className="booknook-catalog-empty-title">
            Our shelves are being arranged
          </Card.Title>
          <Card.Description className="booknook-catalog-empty-description">
            Book listings will appear here when catalog records are available.
          </Card.Description>
        </Card.Content>
      </Card>
    </section>
  );
}
