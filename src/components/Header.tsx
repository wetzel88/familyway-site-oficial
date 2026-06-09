import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Início", href: "top" },
  { label: "Nossa História", href: "#historia" },
  { label: "Por que a FamilyWay?", href: "#pilares" },
  { label: "Contato", href: "#contato" },
];

const Header = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg"
    >
      <div className="container mx-auto flex items-center justify-between px-4 transition-all duration-500">
        <a href="#inicio">
          <img
            src={logo}
            alt="FamilyWay"
            className={"w-auto h-20"}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href === "top" ? "#" : item.href}
              onClick={(e) => {
                if (item.href === "top") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setMobileOpen(false);
                }
              }}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium text-base"
            >
              {item.label}
            </a>
          ))}
          <Button variant="cta" size="lg" asChild>
            <a href="#contato">Solicitar Cotação</a>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-border px-4 pb-6 animate-fade-in-up">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href === "top" ? "#" : item.href}
              onClick={(e) => {setMobileOpen(false);
                if (item.href === "top") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth"});
                }
              }}
              className="block py-3 text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              {item.label}
            </a>
          ))}
          <Button variant="cta" className="w-full mt-2" asChild>
            <a href="#contato" onClick={() => setMobileOpen(false)}>
              Solicitar Cotação
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;
