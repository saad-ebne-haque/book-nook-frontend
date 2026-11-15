import BorrowTable from "@/components/pages/myBorrows/BorrowTable";


const MyBorrowsPage = () => {
    return (
        <main className="min-h-screen bg-[#faf8f3] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-7">
                <header>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6d806f]">
                        Your reading shelf
                    </p>
                    <h1 className="mt-2 font-serif text-3xl font-semibold text-[#292b25] sm:text-4xl">
                        My Borrows
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-[#74756c] sm:text-base">
                        Keep track of the books you&apos;re enjoying and return them when you&apos;re done.
                    </p>
                </header>
                <BorrowTable />
            </div>
        </main>
    );
};

export default MyBorrowsPage;