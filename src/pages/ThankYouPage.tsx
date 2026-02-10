import { Link } from "react-router-dom";
import { CheckCircle, Home, Phone } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <Navigation />
      <main className="flex-1 pb-16 md:pb-0 flex items-center justify-center">
        <div className="container max-w-lg text-center py-16 space-y-6">
          <CheckCircle className="w-20 h-20 text-primary mx-auto" />
          <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            অর্ডার সফল হয়েছে! 🎉
          </h1>
          <p className="text-muted-foreground">
            আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো এবং পণ্য পৌঁছে দেবো।
          </p>
          <div className="bg-secondary/30 border border-border rounded-lg p-5 space-y-2 text-sm text-muted-foreground">
            <p>যেকোনো প্রশ্নে আমাদের সাথে যোগাযোগ করুন:</p>
            <a href="tel:+8801XXXXXXXXX" className="flex items-center justify-center gap-2 text-primary font-semibold hover:underline">
              <Phone className="w-4 h-4" />
              01XXXXXXXXX
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-md hover:opacity-90 transition-opacity"
            >
              <Home className="w-4 h-4" />
              হোমপেইজে যান
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default ThankYouPage;
