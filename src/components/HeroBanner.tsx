import heroBanner from "@/assets/hero-banner.png";

const HeroBanner = () => (
  <section className="w-full">
    <div className="container py-4">
      <div className="rounded-xl overflow-hidden">
        <img
          src={heroBanner}
          alt="Shastho Gori - Organic Health Products"
          className="w-full h-auto object-cover"
          loading="eager"
        />
      </div>
    </div>
  </section>
);

export default HeroBanner;
