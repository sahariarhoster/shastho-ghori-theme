import catEnergy from "@/assets/cat-energy.jpg";
import catHeart from "@/assets/cat-heart.jpg";
import catHoney from "@/assets/cat-honey.jpg";
import catSleep from "@/assets/cat-sleep.jpg";
import catBrain from "@/assets/cat-brain.jpg";
import catHerbs from "@/assets/cat-herbs.jpg";
import catWeightloss from "@/assets/cat-weightloss.jpg";
import catDates from "@/assets/cat-dates.jpg";
import { LayoutGrid } from "lucide-react";

const categories = [
  { name: "Energy Booster", nameBn: "শক্তি বর্ধক", image: catEnergy },
  { name: "Heart Care", nameBn: "হার্ট কেয়ার", image: catHeart },
  { name: "Honey", nameBn: "মধু", image: catHoney },
  { name: "Sleep Care", nameBn: "ঘুমের যত্ন", image: catSleep },
  { name: "Brain Food", nameBn: "ব্রেইন ফুড", image: catBrain },
  { name: "Herbs", nameBn: "ভেষজ", image: catHerbs },
  { name: "Weight Loss", nameBn: "ওজন কমান", image: catWeightloss },
  { name: "Dates", nameBn: "খেজুর", image: catDates },
  { name: "All Categories", nameBn: "সকল", image: null },
];

const Categories = () => (
  <section className="py-12 md:py-20">
    <div className="container">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold text-accent uppercase tracking-widest">Browse By</span>
        <h2 className="section-heading mt-2">All Categories</h2>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-6 md:gap-8 justify-items-center">
        {categories.map((cat, i) => (
          <a
            key={cat.name}
            href="#"
            className={`flex flex-col items-center gap-3 group opacity-0 animate-scale-in stagger-${i + 1}`}
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-3 border-primary/10 group-hover:border-primary transition-all duration-300 shadow-md group-hover:shadow-xl group-hover:shadow-primary/20 group-hover:-translate-y-1">
              {cat.image ? (
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center gradient-primary">
                  <LayoutGrid className="w-8 h-8 text-primary-foreground" />
                </div>
              )}
              {/* Glow ring on hover */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-primary/30 transition-colors duration-300" />
            </div>
            <div className="text-center">
              <span className="text-xs md:text-sm font-semibold text-foreground group-hover:text-primary transition-colors block leading-tight">
                {cat.name}
              </span>
              <span className="text-[10px] text-muted-foreground">{cat.nameBn}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Categories;
