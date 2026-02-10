import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingCart, Tag, CheckCircle2, Truck, Shield, ArrowRight } from "lucide-react";
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
        {/* Page Header */}
        <div className="bg-secondary/40 border-b border-border">
          <div className="container py-5">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              শপিং কার্ট
            </h1>
            {items.length > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                আপনার কার্টে {items.reduce((s, i) => s + i.quantity, 0)}টি পণ্য রয়েছে
              </p>
            )}
          </div>
        </div>

        <div className="container py-8">
          {items.length === 0 ? (
            <div className="text-center py-20 space-y-5">
              <div className="w-24 h-24 mx-auto rounded-full bg-secondary/60 flex items-center justify-center">
                <ShoppingCart className="w-12 h-12 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xl font-heading font-semibold text-foreground">আপনার কার্ট খালি</p>
                <p className="text-sm text-muted-foreground mt-1">আকর্ষণীয় পণ্য দেখতে শপিং শুরু করুন</p>
              </div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-md"
              >
                শপিং শুরু করুন
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.variant}`}
                    className="bg-card border border-border rounded-xl p-4 flex gap-4 items-start hover:shadow-sm transition-shadow"
                  >
                    {/* Image */}
                    <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-xl border border-border"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            to={`/product/${item.product.id}`}
                            className="text-sm font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-muted-foreground">{item.product.nameBn}</p>
                          {item.variant && (
                            <span className="inline-block mt-1 text-[10px] bg-primary/10 text-primary font-medium px-2 py-0.5 rounded-full">
                              সাইজ: {item.variant}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity */}
                        <div className="flex items-center border border-border rounded-xl overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 text-foreground hover:bg-secondary transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-4 text-sm font-bold text-foreground border-x border-border">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 text-foreground hover:bg-secondary transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-base font-bold text-price">
                            ৳ {(item.product.price * item.quantity).toLocaleString()}
                          </span>
                          {item.quantity > 1 && (
                            <p className="text-[10px] text-muted-foreground">
                              ৳ {item.product.price.toLocaleString()} × {item.quantity}
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
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium mt-2"
                >
                  ← আরও পণ্য দেখুন
                </Link>
              </div>

              {/* Cart Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-2xl p-6 space-y-5 sticky top-24 shadow-sm">
                  <h3 className="text-lg font-heading font-bold text-foreground">অর্ডার সারাংশ</h3>

                  {/* Coupon Code */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-primary" />
                      কুপন কোড
                    </label>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <div>
                            <span className="text-sm font-bold text-primary">{appliedCoupon}</span>
                            <span className="text-xs text-muted-foreground ml-1.5">({activeCoupon?.label})</span>
                          </div>
                        </div>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-xs text-destructive hover:underline font-medium"
                        >
                          সরান
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                          placeholder="কুপন কোড লিখুন"
                          maxLength={20}
                          className="flex-1 border border-border rounded-xl px-3 py-2.5 text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                        <button
                          onClick={handleApplyCoupon}
                          className="bg-primary text-primary-foreground text-sm font-semibold px-4 rounded-xl hover:opacity-90 transition-opacity"
                        >
                          প্রয়োগ
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>সাবটোটাল ({items.reduce((s, i) => s + i.quantity, 0)} পণ্য)</span>
                      <span>৳ {totalPrice.toLocaleString()}</span>
                    </div>
                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-primary font-medium">
                        <span>কুপন ছাড়</span>
                        <span>- ৳ {couponDiscount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-muted-foreground">
                      <span>ডেলিভারি চার্জ</span>
                      <span className="text-xs">চেকআউটে নির্ধারণ হবে</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4 flex justify-between items-center">
                    <span className="font-bold text-foreground text-base">সর্বমোট</span>
                    <span className="text-2xl font-bold text-price">৳ {finalTotal.toLocaleString()}</span>
                  </div>

                  <Link
                    to="/checkout"
                    className="block w-full gradient-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity text-center shadow-md text-base"
                  >
                    চেকআউট করুন
                  </Link>

                  {/* Trust Info */}
                  <div className="space-y-2.5 pt-2">
                    {[
                      { icon: Shield, text: "১০০% নিরাপদ পেমেন্ট" },
                      { icon: Truck, text: "সারাদেশে ক্যাশ অন ডেলিভারি" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span>{text}</span>
                      </div>
                    ))}
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
