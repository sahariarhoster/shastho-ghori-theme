import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, Share2, ChevronRight, Star, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header />
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Product not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  const images = [product.image, product.image2 || product.image];
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);
  const hasDiscount = product.discount && product.discount > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <Navigation />
      <main className="flex-1 pb-16 md:pb-0">
        {/* Breadcrumb */}
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="hover:text-primary transition-colors cursor-pointer">{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
        </div>

        {/* Product Detail */}
        <section className="container pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden border border-border bg-secondary/30">
                {hasDiscount && (
                  <span className="absolute top-4 left-4 z-10 bg-sale text-sale-foreground text-sm font-bold px-3 py-1 rounded">
                    -{product.discount}%
                  </span>
                )}
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? "border-primary" : "border-border"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-primary font-medium mb-1">{product.category}</p>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-1">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground">{product.nameBn}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-star fill-star" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(12 Reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                {hasDiscount && product.originalPrice && (
                  <span className="text-xl text-price-old line-through">
                    ৳ {product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-3xl font-bold text-price">
                  ৳ {product.price.toLocaleString()}
                </span>
              </div>

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Size:</p>
                  <div className="flex gap-2">
                    {product.variants.map((v, i) => (
                      <button
                        key={v}
                        onClick={() => setSelectedVariant(i)}
                        className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                          selectedVariant === i
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-foreground hover:border-primary"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Quantity:</p>
                <div className="flex items-center border border-border rounded-md w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 text-foreground hover:bg-secondary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 py-2 text-sm font-medium text-foreground min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 text-foreground hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="flex-1 bg-primary text-primary-foreground font-semibold py-3.5 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  অর্ডার করুন
                </button>
                <button className="p-3.5 border border-border rounded-md text-foreground hover:text-primary hover:border-primary transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-3.5 border border-border rounded-md text-foreground hover:text-primary hover:border-primary transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                {[
                  { icon: Truck, label: "Free Delivery", sub: "Orders over ৳1500" },
                  { icon: Shield, label: "100% Organic", sub: "Guaranteed quality" },
                  { icon: RotateCcw, label: "Easy Returns", sub: "7-day return policy" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex flex-col items-center text-center gap-1">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-xs font-semibold text-foreground">{label}</span>
                    <span className="text-[10px] text-muted-foreground">{sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs: Description / Reviews */}
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b border-border bg-transparent rounded-none h-auto p-0 gap-6">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 px-0 text-muted-foreground data-[state=active]:text-primary font-semibold"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 px-0 text-muted-foreground data-[state=active]:text-primary font-semibold"
                >
                  Reviews (12)
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="pt-6">
                <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
                  <p>
                    {product.name} ({product.nameBn}) is a premium quality organic health supplement
                    crafted from the finest natural ingredients. Each batch is carefully prepared to
                    ensure maximum potency and effectiveness.
                  </p>
                  <p>
                    আমাদের পণ্যগুলো সম্পূর্ণ প্রাকৃতিক এবং কোনো রাসায়নিক পদার্থ মিশ্রিত নয়। 
                    প্রতিটি পণ্য নিজস্ব তত্ত্বাবধানে তৈরি করা হয়।
                  </p>
                  <h3 className="text-foreground font-semibold text-base mt-4">Benefits:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>100% natural and organic ingredients</li>
                    <li>No artificial preservatives or chemicals</li>
                    <li>Handcrafted with traditional methods</li>
                    <li>Lab tested for quality assurance</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="pt-6">
                <div className="space-y-6">
                  {[
                    { name: "Rahim Ahmed", text: "অসাধারণ পণ্য! সত্যিই কাজ করে।", rating: 5 },
                    { name: "Fatima Begum", text: "খুব ভালো মানের। আবার অর্ডার করবো।", rating: 5 },
                    { name: "Karim Uddin", text: "ডেলিভারি দ্রুত এবং প্যাকেজিং চমৎকার।", rating: 4 },
                  ].map((review, i) => (
                    <div key={i} className="border-b border-border pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              className={`w-3.5 h-3.5 ${j < review.rating ? "text-star fill-star" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-foreground">{review.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.text}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-10 bg-secondary/50">
          <div className="container">
            <h2 className="section-heading mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default ProductPage;
