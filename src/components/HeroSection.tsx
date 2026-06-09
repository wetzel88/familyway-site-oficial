import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import carousel1 from "@/assets/carousel-1.jpg";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.jpg";
import carousel4 from "@/assets/carousel-4.jpg";
import carousel5 from "@/assets/carousel-5.jpg";
import carousel6 from "@/assets/carousel-6.jpg";
import carousel7 from "@/assets/carousel-7.jpg";
import carousel8 from "@/assets/carousel-8.jpg";

const slides = [
  { src: carousel1, alt: "Paris, França" },
  { src: carousel2, alt: "Alpes Suíços" },
  { src: carousel3, alt: "Madrid, Espanha" },
  { src: carousel4, alt: "Rio de Janeiro, Brasil" },
  { src: carousel5, alt: "Fernando de Noronha, Brasil" },
  { src: carousel6, alt: "Ilhas Maldivas" },
  { src: carousel7, alt: "Santiago, Chile" },
  { src: carousel8, alt: "Buenos Aires, Argentina" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
  <>
    <section className="relative mt-20 h-[320px] sm:h-[420px] md:h-[700px] overflow-hidden flex items-end justify-start">

      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            loading={i === 0 ? "eager" : "lazy"}
            width={1920}
            height={1080}
            className="w-full h-full object-cover object-top"
          />
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 text-foreground rounded-full p-2 transition-colors z-20"
        aria-label="Anterior"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/80 text-foreground rounded-full p-2 transition-colors z-20"
        aria-label="Próximo"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-accent scale-125" : "bg-white/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Caixa Desktop */}
      <div className="hidden md:block relative z-10 m-8 mb-16 max-w-md bg-white/35 backdrop-blur-sm rounded-xl p-8 shadow-lg text-left">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
          A agência que nasceu para fazer diferente
        </h1>

        <p className="text-xl text-foreground/80 mb-6 font-body font-bold">
          Você viaja. Nossa família cuida.
        </p>

        <Button
          variant="cta"
          size="lg"
          className="text-lg px-8 py-5"
          asChild
        >
          <a href="#contato">Fale com a gente</a>
        </Button>
      </div>
    </section>

    {/* Seção exclusiva para celular */}
    <section className="md:hidden bg-primary text-primary-foreground py-6 px-6 text-center">
      <h1 className="font-heading text-2xl font-bold mb-3 leading-tight">
        A agência que nasceu para fazer diferente
      </h1>

      <p className="text-lg font-semibold mb-5">
        Você viaja. Nossa família cuida.
      </p>

      <Button
        variant="cta"
        size="lg"
        className="w-full max-w-xs mx-auto"
        asChild
      >
        <a href="#contato">Fale com a gente</a>
      </Button>
    </section>
  </>
);
}

export default HeroSection;
