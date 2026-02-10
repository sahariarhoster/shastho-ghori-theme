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
  { name: "Energy Booster", image: catEnergy },
  { name: "Heart Care", image: catHeart },
  { name: "Honey", image: catHoney },
  { name: "Sleep Care", image: catSleep },
  { name: "Brain Food", image: catBrain },
  { name: "Herbs", image: catHerbs },
  { name: "Weight Loss", image: catWeightloss },
  { name: "Dates", image: catDates },
  { name: "All Categories", image: null },
];

const Categories = () => (
  <section className="py-10 md:py-16">
    <div className="container">
      <h2 className="section-heading mb-10">All Categories</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-6 justify-items-center">
        {categories.map((cat) => (
          <a
            key={cat.name}
            href="#"
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors shadow-md">
              {cat.image ? (
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary">
                  <LayoutGrid className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
            </div>
            <span className="text-xs md:text-sm font-medium text-foreground text-center leading-tight group-hover:text-primary transition-colors">
              {cat.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Categories;
