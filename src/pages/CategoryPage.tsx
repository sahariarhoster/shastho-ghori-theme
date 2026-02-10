import { useParams, Link } from "react-router-dom";
import { ChevronRight, Filter, Sparkles } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

// Category metadata with Bangla names
const categoryMeta: Record<string, { nameBn: string; description: string }> = {
  "energy-booster": { nameBn: "শক্তি বর্ধক", description: "প্রাকৃতিক উপায়ে শরীরের শক্তি ও কর্মক্ষমতা বাড়ান" },
  "heart-care": { nameBn: "হার্ট কেয়ার", description: "হৃদযন্ত্র সুস্থ রাখতে প্রাকৃতিক ভেষজ পণ্য" },
  "honey": { nameBn: "মধু", description: "১০০% খাঁটি ও প্রাকৃতিক মধু সংগ্রহ" },
  "sleep-care": { nameBn: "ঘুমের যত্ন", description: "ভালো ঘুমের জন্য প্রাকৃতিক সমাধান" },
  "brain-food": { nameBn: "ব্রেইন ফুড", description: "মস্তিষ্কের কার্যক্ষমতা বৃদ্ধিতে সহায়ক খাবার" },
  "herbs": { nameBn: "ভেষজ", description: "প্রাচীন ভেষজ চিকিৎসার আধুনিক সমাধান" },
  "weight-loss": { nameBn: "ওজন কমান", description: "স্বাস্থ্যকর উপায়ে ওজন নিয়ন্ত্রণ করুন" },
  "dates": { nameBn: "খেজুর", description: "পুষ্টিকর ও সুস্বাদু খেজুর সংগ্রহ" },
  "organic-zone": { nameBn: "অর্গানিক জোন", description: "সম্পূর্ণ অর্গানিক ও রাসায়নিকমুক্ত পণ্য" },
  "best-seller": { nameBn: "বেস্ট সেলার", description: "আমাদের সবচেয়ে জনপ্রিয় পণ্যসমূহ" },
  "all": { nameBn: "সকল পণ্য", description: "আমাদের সকল প্রাকৃতিক ও অর্গানিক পণ্য দেখুন" },
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const meta = slug ? categoryMeta[slug] : categoryMeta["all"];
  const isAll = !slug || slug === "all";

  // Convert slug to category name for filtering
  const categoryName = slug
    ? slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
    : "";

  const filteredProducts = isAll
    ? products
    : products.filter(p => p.category.toLowerCase().replace(/\s+/g, "-") === slug);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Header />
      <Navigation />
      <main className="flex-1 pb-16 md:pb-0">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/60 to-primary/5 border-b border-border">
          <div className="container py-8">
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
              <Link to="/" className="hover:text-primary transition-colors">হোম</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">{meta?.nameBn || categoryName}</span>
            </nav>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-md shadow-primary/20">
                <Filter className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  {meta?.nameBn || categoryName}
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {meta?.description || "এই ক্যাটাগরির পণ্যসমূহ দেখুন"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">{filteredProducts.length}</span>টি পণ্য পাওয়া গেছে
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs bg-primary/10 text-primary font-semibold px-3 py-1.5 rounded-full">
              <Sparkles className="w-3 h-3" />
              {isAll ? "সকল পণ্য" : meta?.nameBn || categoryName}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product, i) => (
                <div key={product.id} className={`opacity-0 animate-fade-in-up stagger-${Math.min(i + 1, 9)}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-secondary/80 flex items-center justify-center">
                <Filter className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <p className="text-xl font-heading font-bold text-foreground">কোনো পণ্য পাওয়া যায়নি</p>
              <p className="text-muted-foreground">এই ক্যাটাগরিতে এখনো কোনো পণ্য যোগ করা হয়নি।</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                হোমপেজে যান
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default CategoryPage;
