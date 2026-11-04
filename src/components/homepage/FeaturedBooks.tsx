import HomepageBookSection from "@/components/homepage/HomepageBookSection";
import { homepageFeaturedBooks } from "@/components/homepage/homepageBookSections";

export default function FeaturedBooks() {
  return (
    <HomepageBookSection
      id="home-featured-title"
      eyebrow="A few reader favorites"
      title="Featured Books"
      description="Take a closer look at books from our collection."
      books={homepageFeaturedBooks}
    />
  );
}
