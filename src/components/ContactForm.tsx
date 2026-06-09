import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  { code: "BR", name: "Brasil", dial: "+55", maxDigits: 11, format: (v: string) => { const d = v.replace(/\D/g, "").slice(0, 11); if (d.length <= 2) return d; if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`; return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`; } },
  { code: "ES", name: "Espanha", dial: "+34", maxDigits: 9, format: (v: string) => { const d = v.replace(/\D/g, "").slice(0, 9); if (d.length <= 3) return d; if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`; return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`; } },
  { code: "PT", name: "Portugal", dial: "+351", maxDigits: 9, format: (v: string) => { const d = v.replace(/\D/g, "").slice(0, 9); if (d.length <= 3) return d; if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`; return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`; } },
  { code: "US", name: "EUA", dial: "+1", maxDigits: 10, format: (v: string) => { const d = v.replace(/\D/g, "").slice(0, 10); if (d.length <= 3) return d; if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`; return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`; } },
  { code: "FR", name: "França", dial: "+33", maxDigits: 9, format: (v: string) => { const d = v.replace(/\D/g, "").slice(0, 9); if (d.length <= 2) return d; if (d.length <= 4) return `${d.slice(0, 2)} ${d.slice(2)}`; if (d.length <= 6) return `${d.slice(0, 2)} ${d.slice(2, 4)} ${d.slice(4)}`; return `${d.slice(0, 2)} ${d.slice(2, 4)} ${d.slice(4, 6)} ${d.slice(6)}`; } },
  { code: "DE", name: "Alemanha", dial: "+49", maxDigits: 11, format: (v: string) => v.replace(/\D/g, "").slice(0, 11) },
  { code: "IT", name: "Itália", dial: "+39", maxDigits: 10, format: (v: string) => v.replace(/\D/g, "").slice(0, 10) },
  { code: "UK", name: "Reino Unido", dial: "+44", maxDigits: 10, format: (v: string) => v.replace(/\D/g, "").slice(0, 10) },
  { code: "OTHER", name: "Outro", dial: "", maxDigits: 20, format: (v: string) => v.replace(/[^0-9+\s()-]/g, "").slice(0, 20) },
];

const ContactForm = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [country, setCountry] = useState("BR");
  const [form, setForm] = useState({ name: "", phone: "", email: "", destination: "" });

  const selectedCountry = COUNTRIES.find((c) => c.code === country) || COUNTRIES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim()) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    // Simulate submission
    setLoading(true);

try {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: form.name,
      phone: form.phone,
      country: selectedCountry.name,
      dialCode: selectedCountry.dial,
      email: form.email,
      destination: form.destination,
      travelDate: date
        ? date.toLocaleDateString("pt-BR")
        : "",
      }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  toast.success(
    "Obrigado! Em breve retornaremos seu contato."
  );

  setForm({
    name: "",
    phone: "",
    email: "",
    destination: "",
  });

  setDate(undefined);
} catch (error) {
  console.error(error);

  toast.error(
    "Não foi possível enviar sua mensagem. Tente novamente."
  );
} finally {
  setLoading(false);
}
};


  return (
    <section id="contato" className="bg-primary py-20 md:py-28">
      <div className="container mx-auto px-4 max-w-2xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground text-center mb-4">
            Vamos planejar a sua viagem?
          </h2>
          <p className="text-primary-foreground/80 text-center mb-12 text-lg">
            Preencha o formulário e entraremos em contato em breve.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="text-primary-foreground mb-2 block">Nome completo *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Seu nome completo"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                required
                maxLength={100}
              />
            </div>

            <div>
              <Label className="text-primary-foreground mb-2 block">Telefone *</Label>
              <div className="flex gap-2">
                <Select value={country} onValueChange={(val) => { setCountry(val); setForm({ ...form, phone: "" }); }}>
                  <SelectTrigger className="w-[140px] shrink-0 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.name} ({c.dial})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: selectedCountry.format(e.target.value) })}
                  placeholder={country === "BR" ? "(00) 00000-0000" : country === "OTHER" ? "+código número" : "Número"}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-primary-foreground mb-2 block">E-mail *</Label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="seu@email.com"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                required
                maxLength={255}
              />
            </div>

            <div>
              <Label className="text-primary-foreground mb-2 block">Data prevista para a viagem</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20",
                      !date && "text-primary-foreground/40"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-primary-foreground mb-2 block">Destino desejado</Label>
              <Input
                value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
                placeholder="Ex: Paris, Lisboa, Rio de Janeiro, Maceió..."
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                maxLength={200}
              />
            </div>

            <Button
              type="submit"
              variant="cta"
              size="lg"
              className="w-full text-lg py-6"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar mensagem"}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
