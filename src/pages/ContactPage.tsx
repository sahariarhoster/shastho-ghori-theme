import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, MessageCircle, Phone, Mail, MapPin, Clock, Send, User
} from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      toast({ title: "সকল তথ্য পূরণ করুন", variant: "destructive" });
      return;
    }
    const msg = `📩 *যোগাযোগ বার্তা*\n\n👤 নাম: ${form.name}\n📞 ফোন: ${form.phone}\n💬 বার্তা: ${form.message}`;
    window.open(`https://wa.me/8801XXXXXXXXX?text=${encodeURIComponent(msg)}`, "_blank");
    toast({ title: "বার্তা পাঠানো হচ্ছে! ✅" });
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Header />
      <Navigation />
      <main className="flex-1 pb-16 md:pb-0">
        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/60 to-primary/5 border-b border-border">
          <div className="container py-8">
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
              <Link to="/" className="hover:text-primary transition-colors">হোম</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground font-medium">যোগাযোগ</span>
            </nav>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-md shadow-primary/20">
                <MessageCircle className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">যোগাযোগ করুন</h1>
                <p className="text-sm text-muted-foreground">আমরা আপনার সেবায় সর্বদা প্রস্তুত</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-5">
              <h2 className="text-lg font-heading font-bold text-foreground">যোগাযোগের মাধ্যম</h2>

              {[
                { icon: Phone, title: "ফোন", value: "০১XXXXXXXXX", sub: "সকাল ১০টা - রাত ১০টা", href: "tel:+8801XXXXXXXXX" },
                { icon: MessageCircle, title: "হোয়াটসঅ্যাপ", value: "০১XXXXXXXXX", sub: "সরাসরি মেসেজ করুন", href: "https://wa.me/8801XXXXXXXXX" },
                { icon: Mail, title: "ইমেইল", value: "info@shasthogori.com", sub: "২৪ ঘণ্টার মধ্যে উত্তর", href: "mailto:info@shasthogori.com" },
                { icon: MapPin, title: "ঠিকানা", value: "ঢাকা, বাংলাদেশ", sub: "অফিস সময়ে আসুন" },
              ].map(({ icon: Icon, title, value, sub, href }, i) => (
                <div
                  key={title}
                  className={`bg-card border border-border rounded-2xl p-5 flex items-start gap-4 shadow-sm opacity-0 animate-fade-in-up stagger-${i + 1}`}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm">{title}</h3>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold text-sm hover:underline">
                        {value}
                      </a>
                    ) : (
                      <p className="text-foreground font-semibold text-sm">{value}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}

              {/* Business Hours */}
              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-foreground text-sm">কর্মসময়</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">শনিবার - বৃহস্পতিবার</span>
                    <span className="font-semibold text-foreground">সকাল ১০টা - রাত ১০টা</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">শুক্রবার</span>
                    <span className="font-semibold text-primary">বিকাল ৩টা - রাত ১০টা</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-2xl p-7 shadow-sm opacity-0 animate-fade-in-up stagger-2">
                <h2 className="text-lg font-heading font-bold text-foreground mb-1">বার্তা পাঠান</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  আপনার প্রশ্ন বা পরামর্শ জানান, আমরা দ্রুত উত্তর দেব
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                          maxLength={100}
                          className="w-full border-2 border-border rounded-xl pl-10 pr-4 py-3 bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="আপনার নাম"
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
                          maxLength={15}
                          className="w-full border-2 border-border rounded-xl pl-10 pr-4 py-3 bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                          placeholder="01XXXXXXXXX"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      বার্তা <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <MessageCircle className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        maxLength={1000}
                        rows={5}
                        className="w-full border-2 border-border rounded-xl pl-10 pr-4 py-3 bg-background text-foreground text-sm placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                        placeholder="আপনার প্রশ্ন বা বার্তা লিখুন..."
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="gradient-primary text-primary-foreground font-bold py-3.5 px-8 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    বার্তা পাঠান
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default ContactPage;
