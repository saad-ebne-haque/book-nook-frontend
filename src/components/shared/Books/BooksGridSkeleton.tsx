interface BooksGridSkeletonProps {
    label: string;
}

export default function BooksGridSkeleton({ label }: BooksGridSkeletonProps) {
    return (
        <div role="status" aria-busy="true">
            <span className="sr-only">{label}</span>
            <div
                aria-hidden="true"
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
                {Array.from({ length: 6 }, (_, index) => (
                    <div
                        key={index}
                        className="mx-auto w-full max-w-[360px] animate-pulse overflow-hidden rounded-[1.75rem] border border-[#e9e2d5] bg-[#fffdf9] shadow-[0_12px_30px_rgba(54,48,37,0.07)]"
                    >
                        <div className="aspect-[4/3] bg-[#eee8dc]" />
                        <div className="space-y-4 p-5 sm:p-6">
                            <div className="h-7 w-4/5 rounded bg-[#eee8dc]" />
                            <div className="h-4 w-2/5 rounded bg-[#eee8dc]" />
                            <div className="space-y-2 pt-2">
                                <div className="h-4 rounded bg-[#eee8dc]" />
                                <div className="h-4 w-3/4 rounded bg-[#eee8dc]" />
                            </div>
                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <div className="h-14 rounded-2xl bg-[#f0ede5]" />
                                <div className="h-14 rounded-2xl bg-[#f0ede5]" />
                            </div>
                            <div className="h-10 rounded-full bg-[#dce4da]" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
