

import { Suspense } from "react";
import type { Metadata } from "next";
import Banner from "@/components/pages/home/Banner";
import NewArrivals, { NewArrivalsSkeleton } from "@/components/pages/home/NewArrivals";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

const borrowingSteps = [
  {
    number: "01",
    title: "Find a story",
    description: "Browse the library and open a book that catches your eye.",
  },
  {
    number: "02",
    title: "Borrow a copy",
    description: "Choose your return date and keep track of the book on your shelf.",
  },
  {
    number: "03",
    title: "Pass it along",
    description: "Return your book when you are done so another reader can enjoy it.",
  },
];

const readingCategories = [
  { title: "Fiction", description: "Step into another world." },
  { title: "Science", description: "Follow your curiosity." },
  { title: "History", description: "Discover stories from the past." },
  { title: "Kids", description: "Find a little wonder for young readers." },
  { title: "Others", description: "There is always something unexpected." },
];

export default function Home() {
  return (
    <>
      <Suspense
        fallback={
          <section
            aria-label="Loading featured BookNook stories"
            className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10"
          >
            <div className="min-h-[470px] animate-pulse rounded-[2rem] bg-[#f3e8d8] md:min-h-[480px]" />
          </section>
        }
      >
        <Banner />
      </Suspense>

      <Suspense fallback={<NewArrivalsSkeleton />}>
        <NewArrivals />
      </Suspense>

      <section
        aria-labelledby="borrowing-steps-heading"
        className="bg-[#f3f0e9]"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto mb-9 max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6d806f]">
              A good read, made easy
            </p>
            <h2
              id="borrowing-steps-heading"
              className="mt-2 font-serif text-3xl font-semibold text-[#292b25] sm:text-4xl"
            >
              How borrowing works
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#74756c] sm:text-base">
              Your next favorite book is only a few simple steps away.
            </p>
          </div>

          <ol className="grid gap-4 md:grid-cols-3">
            {borrowingSteps.map((step) => (
              <li
                key={step.number}
                className="rounded-[1.5rem] border border-[#e9e2d5] bg-[#fffdf9] p-6 shadow-[0_10px_28px_rgba(54,48,37,0.04)] sm:p-7"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-full bg-[#eaf0e9] font-semibold text-[#315c4d]">
                  {step.number}
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-[#292b25]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#74756c]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="reading-categories-heading"
        className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6d806f]">
              Something for every reader
            </p>
            <h2
              id="reading-categories-heading"
              className="mt-2 font-serif text-3xl font-semibold text-[#292b25] sm:text-4xl"
            >
              Find your kind of story
            </h2>
          </div>
          <Link
            href="/books"
            className="inline-flex min-h-11 w-fit items-center justify-center rounded-full px-5 text-sm font-semibold text-[#315c4d] transition-colors hover:bg-[#eaf0e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c4d]"
          >
            Explore the library
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {readingCategories.map((category, index) => (
            <Link
              key={category.title}
              href="/books"
              className="group rounded-[1.5rem] border border-[#e9e2d5] bg-[#fffdf9] p-5 transition-all hover:-translate-y-1 hover:border-[#cbd9c9] hover:shadow-[0_16px_36px_rgba(49,92,77,0.09)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c4d]"
            >
              <span className="text-xs font-bold tracking-[0.16em] text-[#a64f3c]">
                0{index + 1}
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold text-[#292b25] transition-colors group-hover:text-[#315c4d]">
                {category.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#74756c]">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
