import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "HOME", href: "#" },
  { label: "OFFER ZONE", href: "#" },
  { label: "BEST SELLER", href: "#" },
  { label: "ORGANIC ZONE", href: "#" },
  { label: "HONEY", href: "#" },
  { label: "SHOP", href: "#" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-background border-b border-border hidden md:block">
      <div className="container">
        <ul className="flex items-center justify-center gap-8 py-3">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-sm font-semibold tracking-wide text-foreground hover:text-primary transition-colors uppercase"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
