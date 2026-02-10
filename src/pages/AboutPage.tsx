import { Link } from "react-router-dom";
import { ChevronRight, Leaf, Heart, Shield, Users, Target, Eye } from "lucide-react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

const AboutPage = () => {
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
              <span className="text-foreground font-medium">আমাদের সম্পর্কে</span>
            </nav>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-md shadow-primary/20">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">আমাদের সম্পর্কে</h1>
                <p className="text-sm text-muted-foreground">স্বাস্থ্যগড়ি — প্রকৃতির শক্তিতে সুস্থ জীবন</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container py-10 space-y-14">
          {/* Brand Story */}
          <section className="max-w-3xl mx-auto text-center space-y-4 opacity-0 animate-fade-in-up">
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground">আমাদের গল্প</h2>
            <p className="text-muted-foreground leading-relaxed">
              স্বাস্থ্যগড়ি একটি বাংলাদেশি অর্গানিক ও প্রাকৃতিক পণ্যের ব্র্যান্ড। আমরা বিশ্বাস করি, সুস্থ জীবনযাপনের চাবিকাঠি লুকিয়ে আছে প্রকৃতির মাঝে। আমাদের প্রতিটি পণ্য সম্পূর্ণ প্রাকৃতিক উপাদান থেকে তৈরি, কোনো রাসায়নিক বা ক্ষতিকর উপাদান ছাড়া।
            </p>
            <p className="text-muted-foreground leading-relaxed">
              আমাদের যাত্রা শুরু হয়েছিল একটি সাধারণ লক্ষ্য নিয়ে — বাংলাদেশের মানুষের কাছে খাঁটি, ভেষজ ও অর্গানিক পণ্য সহজলভ্য করা। আজ আমরা গর্বিত যে হাজারো পরিবার আমাদের পণ্য ব্যবহার করে সুস্থ জীবনযাপন করছেন।
            </p>
          </section>

          {/* Mission & Vision */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-2xl p-7 shadow-sm opacity-0 animate-fade-in-up stagger-1">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground mb-3">আমাদের মিশন</h3>
              <p className="text-muted-foreground leading-relaxed">
                বাংলাদেশের প্রতিটি ঘরে খাঁটি ও প্রাকৃতিক পণ্য পৌঁছে দেওয়া এবং রাসায়নিকমুক্ত জীবনযাপনে মানুষকে উৎসাহিত করা। আমরা চাই প্রতিটি পরিবার সুস্থ ও নিরাপদ খাদ্যাভ্যাস গড়ে তুলুক।
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-7 shadow-sm opacity-0 animate-fade-in-up stagger-2">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground mb-3">আমাদের ভিশন</h3>
              <p className="text-muted-foreground leading-relaxed">
                বাংলাদেশের সবচেয়ে বিশ্বস্ত অর্গানিক ব্র্যান্ড হিসেবে নিজেদের প্রতিষ্ঠিত করা। আমরা স্বপ্ন দেখি এমন একটি সমাজের যেখানে প্রাকৃতিক চিকিৎসা ও স্বাস্থ্যকর জীবনধারা সবার নাগালে থাকবে।
              </p>
            </div>
          </section>

          {/* Values */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground text-center mb-8">
              আমাদের মূল্যবোধ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Leaf, title: "১০০% প্রাকৃতিক", desc: "সম্পূর্ণ প্রাকৃতিক উপাদান, কোনো রাসায়নিক নেই" },
                { icon: Heart, title: "গ্রাহক প্রথম", desc: "গ্রাহকের সন্তুষ্টি আমাদের সর্বোচ্চ অগ্রাধিকার" },
                { icon: Shield, title: "গুণগত মান", desc: "প্রতিটি পণ্য কঠোর মান নিয়ন্ত্রণের মধ্য দিয়ে যায়" },
                { icon: Users, title: "সমাজসেবা", desc: "স্থানীয় কৃষকদের সাথে কাজ করে অর্থনীতি শক্তিশালী করা" },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div
                  key={title}
                  className={`bg-card border border-border rounded-2xl p-6 text-center shadow-sm opacity-0 animate-fade-in-up stagger-${i + 1}`}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground mb-1.5">{title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats */}
          <section className="bg-gradient-to-r from-primary/5 via-secondary/60 to-primary/5 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { number: "৫০০০+", label: "সন্তুষ্ট গ্রাহক" },
                { number: "১০০+", label: "অর্গানিক পণ্য" },
                { number: "৬৪", label: "জেলায় ডেলিভারি" },
                { number: "৪.৮★", label: "গড় রেটিং" },
              ].map(({ number, label }) => (
                <div key={label}>
                  <p className="text-2xl md:text-3xl font-heading font-bold text-primary">{number}</p>
                  <p className="text-sm text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default AboutPage;
