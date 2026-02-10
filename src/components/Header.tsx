import { Search, ShoppingCart, Heart, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, totalPrice } = useCart();

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container flex items-center justify-between py-4 gap-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-primary leading-tight">
            Shastho<br className="hidden md:block" /> Gori
          </h1>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <div className="flex w-full border border-border rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-background text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button className="bg-primary text-primary-foreground px-4 hover:opacity-90 transition-opacity">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-1 text-foreground hover:text-primary transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button className="hidden md:flex items-center gap-1 text-foreground hover:text-primary transition-colors">
            <User className="w-5 h-5" />
          </button>
          <Link to="/cart" className="relative flex items-center gap-1 text-foreground hover:text-primary transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
              {totalItems}
            </span>
            <span className="hidden md:inline text-sm ml-1">৳ {totalPrice.toLocaleString()}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
