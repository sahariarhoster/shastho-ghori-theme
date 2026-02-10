import catEnergy from "@/assets/cat-energy.jpg";
import catHeart from "@/assets/cat-heart.jpg";
import catHoney from "@/assets/cat-honey.jpg";
import catSleep from "@/assets/cat-sleep.jpg";
import catBrain from "@/assets/cat-brain.jpg";
import catHerbs from "@/assets/cat-herbs.jpg";
import catWeightloss from "@/assets/cat-weightloss.jpg";
import catDates from "@/assets/cat-dates.jpg";
import { LayoutGrid, Sparkles } from "lucide-react";

const categories = [
  { name: "Energy Booster", nameBn: "শক্তি বর্ধক", image: catEnergy, count: 12 },
  { name: "Heart Care", nameBn: "হার্ট কেয়ার", image: catHeart, count: 8 },
  { name: "Honey", nameBn: "মধু", image: catHoney, count: 15 },
  { name: "Sleep Care", nameBn: "ঘুমের যত্ন", image: catSleep, count: 6 },
  { name: "Brain Food", nameBn: "ব্রেইন ফুড", image: catBrain, count: 9 },
  { name: "Herbs", nameBn: "ভেষজ", image: catHerbs, count: 20 },
  { name: "Weight Loss", nameBn: "ওজন কমান", image: catWeightloss, count: 11 },
  { name: "Dates", nameBn: "খেজুর", image: catDates, count: 7 },
  { name: "All Categories", nameBn: "সকল ক্যাটাগরি", image: null, count: null },
];

const Categories = () => (
  <section className="py-14 md:py-20 bg-secondary/40">
    <div className="container">
      {/* Section Header */}
      <div className="text-center mb-10 md:mb-14">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          ক্যাটাগরি ব্রাউজ করুন
        </div>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
          আমাদের <span className="gradient-text">পণ্যের ধরন</span>
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          আপনার প্রয়োজন অনুযায়ী ক্যাটাগরি থেকে পণ্য বেছে নিন
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-4 md:gap-6 justify-items-center">
        {categories.map((cat, i) => (
          <a
            key={cat.name}
            href="#"
            className={`flex flex-col items-center gap-2.5 group opacity-0 animate-scale-in stagger-${i + 1} w-full max-w-[120px]`}
          >
            {/* Image Circle */}
            <div className="relative">
              <div className="w-[72px] h-[72px] md:w-[88px] md:h-[88px] rounded-full overflow-hidden ring-2 ring-border group-hover:ring-primary ring-offset-2 ring-offset-background transition-all duration-400 shadow-sm group-hover:shadow-lg group-hover:shadow-primary/15 group-hover:-translate-y-1.5">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center gradient-primary">
                    <LayoutGrid className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground" />
                  </div>
                )}
              </div>
              {/* Item count badge */}
              {cat.count && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {cat.count}
                </span>
              )}
            </div>

            {/* Label */}
            <div className="text-center space-y-0.5">
              <span className="text-xs md:text-sm font-semibold text-foreground group-hover:text-primary transition-colors block leading-tight">
                {cat.nameBn}
              </span>
              <span className="text-[10px] text-muted-foreground/70 group-hover:text-muted-foreground transition-colors">
                {cat.name}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Categories;
