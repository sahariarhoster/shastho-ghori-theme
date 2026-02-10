import { Phone, Mail, MapPin, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-background relative overflow-hidden">
    {/* Decorative top wave */}
    <div className="absolute top-0 left-0 right-0 h-1 gradient-primary" />

    <div className="container py-14">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="w-6 h-6 text-accent" />
            <h3 className="text-xl font-heading font-bold">Shastho Gori</h3>
          </div>
          <p className="text-sm opacity-70 leading-relaxed mb-4">
            প্রতিটি পরিবারের সুস্বাস্থ্য নিশ্চিত করতে আমরা পাশে আছি সর্বদা।
            ১০০% অর্গানিক এবং প্রাকৃতিক পণ্য।
          </p>
          <div className="flex gap-3">
            {["Facebook", "Instagram", "YouTube"].map((social) => (
              <a
                key={social}
                href="#"
                className="w-9 h-9 rounded-full border border-background/20 flex items-center justify-center text-xs font-semibold hover:bg-primary hover:border-primary transition-colors"
              >
                {social.charAt(0)}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-base font-semibold mb-5 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-8 after:h-0.5 after:bg-primary">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm opacity-70">
            {["Home", "Shop", "Offer Zone", "Best Seller", "Contact"].map((link) => (
              <li key={link}>
                <Link to="/" className="hover:text-primary hover:opacity-100 transition-all hover:pl-1">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-base font-semibold mb-5 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-8 after:h-0.5 after:bg-primary">
            Support
          </h4>
          <ul className="space-y-2.5 text-sm opacity-70">
            {["Privacy Policy", "Terms & Conditions", "Return Policy", "FAQ"].map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-primary hover:opacity-100 transition-all hover:pl-1">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-base font-semibold mb-5 relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-8 after:h-0.5 after:bg-primary">
            Contact
          </h4>
          <ul className="space-y-3.5 text-sm opacity-70">
            <li className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-3.5 h-3.5" />
              </div>
              01612-261570
            </li>
            <li className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              info@shasthogori.com
            </li>
            <li className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              Dhaka, Bangladesh
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="border-t border-background/10 py-5">
      <p className="text-center text-xs opacity-50">
        © 2025 Shastho Gori. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
