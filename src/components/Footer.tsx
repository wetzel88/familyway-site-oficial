import { MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";
import instagramIcon from "@/assets/instagram.svg";
import whatsappIcon from "@/assets/whatsapp.svg"

const Footer = () => (
  <footer className="bg-white py-12 border-t border-border">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center gap-8">
        <img src={logo} alt="FamilyWay" className="h-60 w-auto" />

        <nav className="flex flex-wrap justify-center gap-6">
          {[
            { label: "Início", href: "#inicio" },
            { label: "Nossa História", href: "#historia" },
            { label: "Por que a FamilyWay?", href: "#pilares" },
            { label: "Contato", href: "#contato" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground/70 hover:text-foreground transition-colors text-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-4">
           <a
            href="https://instagram.com/familyway.tur"
             target="_blank"
             rel="noopener noreferrer"
             className="text-foreground/60 hover:text-accent transition-colors"
             aria-label="Instagram"
            >
            <img
              src={instagramIcon}
              alt="Instagram"
              className="w-5 h-5 transition-all duration-300 hover:opacity-70"
            />
          </a>

            <a
              href="https://wa.me/5547991518026?text=Olá! Vim pelo site da FamilyWay."
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-accent transition-colors"
              aria-label="WhatsApp"
              >
              <img
                src={whatsappIcon}
                alt="Whatsapp"
                className="w-5 h-5 transition-all duration-300 hover:opacity-70"
              />
  </a>
</div>
      </div>

      <div className="border-t border-border mt-8 pt-6 text-center">
        <p className="text-muted-foreground text-sm">
        FamilyWay — Agência de Viagens
        </p>
        <p className="text-muted-foreground text-sm">
        CNPJ: 67.237.474/0001-22
        </p>
        <p className="text-muted-foreground text-sm font-bold">
          <a
            href="mailto:contato@familyway.tur.br"
            className="hover:text-accent transition-colors"
          >
            contato@familyway.tur.br
          </a>
        </p>
        <p className="text-muted-foreground text-sm">
            WhatsApp:
            {" "}
            <a
              href="https://wa.me/5547991518026"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              +55 47 99151-8026
            </a>

            {" | "}

            <a
              href="https://wa.me/5547988871956"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              +55 47 98887-1956
            </a>
          </p>
        <p className="text-accent text-l font-bold mt-4">
        Atendimento online para clientes no Brasil e no exterior.
        </p>        
        <p className="text-muted-foreground text-sm mt-4">
          ©2026 FamilyWay. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
