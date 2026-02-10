import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRight, ShoppingBag, MapPin, CreditCard, Truck,
  Shield, Clock, MessageSquare, User, Phone, FileText, CheckCircle2
} from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

type ShippingZone = "inside_dhaka" | "outside_dhaka";

const SHIPPING_COSTS: Record<ShippingZone, number> = {
  inside_dhaka: 60,
  outside_dhaka: 120,
};

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [shippingZone, setShippingZone] = useState<ShippingZone>("inside_dhaka");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash">("cod");

  const shippingCost = SHIPPING_COSTS[shippingZone];
  const grandTotal = totalPrice + shippingCost;
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      toast({ title: "দয়া করে সকল তথ্য পূরণ করুন", variant: "destructive" });
      return;
    }
    clearCart();
    navigate("/thank-you");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <TopBar />
        <Header />
        <Navigation />
        <main className="flex-1 flex items-center justify-center pb-16 md:pb-0">
          <div className="text-center space-y-6 max-w-md mx-auto py-20">
            <div className="w-24 h-24 mx-auto rounded-full bg-secondary/80 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground/60" />
            </div>
            <div>
              <p className="text-2xl font-heading font-bold text-foreground">কার্ট খালি!</p>
              <p className="text-muted-foreground mt-2">চেকআউট করতে প্রথমে পণ্য যোগ করুন।</p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 gradient-primary text-primary-foreground font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              শপিং করুন
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Header />
      <Navigation />
      <main className="flex-1 pb-16 md:pb-0">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/60 to-primary/5 border-b border-border">
          <div className="container py-6">
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
              <Link to="/" className="hover:text-primary transition-colors">হোম</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/cart" className="hover:text-primary transition-colors">কার্ট</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">চেকআউট</span>
            </nav>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-md shadow-primary/20">
                <ShoppingBag className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">চেকআউট</h1>
                <p className="text-sm text-muted-foreground">{totalItems}টি পণ্য • সর্বমোট ৳{grandTotal.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Steps indicator */}
        <div className="container py-5">
          <div className="flex items-center justify-center gap-2 text-xs">
            {[
              { step: 1, label: "কার্ট", done: true },
              { step: 2, label: "চেকআউট", active: true },
              { step: 3, label: "সম্পন্ন" },
            ].map((s, i) => (
              <div key={s.step} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                  s.done ? "bg-primary text-primary-foreground" :
                  s.active ? "gradient-primary text-primary-foreground shadow-md shadow-primary/20" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  {s.done ? <CheckCircle2 className="w-4 h-4" /> : s.step}
                </div>
                <span className={`font-medium ${s.active ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
                {i < 2 && <div className={`w-10 md:w-20 h-0.5 rounded-full ${s.done ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="container pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Form Sections */}
            <div className="lg:col-span-2 space-y-5">
              {/* Shipping Info */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <User className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <h2 className="text-base font-heading font-bold text-foreground">ব্যক্তিগত তথ্য</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      নাম <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border-2 border-border rounded-xl pl-10 pr-4 py-3 bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="আপনার পুরো নাম"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      মোবাইল নম্বর <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full border-2 border-border rounded-xl pl-10 pr-4 py-3 bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="01XXXXXXXXX"
                        required
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      সম্পূর্ণ ঠিকানা <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
                      <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border-2 border-border rounded-xl pl-10 pr-4 py-3 bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                        placeholder="বাড়ি নম্বর, রাস্তা, এলাকা, জেলা"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Zone */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Truck className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <h2 className="text-base font-heading font-bold text-foreground">ডেলিভারি এলাকা</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {([
                    { value: "inside_dhaka" as ShippingZone, label: "ঢাকার ভিতরে", sub: "১-২ কর্মদিবস", cost: 60 },
                    { value: "outside_dhaka" as ShippingZone, label: "ঢাকার বাইরে", sub: "৩-৫ কর্মদিবস", cost: 120 },
                  ]).map((zone) => (
                    <label
                      key={zone.value}
                      className={`relative flex items-center gap-4 cursor-pointer rounded-2xl border-2 px-5 py-4 transition-all ${
                        shippingZone === zone.value
                          ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="shippingZone"
                        value={zone.value}
                        checked={shippingZone === zone.value}
                        onChange={() => setShippingZone(zone.value)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        shippingZone === zone.value ? "border-primary bg-primary" : "border-muted-foreground/30"
                      }`}>
                        {shippingZone === zone.value && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-bold text-foreground block">{zone.label}</span>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {zone.sub}
                        </span>
                      </div>
                      <span className="text-base font-bold text-price">৳{zone.cost}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CreditCard className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <h2 className="text-base font-heading font-bold text-foreground">পেমেন্ট পদ্ধতি</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {([
                    { value: "cod" as const, label: "ক্যাশ অন ডেলিভারি", sub: "পণ্য হাতে পেয়ে পেমেন্ট করুন", emoji: "💵" },
                    { value: "bkash" as const, label: "বিকাশ পেমেন্ট", sub: "বিকাশ দিয়ে আগাম পেমেন্ট করুন", emoji: "📱" },
                  ]).map((method) => (
                    <label
                      key={method.value}
                      className={`relative flex items-center gap-4 cursor-pointer rounded-2xl border-2 px-5 py-4 transition-all ${
                        paymentMethod === method.value
                          ? "border-primary bg-primary/5 shadow-sm shadow-primary/10"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={() => setPaymentMethod(method.value)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                        paymentMethod === method.value ? "border-primary bg-primary" : "border-muted-foreground/30"
                      }`}>
                        {paymentMethod === method.value && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-bold text-foreground flex items-center gap-1.5">
                          <span className="text-base">{method.emoji}</span> {method.label}
                        </span>
                        <span className="text-[11px] text-muted-foreground">{method.sub}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-base font-heading font-bold text-foreground">অর্ডার নোট</h2>
                    <p className="text-[11px] text-muted-foreground">ঐচ্ছিক</p>
                  </div>
                </div>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border-2 border-border rounded-xl pl-10 pr-4 py-3 bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    placeholder="বিশেষ কোনো নির্দেশনা থাকলে লিখুন..."
                  />
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="lg:col-span-1">
              <div className="space-y-4 sticky top-24">
                {/* Order Items */}
                <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                  <h3 className="text-base font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-primary" />
                    আপনার অর্ডার ({totalItems}টি পণ্য)
                  </h3>

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div key={`${item.product.id}-${item.variant}`} className="flex gap-3 items-center">
                        <div className="relative flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-14 h-14 rounded-xl object-cover border border-border"
                          />
                          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{item.product.name}</p>
                          {item.variant && (
                            <span className="text-[10px] bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full">{item.variant}</span>
                          )}
                          <p className="text-[11px] text-muted-foreground">
                            ৳{item.product.price.toLocaleString()} × {item.quantity}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-price whitespace-nowrap">
                          ৳{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>সাবটোটাল</span>
                      <span className="font-medium text-foreground">৳{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Truck className="w-3 h-3" /> ডেলিভারি চার্জ
                      </span>
                      <span className="font-medium text-foreground">৳{shippingCost}</span>
                    </div>
                  </div>

                  <div className="border-t-2 border-dashed border-border my-4" />

                  <div className="flex justify-between items-center mb-5">
                    <span className="font-bold text-foreground text-base">সর্বমোট</span>
                    <span className="text-2xl font-bold text-price">৳{grandTotal.toLocaleString()}</span>
                  </div>

                  <button
                    type="submit"
                    className="block w-full gradient-primary text-primary-foreground font-bold py-4 rounded-xl hover:opacity-90 transition-opacity text-center shadow-lg shadow-primary/20 text-base"
                  >
                    অর্ডার কনফার্ম করুন →
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="bg-card border border-border rounded-2xl p-4 shadow-sm">
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { icon: Shield, text: "১০০% নিরাপদ অর্ডার" },
                      { icon: Truck, text: "ক্যাশ অন ডেলিভারি" },
                      { icon: Clock, text: "দ্রুত ডেলিভারি" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <span className="text-xs font-semibold text-foreground">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default CheckoutPage;
