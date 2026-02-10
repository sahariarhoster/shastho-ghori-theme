import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, ShoppingCart, Share2, ChevronRight, Star, Minus, Plus, Truck, Shield, RotateCcw, Phone } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

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
                <button
                  onClick={() => {
                    addToCart(product, quantity, product.variants?.[selectedVariant]);
                    toast({ title: "কার্টে যোগ হয়েছে! 🛒", description: `${product.name} × ${quantity}` });
                  }}
                  className="flex-1 bg-primary text-primary-foreground font-semibold py-3.5 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  কার্টে যোগ করুন
                </button>
                <button className="p-3.5 border border-border rounded-md text-foreground hover:text-primary hover:border-primary transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-3.5 border border-border rounded-md text-foreground hover:text-primary hover:border-primary transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* WhatsApp & Call */}
              <div className="flex gap-3">
                <a
                  href={`https://wa.me/8801XXXXXXXXX?text=${encodeURIComponent(`আমি অর্ডার করতে চাই: ${product.name} (${product.nameBn}) - ৳${product.price}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#25D366] text-white font-semibold py-3 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp অর্ডার
                </a>
                <a
                  href="tel:+8801XXXXXXXXX"
                  className="flex-1 bg-accent text-accent-foreground font-semibold py-3 rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 border border-border"
                >
                  <Phone className="w-5 h-5" />
                  কল করুন
                </a>
              </div>

              {/* Delivery Info */}
              <div className="pt-4 border-t border-border space-y-3">
                <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary" />
                  ডেলিভারি চার্জ
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-secondary/50 rounded-md px-4 py-2.5">
                    <span className="text-sm text-foreground">ঢাকার ভিতরে (Inside Dhaka)</span>
                    <span className="text-sm font-bold text-price">৳ 60</span>
                  </div>
                  <div className="flex items-center justify-between bg-secondary/50 rounded-md px-4 py-2.5">
                    <span className="text-sm text-foreground">ঢাকার বাইরে (Outside Dhaka)</span>
                    <span className="text-sm font-bold text-price">৳ 120</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                {[
                  { icon: Shield, label: "100% Organic", sub: "Guaranteed quality" },
                  { icon: RotateCcw, label: "Easy Returns", sub: "7-day return policy" },
                  { icon: Truck, label: "Cash on Delivery", sub: "Pay when you receive" },
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
