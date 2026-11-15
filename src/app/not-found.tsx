import Link from "next/link";

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="flex min-h-[65vh] items-center justify-center px-4 py-16 sm:px-6"
    >
      <div className="w-full max-w-2xl rounded-[2rem] border border-[#e9e2d5] bg-[#fffdf9] px-6 py-12 text-center shadow-[0_16px_40px_rgba(54,48,37,0.07)] sm:px-12 sm:py-16">
        <div
          aria-hidden="true"
          className="mx-auto flex size-24 items-center justify-center rounded-full bg-[#f3f0e9] font-serif text-4xl font-semibold text-[#315c4d]"
        >
          404
        </div>
        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#a64f3c]">
          This page is off the shelf
        </p>
        <h1
          id="not-found-title"
          className="mt-3 font-serif text-3xl font-semibold text-[#292b25] sm:text-4xl"
        >
          We couldn&apos;t find that page
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#74756c] sm:text-base">
          The page may have moved, or the address might be incorrect. Let&apos;s
          get you back to a good story.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#315c4d] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#25483c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c4d] sm:w-auto"
          >
            Back to Home
          </Link>
          <Link
            href="/books"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#cbd9c9] px-7 text-sm font-semibold text-[#315c4d] transition-colors hover:bg-[#eaf0e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c4d] sm:w-auto"
          >
            Browse books
          </Link>
        </div>
      </div>
    </section>
  );
}
