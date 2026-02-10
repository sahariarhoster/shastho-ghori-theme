import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-heading font-bold mb-4">Shastho Gori</h3>
          <p className="text-sm opacity-80 leading-relaxed">
            প্রতিটি পরিবারের সুস্বাস্থ্য নিশ্চিত করতে আমরা পাশে আছি সর্বদা।
            ১০০% অর্গানিক এবং প্রাকৃতিক পণ্য।
          </p>
        </div>
        <div>
          <h4 className="text-base font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href="#" className="hover:opacity-100 transition-opacity">Home</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Shop</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Offer Zone</a></li>
            <li><a href="#" className="hover:opacity-100 transition-opacity">Best Seller</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-base font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm opacity-80">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> 01612-261570
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> info@shasthogori.com
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5" /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="border-t border-background/10 py-4">
      <p className="text-center text-xs opacity-60">
        © 2025 Shastho Gori. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
