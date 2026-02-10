import { Home, Search, Menu, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const MobileBottomNav = () => {
  const { totalItems } = useCart();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 pb-safe">
      <div className="flex items-center justify-around py-2">
        {[
          { icon: Home, label: "Home", to: "/" },
          { icon: Search, label: "Search", to: "/" },
          { icon: Menu, label: "Menu", to: "/" },
          { icon: Heart, label: "Wishlist", to: "/" },
          { icon: ShoppingCart, label: "Cart", to: "/cart", badge: totalItems },
        ].map(({ icon: Icon, label, to, badge }) => (
          <Link
            key={label}
            to={to}
            className="relative flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon className="w-5 h-5" />
            {badge !== undefined && badge > 0 && (
              <span className="absolute -top-1 right-0 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold">
                {badge}
              </span>
            )}
            <span className="text-[10px]">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
