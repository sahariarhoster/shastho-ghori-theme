import { Home, Search, Menu, ShoppingCart, Heart } from "lucide-react";

const MobileBottomNav = () => (
  <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 pb-safe">
    <div className="flex items-center justify-around py-2">
      {[
        { icon: Home, label: "Home" },
        { icon: Search, label: "Search" },
        { icon: Menu, label: "Menu" },
        { icon: Heart, label: "Wishlist" },
        { icon: ShoppingCart, label: "Cart" },
      ].map(({ icon: Icon, label }) => (
        <button
          key={label}
          className="flex flex-col items-center gap-0.5 text-muted-foreground hover:text-primary transition-colors"
        >
          <Icon className="w-5 h-5" />
          <span className="text-[10px]">{label}</span>
        </button>
      ))}
    </div>
  </nav>
);

export default MobileBottomNav;
