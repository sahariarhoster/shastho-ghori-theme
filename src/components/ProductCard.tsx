import { useState } from "react";
import { Heart, Eye, ShoppingCart, Minus, Plus, Send, User, Phone, MapPin, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/data/products";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ProductCard = ({ product }: { product: Product }) => {
  const hasDiscount = product.discount && product.discount > 0;
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product.variants?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [shippingZone, setShippingZone] = useState<"inside_dhaka" | "outside_dhaka">("inside_dhaka");

  const shippingCost = shippingZone === "inside_dhaka" ? 60 : 120;
  const handleOrder = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast({ title: "সকল তথ্য পূরণ করুন", variant: "destructive" });
      return;
    }

    const subtotal = product.price * quantity;
    const total = subtotal + shippingCost;
    const variantText = selectedVariant ? `\nসাইজ: ${selectedVariant}` : "";
    const shippingText = shippingZone === "inside_dhaka" ? "ঢাকার ভিতরে (৳60)" : "ঢাকার বাইরে (৳120)";
    const message = `🛒 *নতুন অর্ডার*\n\n📦 পণ্য: ${product.name} (${product.nameBn})${variantText}\n🔢 পরিমাণ: ${quantity}\n💰 সাবটোটাল: ৳${subtotal.toLocaleString()}\n🚚 ডেলিভারি: ${shippingText}\n💵 সর্বমোট: ৳${total.toLocaleString()}\n\n👤 নাম: ${name}\n📞 ফোন: ${phone}\n📍 ঠিকানা: ${address}`;

    const whatsappUrl = `https://wa.me/8801XXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    toast({ title: "অর্ডার পাঠানো হচ্ছে! ✅", description: product.name });
    setOrderOpen(false);
    setQuantity(1);
    setName("");
    setPhone("");
    setAddress("");
  };

  return (
    <>
      <div className="group bg-card rounded-xl border border-border overflow-hidden hover-lift flex flex-col h-full">
        {/* Image */}
        <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
          {hasDiscount && (
            <span className="absolute top-3 left-3 z-10 bg-sale text-sale-foreground text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
              -{product.discount}%
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4 gap-2">
            <button className="bg-card/90 backdrop-blur-sm text-foreground p-2.5 rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 translate-y-4 group-hover:translate-y-0">
              <Heart className="w-4 h-4" />
            </button>
            <button className="bg-card/90 backdrop-blur-sm text-foreground p-2.5 rounded-full shadow-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 translate-y-4 group-hover:translate-y-0 delay-75">
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </Link>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <p className="text-[10px] text-accent font-semibold uppercase tracking-wider mb-1">{product.category}</p>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-semibold text-card-foreground mb-0.5 line-clamp-1 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground mb-2">{product.nameBn}</p>

          {product.variants && (
            <div className="flex gap-1 mb-2 flex-wrap">
              {product.variants.map((v) => (
                <span
                  key={v}
                  className="text-[10px] border border-primary/20 rounded-full px-2 py-0.5 text-primary font-medium"
                >
                  {v}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 mb-3 mt-auto pt-2">
            {hasDiscount && product.originalPrice && (
              <span className="text-xs text-price-old line-through">
                ৳ {product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-base font-bold text-price">
              ৳ {product.price.toLocaleString()}
            </span>
          </div>

          {/* Two Buttons */}
          <div className="flex flex-col gap-2">
            <Link
              to={`/product/${product.id}`}
              className="flex-1 border border-primary text-primary text-sm font-semibold py-2.5 rounded-lg hover:bg-primary/5 transition-colors text-center"
            >
              ডিটেইলস দেখুন
            </Link>
            <button
              onClick={() => setOrderOpen(true)}
              className="flex-1 gradient-primary text-primary-foreground text-sm font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-sm flex items-center justify-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              অর্ডার করুন
            </button>
          </div>
        </div>
      </div>

      {/* Order Popup Dialog */}
      <Dialog open={orderOpen} onOpenChange={setOrderOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-heading">অর্ডার করুন</DialogTitle>
          </DialogHeader>
          <div className="flex gap-4 mt-2">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 rounded-lg object-cover border border-border"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-card-foreground">{product.name}</h4>
              <p className="text-sm text-muted-foreground">{product.nameBn}</p>
              <div className="flex items-center gap-2 mt-1">
                {hasDiscount && product.originalPrice && (
                  <span className="text-xs text-price-old line-through">
                    ৳ {product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-lg font-bold text-price">
                  ৳ {product.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Variant Selection */}
          {product.variants && product.variants.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-foreground mb-2">সাইজ নির্বাচন করুন</p>
              <div className="flex gap-2 flex-wrap">
                {product.variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={`text-sm px-4 py-1.5 rounded-full border font-medium transition-colors ${
                      selectedVariant === v
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mt-4">
            <p className="text-sm font-medium text-foreground mb-2">পরিমাণ</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mt-4 space-y-3">
            <p className="text-sm font-medium text-foreground">আপনার তথ্য দিন</p>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="আপনার নাম"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="tel"
                placeholder="মোবাইল নম্বর"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={15}
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <textarea
                placeholder="সম্পূর্ণ ঠিকানা"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                maxLength={300}
                rows={2}
                className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
              />
            </div>
          </div>

          {/* Shipping Zone */}
          <div className="mt-4">
            <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-primary" /> ডেলিভারি এলাকা
            </p>
            <div className="grid grid-cols-2 gap-2">
              {([
                { value: "inside_dhaka" as const, label: "ঢাকার ভিতরে", cost: "৳60" },
                { value: "outside_dhaka" as const, label: "ঢাকার বাইরে", cost: "৳120" },
              ]).map((zone) => (
                <button
                  key={zone.value}
                  type="button"
                  onClick={() => setShippingZone(zone.value)}
                  className={`rounded-xl border-2 px-3 py-2.5 text-left transition-all ${
                    shippingZone === zone.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <span className="text-sm font-semibold text-foreground block">{zone.label}</span>
                  <span className="text-xs text-muted-foreground">{zone.cost}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Total & Order */}
          <div className="mt-5 pt-4 border-t border-border">
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>সাবটোটাল</span>
                <span>৳{(product.price * quantity).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>ডেলিভারি চার্জ</span>
                <span>৳{shippingCost}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-dashed border-border">
                <span className="font-bold text-foreground">সর্বমোট</span>
                <span className="text-xl font-bold text-price">
                  ৳{(product.price * quantity + shippingCost).toLocaleString()}
                </span>
              </div>
            </div>
            <button
              onClick={handleOrder}
              className="w-full gradient-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md"
            >
              <Send className="w-4 h-4" />
              সরাসরি অর্ডার করুন
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
