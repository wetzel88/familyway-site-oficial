import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import carousel1 from "@/assets/carousel-1.jpg";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.png";
import carousel4 from "@/assets/carousel-4.jpg";
import carousel5 from "@/assets/carousel-5.jpg";
import carousel6 from "@/assets/carousel-6.jpg";
import carousel7 from "@/assets/carousel-7.jpg";
import carousel8 from "@/assets/carousel-8.jpg";

const slides = [
  { src: carousel1, alt: "Paris, França", caption: "A cidade luz espera por você" },
  { src: carousel2, alt: "Alpes Suíços", caption: "Montanhas de tirar o fôlego" },
  { src: carousel3, alt: "Madrid, Espanha", caption: "Arte, cultura e gastronomia" },
  { src: carousel4, alt: "Rio de Janeiro, Brasil", caption: "Cidade maravilhosa" },
  { src: carousel5, alt: "Fernando de Noronha, Brasil", caption: "Paraíso tropical brasileiro" },
  { src: carousel6, alt: "Ilhas Maldivas", caption: "O paraíso na terra" },
  { src: carousel7, alt: "Santiago, Chile", caption: "Entre montanhas e modernidade" },
  { src: carousel8, alt: "Buenos Aires, Argentina", caption: "Paixão e cultura portenha" },
];

const ImageCarousel = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-xl shadow-2xl aspect-[16/9] max-w-5xl mx-auto">
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
                loading="lazy"
                width={1280}
                height={720}
                className="w-full h-full object-cover"
              />
              {slide.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary/80 to-transparent p-6">
                  <p className="text-primary-foreground text-lg font-medium text-center">
                    {slide.caption}
                  </p>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary/50 hover:bg-primary/80 text-primary-foreground rounded-full p-2 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary/50 hover:bg-primary/80 text-primary-foreground rounded-full p-2 transition-colors"
            aria-label="Próximo"
          >
            <ChevronRight size={28} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === current ? "bg-accent scale-125" : "bg-primary-foreground/50"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
