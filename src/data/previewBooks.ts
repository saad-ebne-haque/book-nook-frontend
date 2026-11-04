export type PreviewBook = {
  id: string;
  title: string;
  author: string;
  category: string;
  cover: string;
  description: string;
  availableCopies: number;
};

export const previewBooks: PreviewBook[] = [
  {
    id: "quiet-between-pages",
    title: "The Quiet Between Pages",
    author: "Mara Ellison",
    category: "Literary Fiction",
    cover: "garden",
    description:
      "In a little bookshop tucked between a bakery and a quiet courtyard, an unexpected collection of handwritten notes brings neighbors together—and helps one reader find the courage to begin again.",
    availableCopies: 3,
  },
  {
    id: "map-of-small-wonders",
    title: "A Map of Small Wonders",
    author: "Jonah Reed",
    category: "Adventure",
    cover: "atlas",
    description:
      "A hand-drawn map leads two old friends beyond familiar streets and into a journey filled with unexpected discoveries.",
    availableCopies: 2,
  },
  {
    id: "light-we-keep",
    title: "The Light We Keep",
    author: "Nora Vale",
    category: "Contemporary",
    cover: "light",
    description:
      "Across one changing season, a family finds new ways to hold onto the moments and memories that matter most.",
    availableCopies: 4,
  },
  {
    id: "wildflower-season",
    title: "Wildflower Season",
    author: "Elliot James",
    category: "Nature",
    cover: "wildflower",
    description:
      "A quiet celebration of the wild places, small beginnings, and resilient blooms that make a landscape feel like home.",
    availableCopies: 1,
  },
  {
    id: "atlas-of-ordinary-days",
    title: "An Atlas of Ordinary Days",
    author: "Sofia Bennett",
    category: "Essays",
    cover: "ordinary",
    description:
      "Thoughtful essays uncover the wonder tucked into daily rituals, familiar faces, and the places we pass every day.",
    availableCopies: 2,
  },
  {
    id: "last-bookshop-lane",
    title: "The Last Bookshop Lane",
    author: "Aria North",
    category: "Mystery",
    cover: "bookshop",
    description:
      "When a note slips from the pages of a secondhand novel, a bookseller follows a trail of clues through an old neighborhood.",
    availableCopies: 3,
  },
];
