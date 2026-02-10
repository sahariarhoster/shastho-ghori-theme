import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <Navigation />
      <main className="flex-1 pb-16 md:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-8">
            শপিং কার্ট
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground" />
              <p className="text-lg text-muted-foreground">আপনার কার্ট খালি</p>
              <Link
                to="/"
                className="inline-block bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
              >
                শপিং চালিয়ে যান
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {/* Table Header - Desktop */}
                <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-semibold text-muted-foreground border-b border-border pb-3">
                  <span className="col-span-6">পণ্য</span>
                  <span className="col-span-2 text-center">দাম</span>
                  <span className="col-span-2 text-center">পরিমাণ</span>
                  <span className="col-span-2 text-right">মোট</span>
                </div>

                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="grid grid-cols-12 gap-4 items-center border-b border-border pb-4"
                  >
                    {/* Product */}
                    <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-md border border-border"
                      />
                      <div>
                        <Link
                          to={`/product/${item.product.id}`}
                          className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">{item.product.nameBn}</p>
                        {item.variant && (
                          <span className="text-xs text-muted-foreground">Size: {item.variant}</span>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-4 md:col-span-2 text-center text-sm text-foreground">
                      ৳ {item.product.price.toLocaleString()}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-4 md:col-span-2 flex items-center justify-center">
                      <div className="flex items-center border border-border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 text-foreground hover:bg-secondary transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-sm font-medium text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-foreground hover:bg-secondary transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal & Remove */}
                    <div className="col-span-4 md:col-span-2 flex items-center justify-end gap-2">
                      <span className="text-sm font-bold text-price">
                        ৳ {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="lg:col-span-1">
                <div className="bg-secondary/30 border border-border rounded-lg p-6 space-y-4 sticky top-24">
                  <h3 className="text-lg font-heading font-bold text-foreground">অর্ডার সারাংশ</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>সাবটোটাল</span>
                      <span>৳ {totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>ডেলিভারি চার্জ</span>
                      <span className="text-xs">চেকআউটে নির্ধারণ হবে</span>
                    </div>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between font-bold text-foreground">
                    <span>মোট</span>
                    <span className="text-price">৳ {totalPrice.toLocaleString()}</span>
                  </div>
                  <Link
                    to="/checkout"
                    className="block w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-md hover:opacity-90 transition-opacity text-center"
                  >
                    চেকআউট করুন
                  </Link>
                  <Link
                    to="/"
                    className="block text-center text-sm text-primary hover:underline"
                  >
                    শপিং চালিয়ে যান
                  </Link>
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
