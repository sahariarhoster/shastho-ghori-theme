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
  <section className="py-10 md:py-16">
    <div className="container">
      <h2 className="section-heading mb-10">Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-card border border-border rounded-lg p-6 relative"
          >
            <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
            <div className="flex gap-0.5 mb-3">
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
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {review.text}
            </p>
            <p className="text-sm font-semibold text-foreground">
              {review.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;
