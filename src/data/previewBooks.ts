
export type PreviewBook = {
  _id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  cover: string;
  language: string;
  publishedYear: number;
  availableCopies: number;
  rating: number;
  addedBy: {
    name: string;
    email: string;
  };
};

export const previewBooks: PreviewBook[] = [
  {
    _id: "himu",
    title: "হিমু",
    author: "হুমায়ূন আহমেদ",
    description: "হিমু সিরিজের জনপ্রিয় একটি উপন্যাস।",
    category: "Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9789840000001-L.jpg",
    language: "Bangla",
    publishedYear: 1993,
    availableCopies: 25,
    rating: 4.8,
    addedBy: {
      name: "Hero",
      email: "hero@pro.soro",
    },
  },
  {
    _id: "devi",
    title: "দেবী",
    author: "হুমায়ূন আহমেদ",
    description: "রহস্য ও মনস্তাত্ত্বিক উপাদানে সমৃদ্ধ একটি উপন্যাস।",
    category: "Mystery",
    cover: "https://covers.openlibrary.org/b/isbn/9789840000002-L.jpg",
    language: "Bangla",
    publishedYear: 1985,
    availableCopies: 18,
    rating: 4.9,
    addedBy: {
      name: "Saad",
      email: "sebnehaque@gmail.com",
    },
  },
  {
    _id: "pather-panchali",
    title: "পথের পাঁচালী",
    author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
    description: "গ্রামীণ বাংলার জীবন ও মানুষের গল্প।",
    category: "Classic",
    cover: "https://covers.openlibrary.org/b/isbn/9789840000003-L.jpg",
    language: "Bangla",
    publishedYear: 1929,
    availableCopies: 12,
    rating: 4.7,
    addedBy: {
      name: "Hero",
      email: "hero@pro.soro",
    },
  },
  {
    _id: "shesher-kobita",
    title: "শেষের কবিতা",
    author: "রবীন্দ্রনাথ ঠাকুর",
    description: "প্রেম, সম্পর্ক ও জীবনের অনুভূতি নিয়ে লেখা উপন্যাস।",
    category: "Romance",
    cover: "https://covers.openlibrary.org/b/isbn/9789840000004-L.jpg",
    language: "Bangla",
    publishedYear: 1929,
    availableCopies: 20,
    rating: 4.8,
    addedBy: {
      name: "Saad",
      email: "sebnehaque@gmail.com",
    },
  },
  {
    _id: "the-alchemist",
    title: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "A story about dreams, destiny and following your personal legend.",
    category: "Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
    language: "English",
    publishedYear: 1988,
    availableCopies: 30,
    rating: 4.6,
    addedBy: {
      name: "Saad",
      email: "sebnehaque@gmail.com",
    },
  },
  {
    _id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    description:
      "A practical guide to building good habits and breaking bad ones.",
    category: "Self Help",
    cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
    language: "English",
    publishedYear: 2018,
    availableCopies: 15,
    rating: 4.9,
    addedBy: {
      name: "Hero",
      email: "hero@pro.soro",
    },
  },
  {
    _id: "rich-dad-poor-dad",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    description: "A book about financial education and money management.",
    category: "Finance",
    cover: "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg",
    language: "English",
    publishedYear: 1997,
    availableCopies: 22,
    rating: 4.5,
    addedBy: {
      name: "Saad",
      email: "sebnehaque@gmail.com",
    },
  },
  {
    _id: "the-psychology-of-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description: "Timeless lessons on wealth, greed and happiness.",
    category: "Finance",
    cover: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
    language: "English",
    publishedYear: 2020,
    availableCopies: 17,
    rating: 4.7,
    addedBy: {
      name: "Hero",
      email: "hero@pro.soro",
    },
  },
  {
    _id: "sapiens",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    description: "A brief history of humankind.",
    category: "History",
    cover: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
    language: "English",
    publishedYear: 2011,
    availableCopies: 10,
    rating: 4.8,
    addedBy: {
      name: "Saad",
      email: "sebnehaque@gmail.com",
    },
  },
  {
    _id: "think-and-grow-rich",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    description:
      "A classic book about mindset, success and achievement.",
    category: "Self Help",
    cover: "https://covers.openlibrary.org/b/isbn/9781585424337-L.jpg",
    language: "English",
    publishedYear: 1937,
    availableCopies: 14,
    rating: 4.4,
    addedBy: {
      name: "Hero",
      email: "hero@pro.soro",
    },
  },
];

export const previewBookCategories = [
  ...new Set(previewBooks.map(({ category }) => category)),
];
