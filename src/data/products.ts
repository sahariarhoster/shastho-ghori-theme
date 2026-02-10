import prodArjun from "@/assets/prod-arjun.jpg";
import prodBeetroot from "@/assets/prod-beetroot.jpg";
import prodBelly from "@/assets/prod-belly.jpg";
import prodKeto from "@/assets/prod-keto.jpg";
import prodMahabir from "@/assets/prod-mahabir.jpg";
import prodHoney from "@/assets/prod-honey.jpg";

export interface Product {
  id: number;
  name: string;
  nameBn: string;
  category: string;
  image: string;
  image2?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  variants?: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Arjun Heart Care Remedy",
    nameBn: "অর্জুন হার্ট কেয়ার রেমেডি",
    category: "Heart Care",
    image: prodArjun,
    price: 990,
    originalPrice: 1350,
    discount: 27,
    variants: ["250g", "500g"],
  },
  {
    id: 2,
    name: "Beetroot Powder",
    nameBn: "বিটরুট পাউডার",
    category: "Organic Zone",
    image: prodBeetroot,
    price: 1250,
  },
  {
    id: 3,
    name: "Belly Care",
    nameBn: "বেলি কেয়ার",
    category: "Best Seller",
    image: prodBelly,
    price: 1000,
    originalPrice: 1330,
    discount: 25,
    variants: ["100g", "200g"],
  },
  {
    id: 4,
    name: "Keto Fit",
    nameBn: "কিটো ফিট",
    category: "Weight Loss",
    image: prodKeto,
    price: 1200,
    originalPrice: 1700,
    discount: 29,
  },
  {
    id: 5,
    name: "Mahabir Energy Booster",
    nameBn: "মহাবীর",
    category: "Energy Booster",
    image: prodMahabir,
    price: 990,
    variants: ["100g", "250g", "1kg"],
  },
  {
    id: 6,
    name: "Pure Honey",
    nameBn: "মিশ্রফুলের মধু",
    category: "Honey",
    image: prodHoney,
    price: 390,
    variants: ["250g", "500g", "1kg"],
  },
];
