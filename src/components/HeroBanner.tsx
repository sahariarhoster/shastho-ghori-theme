import heroBanner from "@/assets/hero-banner.jpg";

const HeroBanner = () => (
  <section className="w-full">
    <div className="container py-4">
      <div className="rounded-lg overflow-hidden">
        <img
          src={heroBanner}
          alt="Shastho Gori - Organic Health Products"
          className="w-full h-[250px] md:h-[450px] lg:h-[550px] object-cover"
          loading="eager"
        />
      </div>
    </div>
  </section>
);

export default HeroBanner;
