import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Handshake, Heart } from "lucide-react";

const pillars = [
  {
    icon: Shield,
    title: "Segurança",
    description:
      "Você nunca será surpreendido por algo que a gente sabia e não contou. Acompanhamos cada etapa da sua viagem.",
  },
  {
    icon: Handshake,
    title: "Honestidade",
    description:
      "O que está incluso, o que não está, o que pode acontecer — você saberá antes, não depois. Sem letras miúdas.",
  },
  {
    icon: Heart,
    title: "Empatia",
    description:
      "A gente entende o que é viajar com família. Essa experiência está em cada decisão que tomamos pelo nosso cliente.",
  },
];

const Pillars = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pilares" className="py-20 md:py-28 bg-muted">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.h2
          className="font-heading text-3xl md:text-5xl font-bold text-foreground text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Por que escolher a FamilyWay?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="bg-card rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-6">
                <pillar.icon className="text-accent" size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pillars;
