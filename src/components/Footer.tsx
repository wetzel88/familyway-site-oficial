import { Instagram, Facebook, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

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
          <a href="#" className="text-foreground/60 hover:text-accent transition-colors" aria-label="Instagram">
            <Instagram size={22} />
          </a>
          <a href="#" className="text-foreground/60 hover:text-accent transition-colors" aria-label="Facebook">
            <Facebook size={22} />
          </a>
          <a href="#" className="text-foreground/60 hover:text-accent transition-colors" aria-label="WhatsApp">
            <MessageCircle size={22} />
          </a>
        </div>
      </div>

      <div className="border-t border-border mt-8 pt-6 text-center">
        <p className="text-muted-foreground text-sm">
        FamilyWay — Agência de Viagens
        </p>
        <p className="text-muted-foreground text-sm">
        CNPJ: XX.XXX.XXX/0001-XX
        </p>
        <p className="text-muted-foreground text-sm font-bold">
        contato@familyway.tur.br
        </p>
        <p className="text-muted-foreground text-sm">
        WhatsApp: +55 47 99151-8026
        </p>
        <p className="text-accent text-l font-bold mt-4">
        Atendimento online para todo o Brasil e exterior.
        </p>        
        <p className="text-muted-foreground text-sm mt-4">
          ©2026 FamilyWay. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
