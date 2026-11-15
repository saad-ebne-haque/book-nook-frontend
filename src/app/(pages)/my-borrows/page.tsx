import BorrowTable from "@/components/pages/myBorrows/BorrowTable";


const MyBorrowsPage = () => {
    return (
        <main className="container mx-auto min-h-screen px-4 py-10">
            <div className="mx-auto max-w-6xl space-y-6">

                {/* Page Header */}
                <div>
                    <h1 className="text-3xl font-bold">
                        My Borrowed Books
                    </h1>
                    <p className="mt-2 text-sm text-default-500">
                        View and manage all the books you have borrowed.
                    </p>
                </div>

                <BorrowTable></BorrowTable>

            </div>
        </main>
    );
};

export default MyBorrowsPage;