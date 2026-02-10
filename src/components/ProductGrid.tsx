import ProductCard from "./ProductCard";
import { products } from "@/data/products";

const ProductGrid = () => (
  <section className="py-10 md:py-16 bg-secondary/50">
    <div className="container">
      <h2 className="section-heading mb-10">All Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </section>
);

export default ProductGrid;
