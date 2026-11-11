import AddBookForm from "@/components/pages/addBook/AddBookForm";
import { Suspense } from "react";

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