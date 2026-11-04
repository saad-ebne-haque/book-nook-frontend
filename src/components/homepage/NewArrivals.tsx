import HomepageBookSection from "@/components/homepage/HomepageBookSection";
import { homepageNewArrivals } from "@/components/homepage/homepageBookSections";

export default function NewArrivals() {
  return (
    <HomepageBookSection
      id="home-arrivals-title"
      eyebrow="A first look at the shelf"
      title="New Arrivals"
      description="Explore the latest published titles in our collection."
      books={homepageNewArrivals}
    />
  );
}
