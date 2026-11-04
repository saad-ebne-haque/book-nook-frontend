import HomeHero from "@/components/homepage/HomeHero";
import FeaturedBooks from "@/components/homepage/FeaturedBooks";
import HowBorrowingWorks from "@/components/homepage/HowBorrowingWorks";
import NewArrivals from "@/components/homepage/NewArrivals";
import PopularBooks from "@/components/homepage/PopularBooks";
import WhyChooseBookNook from "@/components/homepage/WhyChooseBookNook";

export default function Home() {
  return (
    <div className="booknook-home">
      <HomeHero />
      <FeaturedBooks />
      <PopularBooks />
      <NewArrivals />
      <HowBorrowingWorks />
      <WhyChooseBookNook />
    </div>
  );
}
