import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Minus, Plus, Trash2, ShoppingCart, Tag, CheckCircle2, Truck,
  Shield, ArrowRight, Gift, Sparkles, Package, Clock, ChevronRight
} from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const COUPONS: Record<string, { discount: number; type: "percent" | "fixed"; label: string }> = {
  SAVE10: { discount: 10, type: "percent", label: "১০% ছাড়" },
  FLAT100: { discount: 100, type: "fixed", label: "৳১০০ ছাড়" },
  WELCOME: { discount: 15, type: "percent", label: "১৫% ছাড়" },
};

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const activeCoupon = appliedCoupon ? COUPONS[appliedCoupon] : null;
  const couponDiscount = activeCoupon
    ? activeCoupon.type === "percent"
      ? Math.round(totalPrice * (activeCoupon.discount / 100))
      : activeCoupon.discount
    : 0;
  const finalTotal = Math.max(0, totalPrice - couponDiscount);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const freeShippingThreshold = 1500;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      toast({ title: "কুপন প্রয়োগ হয়েছে! 🎉", description: COUPONS[code].label });
    } else {
      toast({ title: "ভুল কুপন কোড", description: "সঠিক কুপন কোড দিন", variant: "destructive" });
    }
    setCouponCode("");
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast({ title: "কুপন সরানো হয়েছে" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Header />
      <Navigation />
      <main className="flex-1 pb-16 md:pb-0">
        {/* Page Header with breadcrumb */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/60 to-primary/5 border-b border-border">
          <div className="container py-6">
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
              <Link to="/" className="hover:text-primary transition-colors">হোম</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">শপিং কার্ট</span>
            </nav>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-md shadow-primary/20">
                <ShoppingCart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  শপিং কার্ট
                </h1>
                {items.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {totalItems}টি পণ্য কার্টে আছে
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container py-8">
          {items.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20 max-w-md mx-auto space-y-6">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 rounded-full bg-secondary/60 animate-pulse" />
                <div className="relative w-full h-full rounded-full bg-secondary/80 flex items-center justify-center">
                  <ShoppingCart className="w-14 h-14 text-muted-foreground/60" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-heading font-bold text-foreground">কার্ট খালি!</p>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  আপনার কার্টে কোনো পণ্য নেই। আমাদের অর্গানিক পণ্যগুলো দেখুন এবং আপনার পছন্দের পণ্য যোগ করুন।
                </p>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 text-base"
              >
                শপিং শুরু করুন
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">


                {/* Items header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">
                    কার্টের পণ্যসমূহ ({totalItems})
                  </h3>
                </div>

                {/* Item Cards */}
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.variant}`}
                    className={`bg-card border border-border rounded-2xl p-5 flex gap-5 items-start hover:shadow-md transition-all duration-300 opacity-0 animate-fade-in stagger-${index + 1}`}
                  >
                    {/* Image with badge */}
                    <Link to={`/product/${item.product.id}`} className="flex-shrink-0 relative group">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-28 h-28 object-cover rounded-2xl border border-border group-hover:shadow-md transition-shadow"
                      />
                      {item.product.discount && item.product.discount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-lg shadow">
                          -{item.product.discount}%
                        </span>
                      )}
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            to={`/product/${item.product.id}`}
                            className="text-base font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.product.nameBn}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            {item.variant && (
                              <span className="text-[11px] bg-primary/10 text-primary font-semibold px-2.5 py-0.5 rounded-full">
                                {item.variant}
                              </span>
                            )}
                            <span className="text-[11px] bg-secondary text-muted-foreground font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-primary" /> স্টকে আছে
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all flex-shrink-0"
                          title="সরিয়ে ফেলুন"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <div className="flex items-center bg-secondary/50 rounded-xl overflow-hidden border border-border">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2.5 text-foreground hover:bg-secondary transition-colors active:scale-95"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-5 text-sm font-bold text-foreground min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2.5 text-foreground hover:bg-secondary transition-colors active:scale-95"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-lg font-bold text-price">
                            ৳ {(item.product.price * item.quantity).toLocaleString()}
                          </span>
                          {item.quantity > 1 && (
                            <p className="text-[11px] text-muted-foreground">
                              ৳ {item.product.price.toLocaleString()} × {item.quantity}
                            </p>
                          )}
                          {item.product.originalPrice && item.product.discount && (
                            <p className="text-[11px] text-primary font-medium">
                              ৳ {((item.product.originalPrice - item.product.price) * item.quantity).toLocaleString()} সেভ
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Continue Shopping */}
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-semibold mt-3 group"
                >
                  <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  আরও পণ্য দেখুন
                </Link>
              </div>

              {/* Cart Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="space-y-4 sticky top-24">
                  {/* Coupon Card */}
                  <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Tag className="w-4 h-4 text-primary" />
                      </div>
                      <h3 className="text-sm font-bold text-foreground">কুপন কোড</h3>
                    </div>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-primary/5 border-2 border-primary/20 rounded-xl px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-primary block">{appliedCoupon}</span>
                            <span className="text-[11px] text-muted-foreground">{activeCoupon?.label}</span>
                          </div>
                        </div>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-xs text-destructive hover:underline font-semibold bg-destructive/10 px-2.5 py-1 rounded-lg"
                        >
                          সরান
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                            placeholder="কুপন কোড লিখুন"
                            maxLength={20}
                            className="flex-1 border-2 border-border rounded-xl px-3.5 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
                          />
                          <button
                            onClick={handleApplyCoupon}
                            className="gradient-primary text-primary-foreground text-sm font-bold px-5 rounded-xl hover:opacity-90 transition-opacity shadow-sm"
                          >
                            প্রয়োগ
                          </button>
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                          ট্রাই করুন: SAVE10, FLAT100, WELCOME
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Order Summary Card */}
                  <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                    <h3 className="text-base font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      অর্ডার সারাংশ
                    </h3>

                    {/* Price Breakdown */}
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between text-muted-foreground">
                        <span>সাবটোটাল ({totalItems}টি পণ্য)</span>
                        <span className="font-medium text-foreground">৳ {totalPrice.toLocaleString()}</span>
                      </div>
                      {couponDiscount > 0 && (
                        <div className="flex justify-between text-primary">
                          <span className="flex items-center gap-1">
                            <Tag className="w-3 h-3" /> কুপন ছাড়
                          </span>
                          <span className="font-bold">- ৳ {couponDiscount.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Truck className="w-3 h-3" /> ডেলিভারি
                        </span>
                        <span className="text-xs font-medium bg-secondary px-2 py-0.5 rounded-full">
                          চেকআউটে
                        </span>
                      </div>
                    </div>

                    <div className="border-t-2 border-dashed border-border my-4" />

                    <div className="flex justify-between items-center mb-5">
                      <span className="font-bold text-foreground text-base">সর্বমোট</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-price">৳ {finalTotal.toLocaleString()}</span>
                        {couponDiscount > 0 && (
                          <p className="text-[11px] text-primary font-medium">
                            ৳ {couponDiscount.toLocaleString()} সেভ হচ্ছে!
                          </p>
                        )}
                      </div>
                    </div>

                    <Link
                      to="/checkout"
                      className="block w-full gradient-primary text-primary-foreground font-bold py-4 rounded-xl hover:opacity-90 transition-opacity text-center shadow-lg shadow-primary/20 text-base animate-pulse-glow"
                    >
                      চেকআউট করুন →
                    </Link>

                    <Link
                      to="/"
                      className="block text-center text-sm text-muted-foreground hover:text-primary font-medium mt-3 transition-colors"
                    >
                      শপিং চালিয়ে যান
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default CartPage;
