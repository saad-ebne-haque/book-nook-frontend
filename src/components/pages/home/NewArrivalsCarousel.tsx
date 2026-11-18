"use client";

import { ArrowLeft, ArrowRight, BookOpen } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { A11y } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Book } from "@/types/bookType";

interface NewArrivalsCarouselProps {
    books: Book[];
}

export default function NewArrivalsCarousel({ books }: NewArrivalsCarouselProps) {
    const swiperRef = useRef<SwiperInstance | null>(null);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(books.length <= 1);
    const shouldLoop = books.length > 3;

    const updateSlideState = (swiper: SwiperInstance) => {
        setCurrentSlide(swiper.realIndex + 1);
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    return (
        <div>
            {books.length === 0 ? (
                <div className="rounded-[1.75rem] border border-dashed border-[#d9dfd4] bg-[#fffdf9] px-6 py-12 text-center">
                    <h3 className="font-serif text-xl font-semibold text-[#292b25]">
                        The shelf is waiting for its first story
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#74756c]">
                        Check back soon to discover newly added books.
                    </p>
                </div>
            ) : (
                <>
                    <Swiper
                        aria-label="New arrivals carousel"
                        modules={[A11y]}
                        slidesPerView={1.08}
                        spaceBetween={16}
                        loop={shouldLoop}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            updateSlideState(swiper);
                        }}
                        onSlideChange={updateSlideState}
                        breakpoints={{
                            640: { slidesPerView: 1.55, spaceBetween: 20 },
                            768: { slidesPerView: 2.1, spaceBetween: 24 },
                            1024: { slidesPerView: 2.2, spaceBetween: 28 },
                        }}
                        a11y={{
                            containerMessage: "Latest books added to BookNook",
                            itemRoleDescriptionMessage: "slide",
                            slideLabelMessage: "{{index}} of {{slidesLength}}",
                        }}
                    >
                        {books.map((book) => {
                            const isAvailable = book.availableCopies > 0;

                            return (
                                <SwiperSlide key={book._id} className="h-auto">
                                    <Link
                                        href={`/books/${book._id}`}
                                        className="group block h-full overflow-hidden rounded-[1.5rem] border border-[#e9e2d5] bg-[#fffdf9] text-inherit no-underline shadow-[0_12px_30px_rgba(54,48,37,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(49,92,77,0.14)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315c4d]"
                                    >
                                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#eee8dc]">
                                            <Image
                                                src={book.image}
                                                alt={book.title}
                                                fill
                                                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 48vw, 42vw"
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div
                                                aria-hidden="true"
                                                className="absolute inset-0 bg-gradient-to-t from-[#292b25]/35 via-transparent to-transparent"
                                            />
                                            <span className="absolute left-4 top-4 max-w-[65%] truncate rounded-full border border-white/60 bg-[#fffdf9]/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#315c4d] shadow-sm backdrop-blur">
                                                {book.category}
                                            </span>
                                            <span className="absolute right-4 top-4 rounded-full bg-[#292b25]/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                                                {book.publishedYear}
                                            </span>
                                        </div>

                                        <div className="flex min-h-[205px] flex-col p-5 sm:p-6">
                                            <div className="flex items-center justify-between gap-3 text-xs text-[#74756c]">
                                                <span className="truncate">
                                                    By <span className="font-medium text-[#464940]">{book.author}</span>
                                                </span>
                                                <span className={`shrink-0 font-semibold ${isAvailable ? "text-[#315c4d]" : "text-[#9b4938]"}`}>
                                                    {isAvailable
                                                        ? `${book.availableCopies} available`
                                                        : "Unavailable"}
                                                </span>
                                            </div>

                                            <h3 className="mt-3 line-clamp-2 min-h-[3.5rem] font-serif text-xl font-semibold leading-7 text-[#292b25] transition-colors group-hover:text-[#315c4d] sm:text-2xl">
                                                {book.title}
                                            </h3>
                                            <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#74756c]">
                                                {book.description}
                                            </p>

                                            <span className="mt-auto inline-flex items-center gap-2 pt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#315c4d]">
                                                <BookOpen aria-hidden="true" className="size-4" />
                                                View book details
                                                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>

                    <div className="mt-6 flex items-center justify-between border-t border-[#e9e2d5] pt-4">
                        <p
                            aria-live="polite"
                            aria-atomic="true"
                            className="text-sm font-medium tabular-nums text-[#74756c]"
                        >
                            {currentSlide} / {books.length}
                        </p>

                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                aria-label="Previous books"
                                disabled={!shouldLoop && isBeginning}
                                onClick={() => swiperRef.current?.slidePrev()}
                                className="inline-flex size-10 items-center justify-center rounded-full border border-[#dce4da] text-[#315c4d] transition-colors hover:bg-[#eaf0e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c4d] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ArrowLeft aria-hidden="true" className="size-4" />
                            </button>
                            <button
                                type="button"
                                aria-label="Next books"
                                disabled={!shouldLoop && isEnd}
                                onClick={() => swiperRef.current?.slideNext()}
                                className="inline-flex size-10 items-center justify-center rounded-full border border-[#dce4da] text-[#315c4d] transition-colors hover:bg-[#eaf0e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c4d] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <ArrowRight aria-hidden="true" className="size-4" />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
