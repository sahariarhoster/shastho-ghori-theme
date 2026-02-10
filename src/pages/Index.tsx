import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import HeroBanner from "@/components/HeroBanner";
import Categories from "@/components/Categories";
import ProductGrid from "@/components/ProductGrid";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <TopBar />
    <Header />
    <Navigation />
    <main className="flex-1 pb-16 md:pb-0">
      <HeroBanner />
      <Categories />
      <ProductGrid />
      <ReviewsSection />
    </main>
    <Footer />
    <MobileBottomNav />
  </div>
);

export default Index;
