import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Heart, ShoppingCart, Share2, ChevronRight, Star, Minus, Plus,
  Truck, Shield, RotateCcw, Phone, X, CheckCircle2, Leaf, Package, Clock
} from "lucide-react";
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
  const [showQuickOrder, setShowQuickOrder] = useState(false);
  const [quickForm, setQuickForm] = useState({ name: "", phone: "", address: "", notes: "" });
  const [shippingZone, setShippingZone] = useState<"inside_dhaka" | "outside_dhaka">("inside_dhaka");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash">("cod");
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header />
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-3">
            <Package className="w-16 h-16 text-muted-foreground mx-auto" />
            <p className="text-xl font-heading font-semibold text-foreground">পণ্যটি পাওয়া যায়নি</p>
            <Link to="/" className="text-primary hover:underline text-sm">← হোমে ফিরে যান</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = [product.image, product.image2 || product.image];
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);
  const hasDiscount = product.discount && product.discount > 0;
  const shippingCost = shippingZone === "inside_dhaka" ? 60 : 120;
  const orderTotal = product.price * quantity + shippingCost;

  const handleQuickOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickForm.name || !quickForm.phone || !quickForm.address) {
      toast({ title: "দয়া করে সকল তথ্য পূরণ করুন", variant: "destructive" });
      return;
    }
    setShowQuickOrder(false);
    setQuickForm({ name: "", phone: "", address: "", notes: "" });
    navigate("/thank-you");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Header />
      <Navigation />
      <main className="flex-1 pb-16 md:pb-0">
        {/* Breadcrumb */}
        <div className="bg-secondary/40 border-b border-border">
          <div className="container py-3">
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">হোম</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="hover:text-primary transition-colors cursor-pointer">{product.category}</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground font-medium truncate max-w-[200px]">{product.nameBn}</span>
            </nav>
          </div>
        </div>

        {/* Product Detail */}
        <section className="container py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-border bg-secondary/20 group">
                {hasDiscount && (
                  <span className="absolute top-4 left-4 z-10 bg-destructive text-destructive-foreground text-sm font-bold px-3 py-1.5 rounded-lg shadow-lg">
                    -{product.discount}% ছাড়
                  </span>
                )}
                <span className="absolute top-4 right-4 z-10 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1">
                  <Leaf className="w-3 h-3" /> অর্গানিক
                </span>
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === i
                        ? "border-primary ring-2 ring-primary/20 shadow-md"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-5">
              {/* Category & Badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="bg-secondary text-muted-foreground text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-primary" /> স্টকে আছে
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-foreground leading-tight">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground mt-1">{product.nameBn}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-star fill-star" />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">4.9</span>
                <span className="text-sm text-muted-foreground">(12 রিভিউ)</span>
              </div>

              {/* Price */}
              <div className="bg-secondary/50 rounded-xl p-4 border border-border">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl md:text-4xl font-bold text-price">
                    ৳ {product.price.toLocaleString()}
                  </span>
                  {hasDiscount && product.originalPrice && (
                    <>
                      <span className="text-lg text-price-old line-through">
                        ৳ {product.originalPrice.toLocaleString()}
                      </span>
                      <span className="bg-destructive/10 text-destructive text-sm font-bold px-2.5 py-0.5 rounded-md">
                        {product.discount}% সেভ
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> ঢাকায় ডেলিভারি ৳৬০ | ঢাকার বাইরে ৳১২০
                </p>
              </div>

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2.5">
                    সাইজ নির্বাচন করুন:
                  </p>
                  <div className="flex gap-2.5">
                    {product.variants.map((v, i) => (
                      <button
                        key={v}
                        onClick={() => setSelectedVariant(i)}
                        className={`px-5 py-2.5 text-sm rounded-xl border-2 font-semibold transition-all duration-200 ${
                          selectedVariant === i
                            ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                            : "border-border text-foreground hover:border-primary/50 hover:bg-secondary/50"
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
                <p className="text-sm font-semibold text-foreground mb-2.5">পরিমাণ:</p>
                <div className="flex items-center border border-border rounded-xl w-fit overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-foreground hover:bg-secondary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-2.5 text-base font-bold text-foreground min-w-[3.5rem] text-center border-x border-border">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-foreground hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      addToCart(product, quantity, product.variants?.[selectedVariant]);
                      toast({ title: "কার্টে যোগ হয়েছে! 🛒", description: `${product.name} × ${quantity}` });
                    }}
                    className="flex-1 bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md shadow-primary/20"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    কার্টে যোগ করুন
                  </button>
                  <button className="p-3.5 border-2 border-border rounded-xl text-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5 transition-all">
                    <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-3.5 border-2 border-border rounded-xl text-foreground hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Quick Order */}
                <button
                  onClick={() => setShowQuickOrder(true)}
                  className="w-full gradient-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg text-base"
                >
                  <Package className="w-5 h-5" />
                  সরাসরি অর্ডার করুন
                </button>

                {/* WhatsApp & Call */}
                <div className="flex gap-3">
                  <a
                    href={`https://wa.me/8801XXXXXXXXX?text=${encodeURIComponent(`আমি অর্ডার করতে চাই: ${product.name} (${product.nameBn}) - ৳${product.price}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp অর্ডার
                  </a>
                  <a
                    href="tel:+8801XXXXXXXXX"
                    className="flex-1 border-2 border-primary text-primary font-semibold py-3 rounded-xl hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    কল করুন
                  </a>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                {[
                  { icon: Shield, label: "১০০% অর্গানিক", sub: "ল্যাব টেস্টেড", color: "text-primary" },
                  { icon: Truck, label: "ক্যাশ অন ডেলিভারি", sub: "পণ্য পেয়ে পেমেন্ট", color: "text-primary" },
                  { icon: RotateCcw, label: "সহজ রিটার্ন", sub: "৭ দিনের রিটার্ন পলিসি", color: "text-primary" },
                  { icon: Clock, label: "দ্রুত ডেলিভারি", sub: "২-৫ কর্মদিবস", color: "text-primary" },
                ].map(({ icon: Icon, label, sub, color }) => (
                  <div key={label} className="flex items-start gap-3 bg-secondary/40 rounded-xl p-3 border border-border/50">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className={`w-4.5 h-4.5 ${color}`} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-foreground block">{label}</span>
                      <span className="text-[10px] text-muted-foreground">{sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs: Description / Reviews */}
          <div className="mt-14">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b border-border bg-transparent rounded-none h-auto p-0 gap-8">
                <TabsTrigger
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 px-0 text-muted-foreground data-[state=active]:text-primary font-semibold text-base"
                >
                  বিবরণ
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 px-0 text-muted-foreground data-[state=active]:text-primary font-semibold text-base"
                >
                  রিভিউ (12)
                </TabsTrigger>
                <TabsTrigger
                  value="delivery"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-3 px-0 text-muted-foreground data-[state=active]:text-primary font-semibold text-base"
                >
                  ডেলিভারি তথ্য
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="pt-8">
                <div className="max-w-3xl space-y-5 text-muted-foreground">
                  <p className="text-base leading-relaxed">
                    {product.name} ({product.nameBn}) হলো সম্পূর্ণ প্রাকৃতিক ও অর্গানিক উপাদানে তৈরি একটি প্রিমিয়াম মানের স্বাস্থ্য পণ্য। প্রতিটি ব্যাচ সর্বোচ্চ কার্যকারিতা নিশ্চিত করতে যত্ন সহকারে প্রস্তুত করা হয়।
                  </p>
                  <p className="text-base leading-relaxed">
                    আমাদের পণ্যগুলো সম্পূর্ণ প্রাকৃতিক এবং কোনো রাসায়নিক পদার্থ মিশ্রিত নয়। প্রতিটি পণ্য নিজস্ব তত্ত্বাবধানে তৈরি করা হয়।
                  </p>
                  <div>
                    <h3 className="text-foreground font-heading font-bold text-lg mb-3">কেন এই পণ্যটি বেছে নেবেন?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        "১০০% প্রাকৃতিক ও অর্গানিক উপাদান",
                        "কোনো কৃত্রিম প্রিজার্ভেটিভ নেই",
                        "ঐতিহ্যবাহী পদ্ধতিতে হাতে তৈরি",
                        "ল্যাব টেস্টেড মান নিশ্চয়তা",
                        "BSTI অনুমোদিত",
                        "১০০% মানি ব্যাক গ্যারান্টি",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4.5 h-4.5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="pt-8">
                <div className="max-w-3xl space-y-6">
                  {/* Review Summary */}
                  <div className="flex items-center gap-6 bg-secondary/40 rounded-xl p-5 border border-border">
                    <div className="text-center">
                      <span className="text-4xl font-bold text-foreground">4.9</span>
                      <div className="flex gap-0.5 mt-1 justify-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-star fill-star" />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 block">12 রিভিউ</span>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[
                        { stars: 5, count: 10 },
                        { stars: 4, count: 1 },
                        { stars: 3, count: 1 },
                        { stars: 2, count: 0 },
                        { stars: 1, count: 0 },
                      ].map(({ stars, count }) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground w-3">{stars}</span>
                          <Star className="w-3 h-3 text-star fill-star" />
                          <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
                            <div
                              className="h-full bg-star rounded-full transition-all"
                              style={{ width: `${(count / 12) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-4">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews List */}
                  {[
                    { name: "Rahim Ahmed", text: "অসাধারণ পণ্য! সত্যিই কাজ করে। আমি দুই মাস ব্যবহার করেছি এবং ফলাফল দেখে অবাক হয়েছি।", rating: 5, date: "১৫ জানুয়ারি ২০২৫" },
                    { name: "Fatima Begum", text: "খুব ভালো মানের। আবার অর্ডার করবো। পরিবারের সবাই ব্যবহার করছে।", rating: 5, date: "১০ জানুয়ারি ২০২৫" },
                    { name: "Karim Uddin", text: "ডেলিভারি দ্রুত এবং প্যাকেজিং চমৎকার। পণ্যের মান ভালো।", rating: 4, date: "৫ জানুয়ারি ২০২৫" },
                  ].map((review, i) => (
                    <div key={i} className="border border-border rounded-xl p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                            {review.name[0]}
                          </div>
                          <div>
                            <span className="text-sm font-semibold text-foreground block">{review.name}</span>
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, j) => (
                                <Star
                                  key={j}
                                  className={`w-3 h-3 ${j < review.rating ? "text-star fill-star" : "text-muted-foreground"}`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{review.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="delivery" className="pt-8">
                <div className="max-w-3xl space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-border rounded-xl p-5 space-y-2">
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <Truck className="w-5 h-5 text-primary" />
                        ঢাকার ভিতরে
                      </div>
                      <p className="text-2xl font-bold text-price">৳ ৬০</p>
                      <p className="text-sm text-muted-foreground">ডেলিভারি সময়: ১-২ কর্মদিবস</p>
                    </div>
                    <div className="border border-border rounded-xl p-5 space-y-2">
                      <div className="flex items-center gap-2 text-foreground font-semibold">
                        <Truck className="w-5 h-5 text-primary" />
                        ঢাকার বাইরে
                      </div>
                      <p className="text-2xl font-bold text-price">৳ ১২০</p>
                      <p className="text-sm text-muted-foreground">ডেলিভারি সময়: ৩-৫ কর্মদিবস</p>
                    </div>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                    <p className="text-sm text-foreground font-medium">💡 ক্যাশ অন ডেলিভারি (COD) সুবিধা সকল এলাকায় প্রযোজ্য। পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন।</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-12 bg-secondary/30 border-t border-border">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-heading font-bold text-foreground">আরও পণ্য দেখুন</h2>
              <p className="text-sm text-muted-foreground mt-1">আপনার পছন্দ হতে পারে এমন পণ্যসমূহ</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Quick Order Popup */}
      {showQuickOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-background rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-lg font-heading font-bold text-foreground">সরাসরি অর্ডার করুন</h2>
              <button onClick={() => setShowQuickOrder(false)} className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-secondary transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleQuickOrder} className="p-5 space-y-4">
              {/* Product Summary */}
              <div className="flex gap-3 items-center bg-secondary/50 rounded-xl p-3 border border-border/50">
                <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover border border-border" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.nameBn}</p>
                  <p className="text-sm font-bold text-price mt-0.5">
                    {quantity} × ৳ {product.price.toLocaleString()} = ৳ {(product.price * quantity).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">নাম *</label>
                <input
                  value={quickForm.name}
                  onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                  maxLength={100}
                  className="w-full border border-border rounded-xl px-4 py-2.5 bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="আপনার নাম"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">মোবাইল নম্বর *</label>
                <input
                  value={quickForm.phone}
                  onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                  maxLength={15}
                  className="w-full border border-border rounded-xl px-4 py-2.5 bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="01XXXXXXXXX"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">ঠিকানা *</label>
                <textarea
                  value={quickForm.address}
                  onChange={(e) => setQuickForm({ ...quickForm, address: e.target.value })}
                  rows={2}
                  maxLength={300}
                  className="w-full border border-border rounded-xl px-4 py-2.5 bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                  placeholder="আপনার সম্পূর্ণ ঠিকানা"
                  required
                />
              </div>

              {/* Shipping Zone */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">ডেলিভারি এলাকা</label>
                {([
                  { value: "inside_dhaka" as const, label: "ঢাকার ভিতরে", cost: 60 },
                  { value: "outside_dhaka" as const, label: "ঢাকার বাইরে", cost: 120 },
                ]).map((zone) => (
                  <label
                    key={zone.value}
                    className={`flex items-center justify-between cursor-pointer rounded-xl border-2 px-4 py-3 transition-all ${
                      shippingZone === zone.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="quickShipping"
                        checked={shippingZone === zone.value}
                        onChange={() => setShippingZone(zone.value)}
                        className="accent-primary"
                      />
                      <span className="text-sm font-medium text-foreground">{zone.label}</span>
                    </div>
                    <span className="text-sm font-bold text-price">৳ {zone.cost}</span>
                  </label>
                ))}
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">পেমেন্ট পদ্ধতি</label>
                {([
                  { value: "cod" as const, label: "ক্যাশ অন ডেলিভারি" },
                  { value: "bkash" as const, label: "বিকাশ (bKash)" },
                ]).map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center gap-2.5 cursor-pointer rounded-xl border-2 px-4 py-3 transition-all ${
                      paymentMethod === method.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="quickPayment"
                      checked={paymentMethod === method.value}
                      onChange={() => setPaymentMethod(method.value)}
                      className="accent-primary"
                    />
                    <span className="text-sm font-medium text-foreground">{method.label}</span>
                  </label>
                ))}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">নোট (ঐচ্ছিক)</label>
                <input
                  value={quickForm.notes}
                  onChange={(e) => setQuickForm({ ...quickForm, notes: e.target.value })}
                  maxLength={200}
                  className="w-full border border-border rounded-xl px-4 py-2.5 bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="বিশেষ কোনো নির্দেশনা..."
                />
              </div>

              {/* Total */}
              <div className="border-t border-border pt-4 flex justify-between text-lg font-bold text-foreground">
                <span>সর্বমোট</span>
                <span className="text-price">৳ {orderTotal.toLocaleString()}</span>
              </div>

              <button
                type="submit"
                className="w-full gradient-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg text-base"
              >
                অর্ডার কনফার্ম করুন
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default ProductPage;
