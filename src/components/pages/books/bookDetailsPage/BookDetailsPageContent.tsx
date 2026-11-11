export interface BookDetailsPageContentProps {
    params: Promise<{ id: string }>;
}

export default async function BookDetailsPageContent({ params }: BookDetailsPageContentProps) {
    const { id } = await params;
    return (
        <>
            {id}
        </>
    )
}