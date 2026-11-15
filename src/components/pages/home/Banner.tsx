"use client";

import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";
import { A11y, Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
    {
        eyebrow: "A WORLD BETWEEN THE COVERS",
        title: "Find your next favorite story.",
        description:
            "Wander into new worlds, meet unforgettable characters, and find a book that feels like it was written just for you.",
        bookTitle: "The Quiet\nWild",
        bookAuthor: "A story to get lost in",
        background: "bg-[#f3e8d8]",
        bookColor: "bg-[#a64f3c]",
        accent: "text-[#a64f3c]",
        decoration: "bg-[#d9a875]",
    },
    {
        eyebrow: "GOOD STORIES, SHARED",
        title: "A little escape is closer than you think.",
        description:
            "Discover a thoughtful collection of books and borrow your next great read from the BookNook community.",
        bookTitle: "Somewhere\nBetween",
        bookAuthor: "A journey worth taking",
        background: "bg-[#e6eee6]",
        bookColor: "bg-[#315c4d]",
        accent: "text-[#315c4d]",
        decoration: "bg-[#a9c5a9]",
    },
    {
        eyebrow: "YOUR NEXT CHAPTER STARTS HERE",
        title: "Read a little. Dream a lot.",
        description:
            "From quiet evenings to curious afternoons, there is always room for one more good book in your day.",
        bookTitle: "A Place\nTo Begin",
        bookAuthor: "Your next favorite awaits",
        background: "bg-[#eee8f2]",
        bookColor: "bg-[#68507f]",
        accent: "text-[#68507f]",
        decoration: "bg-[#c6b3d5]",
    },
];

function BookArtwork({
    bookTitle,
    bookAuthor,
    bookColor,
    decoration,
}: (typeof slides)[number]) {
    return (
        <div className="relative mx-auto flex h-56 w-full max-w-md items-center justify-center sm:h-64 md:h-80">
            <div className={`absolute h-48 w-48 rounded-full ${decoration} opacity-60 blur-2xl sm:h-60 sm:w-60`} />
            <div className="absolute left-[13%] top-[20%] h-40 w-28 rotate-[-16deg] rounded-lg border-l-[10px] border-[#d7c6a9] bg-[#f7f1e7] shadow-xl sm:h-48 sm:w-32" />
            <div className={`absolute right-[17%] top-[14%] flex h-48 w-36 rotate-[10deg] flex-col justify-between rounded-lg border-l-[10px] border-black/15 p-4 text-white shadow-2xl sm:h-56 sm:w-40 sm:p-5 ${bookColor}`}>
                <span className="text-[9px] font-semibold tracking-[0.24em] opacity-80">BOOK NOOK EDITION</span>
                <span className="whitespace-pre-line font-serif text-2xl font-semibold leading-tight sm:text-3xl">
                    {bookTitle}
                </span>
                <span className="text-[10px] tracking-wide opacity-80">{bookAuthor}</span>
            </div>
            <div className="absolute bottom-[13%] left-[18%] h-3 w-56 rotate-[-4deg] rounded-full bg-[#29261f]/15 blur-md sm:w-72" />
            <div className="absolute left-[5%] top-[2%] rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-medium text-[#29261f] shadow-sm backdrop-blur">
                A good book is waiting
            </div>
        </div>
    );
}

export default function Banner() {
    return (
        <section aria-label="Featured BookNook stories" className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
            <h1 className="sr-only">Welcome to BookNook</h1>
            <Swiper
                aria-label="Featured stories"
                className="book-nook-banner overflow-hidden rounded-[2rem]"
                modules={[A11y, Autoplay, Pagination]}
                autoplay={{ delay: 5500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                a11y={{
                    containerMessage: "Featured BookNook stories",
                    paginationBulletMessage: "Go to slide {{index}}",
                }}
                loop
                speed={650}
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.title}>
                        <article className={`relative isolate overflow-hidden rounded-[2rem] ${slide.background}`}>
                            <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-black/5 sm:h-96 sm:w-96" />
                            <div className="pointer-events-none absolute -right-10 -top-14 h-56 w-56 rounded-full border border-black/5 sm:h-72 sm:w-72" />

                            <div className="grid min-h-[470px] grid-cols-1 items-center gap-1 px-6 pb-16 pt-8 sm:px-10 md:min-h-[480px] md:grid-cols-2 md:gap-4 md:px-14 md:pb-20 lg:px-20">
                                <div className="relative z-10 max-w-xl">
                                    <p className={`mb-4 text-xs font-bold tracking-[0.2em] ${slide.accent}`}>
                                        {slide.eyebrow}
                                    </p>
                                    <h2 className="max-w-lg font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-[#25251f] sm:text-5xl lg:text-6xl">
                                        {slide.title}
                                    </h2>
                                    <p className="mt-5 max-w-lg text-sm leading-7 text-[#58564f] sm:text-base">
                                        {slide.description}
                                    </p>
                                    <Link
                                        href="/books"
                                        className={`mt-7 inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 ${slide.bookColor}`}
                                    >
                                        Browse Books
                                        <ArrowRight aria-hidden="true" className="size-4" />
                                    </Link>
                                </div>

                                <BookArtwork {...slide} />
                            </div>
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
