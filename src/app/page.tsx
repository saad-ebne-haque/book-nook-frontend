

import { Suspense } from "react";
import Banner from "@/components/pages/home/Banner";

export default function Home() {
  return (
    <Suspense
      fallback={
        <section
          aria-label="Featured BookNook stories"
          className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10"
        >
          <div className="min-h-[470px] animate-pulse rounded-[2rem] bg-[#f3e8d8] md:min-h-[480px]" />
        </section>
      }
    >
      <Banner />
    </Suspense>
  );
}
