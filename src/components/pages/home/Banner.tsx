"use client";

import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";
import Image from "next/image";
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
        image: "/images/booknook-banner.jpg",
        imageAlt: "Shelves filled with books in a warm, old library",
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
        image: "/images/booknook-login.jpg",
        imageAlt: "A stack of books ready to be read",
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
        image: "/images/booknook-register.jpg",
        imageAlt: "A thoughtfully stacked collection of books",
    },
];

function FeaturedPhoto({ image, imageAlt }: (typeof slides)[number]) {
    return (
        <div className="relative mx-auto h-56 w-full max-w-md overflow-hidden rounded-[1.5rem] border-4 border-white/70 shadow-xl sm:h-64 md:h-[340px]">
            <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
                loading={image === "/images/booknook-banner.jpg" ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292b25]/45 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-[#fffdf9]/90 px-4 py-2 text-xs font-semibold text-[#315c4d] shadow-sm backdrop-blur">
                A good book is waiting
            </span>
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

                                <FeaturedPhoto {...slide} />
                            </div>
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
