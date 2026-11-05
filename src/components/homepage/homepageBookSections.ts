import { previewBooks } from "@/data/previewBooks";

const featuredBooks = previewBooks.slice(0, 3);
const featuredBookIds = new Set(featuredBooks.map(({ _id }) => _id));
const popularCandidates = previewBooks
  .filter(({ _id }) => !featuredBookIds.has(_id))
  .sort((first, second) => second.rating - first.rating);

export const homepageFeaturedBooks = featuredBooks;
export const homepagePopularBooks = popularCandidates.slice(0, 3);

const displayedBookIds = new Set([
  ...homepageFeaturedBooks.map(({ _id }) => _id),
  ...homepagePopularBooks.map(({ _id }) => _id),
]);

export const homepageNewArrivals = previewBooks
  .filter(({ _id }) => !displayedBookIds.has(_id))
  .sort((first, second) => second.publishedYear - first.publishedYear);
