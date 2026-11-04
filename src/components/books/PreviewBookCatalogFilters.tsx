"use client";

import { useMemo, useState } from "react";
import { BookOpen, RotateCcw, Search } from "lucide-react";
import Link from "next/link";
import PreviewBookCard from "@/components/books/PreviewBookCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { previewBooks } from "@/data/previewBooks";

const categoryCounts = Array.from(
  previewBooks.reduce((counts, book) => {
    counts.set(book.category, (counts.get(book.category) ?? 0) + 1);
    return counts;
  }, new Map<string, number>()),
  ([category, count]) => ({ category, count }),
).sort((first, second) => first.category.localeCompare(second.category));

const languages = Array.from(
  new Set(previewBooks.map(({ language }) => language)),
).sort((first, second) => first.localeCompare(second));

const ratingThresholds = Array.from(
  new Set(previewBooks.map(({ rating }) => rating)),
).sort((first, second) => second - first);

type BookSortOrder = "default" | "rating" | "newest" | "title";

function isBookSortOrder(value: string): value is BookSortOrder {
  return ["default", "rating", "newest", "title"].includes(value);
}

export default function PreviewBookCatalogFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [language, setLanguage] = useState("all");
  const [minimumRating, setMinimumRating] = useState("all");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState<BookSortOrder>("default");

  const filteredBooks = useMemo(() => {
    const minimumRatingValue =
      minimumRating === "all" ? null : Number(minimumRating);
    const normalizedQuery = searchQuery.trim().toLocaleLowerCase();

    return previewBooks
      .filter(
        (book) =>
          (!normalizedQuery ||
            [book.title, book.author, book.isbn, book.category].some((value) =>
              value.toLocaleLowerCase().includes(normalizedQuery),
            )) &&
          (category === "all" || book.category === category) &&
          (language === "all" || book.language === language) &&
          (minimumRatingValue === null || book.rating >= minimumRatingValue) &&
          (!availableOnly || book.availableCopies > 0),
      )
      .sort((first, second) => {
        switch (sortOrder) {
          case "rating":
            return second.rating - first.rating;
          case "newest":
            return second.publishedYear - first.publishedYear;
          case "title":
            return first.title.localeCompare(second.title);
          default:
            return 0;
        }
      });
  }, [
    availableOnly,
    category,
    language,
    minimumRating,
    searchQuery,
    sortOrder,
  ]);

  function resetFilters() {
    setSearchQuery("");
    setCategory("all");
    setLanguage("all");
    setMinimumRating("all");
    setAvailableOnly(false);
    setSortOrder("default");
  }

  return (
    <>
      <div className="booknook-catalog-search-sort">
        <div className="booknook-catalog-search">
          <Search size={18} aria-hidden="true" />
          <Input
            aria-label="Search books"
            autoComplete="off"
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by title, author, ISBN, or category"
            type="search"
            value={searchQuery}
          />
        </div>
        <div className="booknook-catalog-filter-field booknook-catalog-sort">
          <Label htmlFor="catalog-sort">Sort by</Label>
          <Select
            value={sortOrder}
            onValueChange={(value) => {
              if (isBookSortOrder(value)) {
                setSortOrder(value);
              }
            }}
          >
            <SelectTrigger id="catalog-sort" className="booknook-catalog-select">
              <SelectValue placeholder="Default order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default order</SelectItem>
              <SelectItem value="rating">Highest rated</SelectItem>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="title">Title: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="booknook-catalog-filters" aria-label="Book filters">
        <div className="booknook-catalog-filter-field">
          <Label htmlFor="catalog-category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="catalog-category" className="booknook-catalog-select">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categoryCounts.map(({ category: categoryName, count }) => (
                <SelectItem key={categoryName} value={categoryName}>
                  <span className="booknook-catalog-category-option">
                    <span>{categoryName}</span>
                    <Badge variant="outline">{count}</Badge>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="booknook-catalog-filter-field">
          <Label htmlFor="catalog-language">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="catalog-language" className="booknook-catalog-select">
              <SelectValue placeholder="All languages" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All languages</SelectItem>
              {languages.map((languageOption) => (
                <SelectItem key={languageOption} value={languageOption}>
                  {languageOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="booknook-catalog-filter-field">
          <Label htmlFor="catalog-rating">Minimum rating</Label>
          <Select value={minimumRating} onValueChange={setMinimumRating}>
            <SelectTrigger id="catalog-rating" className="booknook-catalog-select">
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any rating</SelectItem>
              {ratingThresholds.map((rating) => (
                <SelectItem key={rating} value={String(rating)}>
                  {rating.toFixed(1)}+ stars
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <label className="booknook-catalog-availability">
          <input
            checked={availableOnly}
            onChange={(event) => setAvailableOnly(event.target.checked)}
            type="checkbox"
          />
          <span>Available books only</span>
        </label>

        <div className="booknook-catalog-filter-footer">
          <p>
            Price filtering and sorting are unavailable because this dataset
            has no price information.
          </p>
          <Button
            className="booknook-catalog-reset"
            onClick={resetFilters}
            size="sm"
            type="button"
            variant="outline"
          >
            <RotateCcw aria-hidden="true" />
            Reset filters
          </Button>
        </div>
      </div>

      <p className="booknook-catalog-result-count" aria-live="polite">
        Showing {filteredBooks.length} of {previewBooks.length} books
      </p>

      {filteredBooks.length > 0 ? (
        <div className="booknook-home-book-grid">
          {filteredBooks.map((book) => (
            <PreviewBookCard
              key={book.id}
              book={book}
              titleLevel="h2"
              action={
                <Link
                  className="booknook-home-details-button"
                  href={`/books/${book.id}`}
                >
                  View Details
                </Link>
              }
            />
          ))}
        </div>
      ) : (
        <div className="booknook-catalog-empty">
          <div className="booknook-catalog-empty-content">
            <span className="booknook-catalog-empty-icon" aria-hidden="true">
              <BookOpen size={24} />
            </span>
            <h2 className="booknook-catalog-empty-title">No books match these filters</h2>
            <p className="booknook-catalog-empty-description">
              Try changing a filter or reset them to browse the full collection.
            </p>
            <Button onClick={resetFilters} type="button" variant="outline">
              Reset filters
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
