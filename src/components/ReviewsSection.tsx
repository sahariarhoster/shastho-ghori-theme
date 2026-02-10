import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rahim Ahmed",
    text: "শস্থ গড়ি এর প্রোডাক্ট সত্যিই অসাধারণ। মহাবীর খেয়ে আমার শরীরে অনেক শক্তি পাচ্ছি।",
    rating: 5,
  },
  {
    id: 2,
    name: "Fatima Begum",
    text: "খাঁটি মধু পেয়ে খুব খুশি। ডেলিভারি ও অনেক দ্রুত হয়েছে। ধন্যবাদ শস্থ গড়ি।",
    rating: 5,
  },
  {
    id: 3,
    name: "Karim Uddin",
    text: "অর্জুন হার্ট কেয়ার ব্যবহার করছি ২ মাস। রক্তচাপ অনেক ভালো আছে এখন।",
    rating: 5,
  },
  {
    id: 4,
    name: "Nasreen Akter",
    text: "বিটরুট পাউডার চমৎকার। প্রতিদিন সকালে খাচ্ছি, এনার্জি অনেক বেশি পাচ্ছি।",
    rating: 4,
  },
];

const ReviewsSection = () => (
  <section className="py-12 md:py-20 relative overflow-hidden">
    {/* Subtle background pattern */}
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)", backgroundSize: "24px 24px" }} />

    <div className="container relative">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold text-accent uppercase tracking-widest">Testimonials</span>
        <h2 className="section-heading mt-2">Reviews</h2>
        <p className="text-sm text-muted-foreground mt-2">আমাদের সন্তুষ্ট গ্রাহকদের মতামত</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((review, i) => (
          <div
            key={review.id}
            className={`glass-card rounded-xl p-6 relative hover-lift opacity-0 animate-fade-in-up stagger-${i + 1}`}
          >
            <div className="absolute -top-2 -right-2 w-10 h-10 gradient-primary rounded-full flex items-center justify-center shadow-lg">
              <Quote className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < review.rating
                      ? "text-star fill-star"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              "{review.text}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                {review.name.charAt(0)}
              </div>
              <p className="text-sm font-semibold text-foreground">
                {review.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;
