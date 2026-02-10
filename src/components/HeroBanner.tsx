import heroBanner from "@/assets/hero-banner.jpg";
import { Link } from "react-router-dom";
import { ShoppingCart, Leaf } from "lucide-react";

const HeroBanner = () => (
  <section className="w-full">
    <div className="container py-4">
      <div className="relative rounded-xl overflow-hidden group">
        <img
          src={heroBanner}
          alt="Shastho Gori - Organic Health Products"
          className="w-full h-[280px] md:h-[480px] lg:h-[560px] object-cover group-hover:scale-105 transition-transform duration-700"
          loading="eager"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-16 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 text-xs md:text-sm font-semibold text-primary-foreground bg-primary/80 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit mb-4 animate-fade-in">
            <Leaf className="w-3.5 h-3.5" />
            ১০০% অর্গানিক ও প্রাকৃতিক
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground leading-tight mb-3 opacity-0 animate-slide-up">
            প্রকৃতির শক্তিতে <br />
            <span className="text-star">সুস্থ জীবন</span> গড়ুন
          </h2>
          <p className="text-sm md:text-base text-primary-foreground/80 mb-6 max-w-md opacity-0 animate-slide-up stagger-2">
            শস্থ গড়ি - আপনার পরিবারের সুস্বাস্থ্যের বিশ্বস্ত সঙ্গী। সকল পণ্য ল্যাব টেস্টেড ও নিরাপদ।
          </p>
          <div className="flex gap-3 opacity-0 animate-slide-up stagger-3">
            <Link
              to="/"
              className="gradient-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 text-sm md:text-base shadow-lg animate-pulse-glow"
            >
              <ShoppingCart className="w-4 h-4" />
              শপিং করুন
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroBanner;
