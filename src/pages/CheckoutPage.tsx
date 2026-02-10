import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
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
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header />
        <Navigation />
        <main className="flex-1 flex items-center justify-center pb-16 md:pb-0">
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">আপনার কার্ট খালি</p>
            <Link to="/" className="inline-block bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-md hover:opacity-90">
              শপিং করুন
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
            <Link to="/cart" className="hover:text-primary transition-colors">Cart</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">Checkout</span>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="container pb-12">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">চেকআউট</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Billing/Shipping Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Info */}
              <div className="border border-border rounded-lg p-6 space-y-4">
                <h2 className="text-lg font-heading font-bold text-foreground">শিপিং তথ্য</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">নাম *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full border border-border rounded-md px-4 py-2.5 bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                      placeholder="আপনার নাম"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">মোবাইল নম্বর *</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full border border-border rounded-md px-4 py-2.5 bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
                      placeholder="01XXXXXXXXX"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1">ঠিকানা *</label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border border-border rounded-md px-4 py-2.5 bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none"
                      placeholder="আপনার সম্পূর্ণ ঠিকানা"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Zone */}
              <div className="border border-border rounded-lg p-6 space-y-4">
                <h2 className="text-lg font-heading font-bold text-foreground">ডেলিভারি এলাকা</h2>
                <div className="space-y-2">
                  {([
                    { value: "inside_dhaka" as ShippingZone, label: "ঢাকার ভিতরে (Inside Dhaka)", cost: 60 },
                    { value: "outside_dhaka" as ShippingZone, label: "ঢাকার বাইরে (Outside Dhaka)", cost: 120 },
                  ]).map((zone) => (
                    <label
                      key={zone.value}
                      className={`flex items-center justify-between cursor-pointer rounded-md border px-4 py-3 transition-colors ${
                        shippingZone === zone.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingZone"
                          value={zone.value}
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
              </div>

              {/* Payment Method */}
              <div className="border border-border rounded-lg p-6 space-y-4">
                <h2 className="text-lg font-heading font-bold text-foreground">পেমেন্ট পদ্ধতি</h2>
                <div className="space-y-2">
                  {([
                    { value: "cod" as const, label: "ক্যাশ অন ডেলিভারি (Cash on Delivery)" },
                    { value: "bkash" as const, label: "বিকাশ (bKash)" },
                  ]).map((method) => (
                    <label
                      key={method.value}
                      className={`flex items-center gap-3 cursor-pointer rounded-md border px-4 py-3 transition-colors ${
                        paymentMethod === method.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={() => setPaymentMethod(method.value)}
                        className="accent-primary"
                      />
                      <span className="text-sm font-medium text-foreground">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Notes */}
              <div className="border border-border rounded-lg p-6 space-y-4">
                <h2 className="text-lg font-heading font-bold text-foreground">অর্ডার নোট (ঐচ্ছিক)</h2>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-border rounded-md px-4 py-2.5 bg-background text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors resize-none"
                  placeholder="বিশেষ কোনো নির্দেশনা থাকলে লিখুন..."
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-secondary/30 border border-border rounded-lg p-6 space-y-4 sticky top-24">
                <h3 className="text-lg font-heading font-bold text-foreground">আপনার অর্ডার</h3>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3 items-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-md object-cover border border-border"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity} × ৳ {item.product.price.toLocaleString()}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-price whitespace-nowrap">
                        ৳ {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>সাবটোটাল</span>
                    <span>৳ {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>ডেলিভারি চার্জ</span>
                    <span>৳ {shippingCost}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 flex justify-between text-lg font-bold text-foreground">
                  <span>সর্বমোট</span>
                  <span className="text-price">৳ {grandTotal.toLocaleString()}</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-md hover:opacity-90 transition-opacity text-center"
                >
                  অর্ডার কনফার্ম করুন
                </button>
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
