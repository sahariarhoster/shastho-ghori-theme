import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const ProductGrid = () => (
  <section className="py-12 md:py-20 bg-secondary/30">
    <div className="container">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold text-accent uppercase tracking-widest">Our Collection</span>
        <h2 className="section-heading mt-2">All Products</h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          ১০০% প্রাকৃতিক ও অর্গানিক পণ্য — আপনার সুস্বাস্থ্যের জন্য
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        {products.map((product, i) => (
          <div key={product.id} className={`opacity-0 animate-fade-in-up stagger-${Math.min(i + 1, 9)}`}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductGrid;
