import { BookOpen } from "@gravity-ui/icons";
import { Label, ListBox, Select } from "@heroui/react";
import Link from "next/link";
import BookCard from "@/components/shared/Books/bookCard";
import { Book } from "@/types/bookType";

const booksPerPage = 9;

interface SearchParams {
    search?: string | string[];
    sort?: string | string[];
    page?: string | string[];
}

interface BooksContainerProps {
    searchParams: Promise<SearchParams>;
}

interface BooksApiResponse {
    success: boolean;
    message?: string;
    data: Book[];
    pagination: {
        currentPage: number;
        pageSize: number;
        totalBooks: number;
        totalPages: number;
    };
}

function getSingleValue(value?: string | string[]) {
    return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

const BooksContainer = async ({ searchParams }: BooksContainerProps) => {
    const params = await searchParams;
    const search = getSingleValue(params.search).trim().slice(0, 100);
    const requestedSort = getSingleValue(params.sort);
    const sort = requestedSort === "oldest" || requestedSort === "title"
        ? requestedSort
        : "newest";
    const requestedPage = Number(getSingleValue(params.page) || "1");
    const page = Number.isSafeInteger(requestedPage) && requestedPage > 0
        ? requestedPage
        : 1;
    const apiUrl = process.env.NEXT_PUBLIC_API;

    if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_API is not configured.");
    }

    const query = new URLSearchParams({
        page: String(page),
        limit: String(booksPerPage),
        sort,
    });
    if (search) {
        query.set("search", search);
    }

    const response = await fetch(`${apiUrl}/books?${query}`, { cache: "no-store" });
    const result = await response.json() as BooksApiResponse;
    if (!response.ok || !result.success || !Array.isArray(result.data)) {
        throw new Error(result.message || "Failed to fetch books.");
    }

    const books = result.data;
    const pagination = result.pagination;
    const pageUrl = (pageNumber: number) => {
        const params = new URLSearchParams({
            page: String(pageNumber),
            sort,
        });
        if (search) {
            params.set("search", search);
        }
        return `/books?${params}`;
    };

    return (
        <div className="space-y-7">
            <form
                action="/books"
                method="get"
                className="flex flex-col gap-3 rounded-2xl border border-[#e9e2d5] bg-[#fffdf9] p-4 sm:flex-row sm:items-end"
            >
                <label className="flex flex-1 flex-col gap-2 text-sm font-medium text-[#464940]">
                    Search by title, author, or category
                    <input
                        type="search"
                        name="search"
                        maxLength={100}
                        defaultValue={search}
                        placeholder="Try a book title or author"
                        className="min-h-11 rounded-xl border border-[#e9e2d5] bg-white px-3 font-normal outline-none focus:border-[#315c4d]"
                    />
                </label>

                <div className="flex flex-col gap-2 text-sm font-medium text-[#464940]">
                    <Label className="font-medium text-[#464940]">Sort books</Label>
                    <Select
                        name="sort"
                        defaultValue={sort}
                        aria-label="Sort books"
                    >
                        <Select.Trigger className="min-h-11 rounded-xl border border-[#e9e2d5] bg-white px-3 text-left">
                            <Select.Value />
                            <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover>
                            <ListBox>
                                <ListBox.Item id="newest" textValue="Newest first">
                                    Newest first
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="oldest" textValue="Oldest first">
                                    Oldest first
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                                <ListBox.Item id="title" textValue="Title (A-Z)">
                                    Title (A-Z)
                                    <ListBox.ItemIndicator />
                                </ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                <button
                    type="submit"
                    className="min-h-11 rounded-full bg-[#315c4d] px-5 text-sm font-semibold text-white hover:bg-[#25483c]"
                >
                    Search books
                </button>
                {(search || sort !== "newest") && (
                    <Link
                        href="/books"
                        className="inline-flex min-h-11 items-center justify-center px-3 text-sm font-medium text-[#315c4d] underline"
                    >
                        Clear filters
                    </Link>
                )}
            </form>

            {books.length === 0 ? (
                <section className="rounded-[1.75rem] border border-dashed border-[#d9dfd4] bg-[#fffdf9] px-6 py-12 text-center">
                    <BookOpen aria-hidden="true" className="mx-auto size-10 text-[#74806d]" />
                    <h2 className="mt-4 font-serif text-xl font-semibold text-[#292b25]">
                        {search ? "No books match your search" : "The library is waiting for its first book"}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#74756c]">
                        {search
                            ? "Try another title, author, or category."
                            : "No books have been added yet. Add one to get the collection started."}
                    </p>
                    <Link
                        href={search ? "/books" : "/add-book"}
                        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#315c4d] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#25483c]"
                    >
                        {search ? "Clear search" : "Add a book"}
                    </Link>
                </section>
            ) : (
                <>
                    <p className="text-sm text-[#74756c]">
                        Showing {(pagination.currentPage - 1) * pagination.pageSize + 1}
                        {"–"}
                        {(pagination.currentPage - 1) * pagination.pageSize + books.length}
                        {" of "}
                        {pagination.totalBooks} books
                    </p>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {books.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>

                    {pagination.totalPages > 1 && (
                        <nav
                            aria-label="Books pagination"
                            className="flex items-center justify-center gap-4 border-t border-[#e9e2d5] pt-5"
                        >
                            {pagination.currentPage > 1 ? (
                                <Link
                                    href={pageUrl(pagination.currentPage - 1)}
                                    className="rounded-full border border-[#dce4da] px-4 py-2 text-sm font-semibold text-[#315c4d] hover:bg-[#eaf0e9]"
                                >
                                    Previous
                                </Link>
                            ) : (
                                <span className="rounded-full border border-[#e9e2d5] px-4 py-2 text-sm text-[#929187]">
                                    Previous
                                </span>
                            )}

                            <span className="text-sm font-medium text-[#464940]">
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </span>

                            {pagination.currentPage < pagination.totalPages ? (
                                <Link
                                    href={pageUrl(pagination.currentPage + 1)}
                                    className="rounded-full border border-[#dce4da] px-4 py-2 text-sm font-semibold text-[#315c4d] hover:bg-[#eaf0e9]"
                                >
                                    Next
                                </Link>
                            ) : (
                                <span className="rounded-full border border-[#e9e2d5] px-4 py-2 text-sm text-[#929187]">
                                    Next
                                </span>
                            )}
                        </nav>
                    )}
                </>
            )}
        </div>
    );
};

export default BooksContainer;