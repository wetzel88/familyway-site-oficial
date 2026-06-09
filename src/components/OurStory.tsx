import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const OurStory = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="historia" className="bg-primary py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground text-center mb-12">
            Nossa História
          </h2>
          <div className="space-y-6 text-primary-foreground/90 text-lg leading-relaxed font-body text-justify">
            <p>
              Estávamos começando uma nova vida — mudando de país, com 2 filhas, e com tudo que isso representa. Para tornar o
              processo um pouco mais leve, contratamos uma agência de viagens para cuidar das nossas passagens e nos assessorar
              com as dúvidas que poderiam surgir. A lógica era simples: delegar para quem entende, e assim ter uma preocupação a menos.
            </p>
            <p>
              O que vivemos foi o oposto disso!
            </p>
            <p>
              Na véspera do embarque, fomos informados de que o voo havia sido cancelado. Novos voos foram sugeridos — com escalas
              e tempos de espera impossíveis para quem viaja com crianças. E o principal detalhe disso tudo? Era MENTIRA! Quando
              chegamos ao aeroporto, as malas despachadas não estavam inclusas nas novas passagens. Pagamos do próprio bolso, sem
              nenhuma garantia de que receberíamos de volta.
            </p>
            <p>
              Foi dentro daquele aeroporto, com as crianças no colo e o coração apertado, que a FamilyWay começou a tomar forma. Não
              por raiva — mas pela convicção de que as pessoas merecem um atendimento muito melhor do que isso - e que por tudo o que
              já vivemos e entregamos em nossas experiências anteriores, sabíamos que poderíamos oferecer.
            </p>
            <p className="text-accent font-semibold text-xl italic text-center">
              A FamilyWay nasceu de uma promessa:
            </p>
            <p className="text-accent font-bold text-2xl italic text-center">
              Nunca fazer com o nosso cliente o que fizeram conosco.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;
