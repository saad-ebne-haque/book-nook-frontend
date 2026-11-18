import AddBookForm from "@/components/pages/addBook/AddBookForm";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Book",
};

const AddBookPage = async() => {



  return (
    <>
      <Suspense>
        <AddBookForm></AddBookForm>
      </Suspense>

    </>
  );
};

export default AddBookPage;