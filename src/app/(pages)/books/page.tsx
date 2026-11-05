import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import PreviewBookCatalogFilters from "@/components/books/PreviewBookCatalogFilters";

export const metadata: Metadata = {
  title: "Explore Books",
  description: "Browse the BookNook collection and find your next favorite book.",
};

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
        <p className="booknook-catalog-preview-note">
          These book listings are illustrative previews.
        </p>
      </header>

      <PreviewBookCatalogFilters />
    </section>
  );
}
