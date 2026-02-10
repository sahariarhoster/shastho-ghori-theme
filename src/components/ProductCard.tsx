import { Heart, Eye, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  const hasDiscount = product.discount && product.discount > 0;
  const { addToCart } = useCart();
  const { toast } = useToast();

  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden hover-lift">
      {/* Image */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        {hasDiscount && (
          <span className="absolute top-3 left-3 z-10 bg-sale text-sale-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            -{product.discount}%
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4 gap-2">
          <button className="bg-card/90 backdrop-blur-sm text-foreground p-2.5 rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 translate-y-4 group-hover:translate-y-0">
            <Heart className="w-4 h-4" />
          </button>
          <button className="bg-card/90 backdrop-blur-sm text-foreground p-2.5 rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 translate-y-4 group-hover:translate-y-0 delay-75">
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
              toast({ title: "কার্টে যোগ হয়েছে! 🛒", description: product.name });
            }}
            className="bg-card/90 backdrop-blur-sm text-foreground p-2.5 rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 translate-y-4 group-hover:translate-y-0 delay-150"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] text-accent font-semibold uppercase tracking-wider mb-1">{product.category}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-card-foreground mb-0.5 line-clamp-1 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mb-2">{product.nameBn}</p>

        {product.variants && (
          <div className="flex gap-1 mb-2 flex-wrap">
            {product.variants.map((v) => (
              <span
                key={v}
                className="text-[10px] border border-primary/20 rounded-full px-2 py-0.5 text-primary font-medium"
              >
                {v}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          {hasDiscount && product.originalPrice && (
            <span className="text-xs text-price-old line-through">
              ৳ {product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="text-base font-bold text-price">
            ৳ {product.price.toLocaleString()}
          </span>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="w-full gradient-primary text-primary-foreground text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity block text-center shadow-sm"
        >
          অর্ডার করুন
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
