import { Phone } from "lucide-react";

const TopBar = () => (
  <div className="gradient-primary text-primary-foreground text-sm py-2">
    <div className="container flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Phone className="w-3.5 h-3.5" />
        <span className="font-medium">কল করুন: 01612-261570</span>
      </div>
      <div className="hidden md:flex items-center gap-4 text-xs font-medium">
        <a href="#" className="hover:opacity-80 transition-opacity">Facebook</a>
        <span className="opacity-30">|</span>
        <a href="#" className="hover:opacity-80 transition-opacity">Instagram</a>
        <span className="opacity-30">|</span>
        <a href="#" className="hover:opacity-80 transition-opacity">YouTube</a>
        <span className="opacity-30">|</span>
        <a href="#" className="hover:opacity-80 transition-opacity">WhatsApp</a>
      </div>
    </div>
  </div>
);

export default TopBar;
