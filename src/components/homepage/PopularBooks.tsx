import HomepageBookSection from "@/components/homepage/HomepageBookSection";
import { homepagePopularBooks } from "@/components/homepage/homepageBookSections";

export default function PopularBooks() {
  return (
    <HomepageBookSection
      id="home-popular-title"
      eyebrow="Highly rated reads"
      title="Popular Books"
      description="Browse books ordered by reader rating."
      books={homepagePopularBooks}
    />
  );
}
