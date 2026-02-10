import { Heart, Eye, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  const hasDiscount = product.discount && product.discount > 0;

  return (
    <div className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        {hasDiscount && (
          <span className="absolute top-3 left-3 z-10 bg-sale text-sale-foreground text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button className="bg-card text-foreground p-2.5 rounded-full shadow-md hover:bg-primary hover:text-primary-foreground transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <button className="bg-card text-foreground p-2.5 rounded-full shadow-md hover:bg-primary hover:text-primary-foreground transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="bg-card text-foreground p-2.5 rounded-full shadow-md hover:bg-primary hover:text-primary-foreground transition-colors">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-card-foreground mb-1 line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mb-2">{product.nameBn}</p>

        {product.variants && (
          <div className="flex gap-1 mb-2 flex-wrap">
            {product.variants.map((v) => (
              <span
                key={v}
                className="text-[10px] border border-border rounded px-1.5 py-0.5 text-muted-foreground"
              >
                {v}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2">
          {hasDiscount && product.originalPrice && (
            <span className="text-sm text-price-old line-through">
              ৳ {product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="text-sm font-bold text-price">
            ৳ {product.price.toLocaleString()}
          </span>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="mt-3 w-full bg-primary text-primary-foreground text-sm font-medium py-2 rounded hover:opacity-90 transition-opacity block text-center"
        >
          অর্ডার করুন
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
