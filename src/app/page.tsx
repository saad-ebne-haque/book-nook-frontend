import HomeHero from "@/components/homepage/HomeHero";
import HowBorrowingWorks from "@/components/homepage/HowBorrowingWorks";
import NewArrivals from "@/components/homepage/NewArrivals";
import WhyChooseBookNook from "@/components/homepage/WhyChooseBookNook";

export default function Home() {
  return (
    <div className="booknook-home">
      <HomeHero />
      <NewArrivals />
      <HowBorrowingWorks />
      <WhyChooseBookNook />
    </div>
  );
}
