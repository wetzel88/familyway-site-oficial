import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  const phoneNumber = "5547991518026";

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // aparece depois de 300px
      if (scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
        fixed bottom-5 right-5 z-50
        transition-all duration-300
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
      `}
    >
      <div className="relative group">
        {/* Tooltip desktop */}
        <span className="
          hidden md:block
          absolute right-16 bottom-3
          bg-white text-[#0F4C81] text-xs
          px-3 py-1 rounded-md
          opacity-0 group-hover:opacity-100
          transition-opacity whitespace-nowrap
        ">
          Fale com a FamilyWay no WhatsApp
        </span>

        <a
          href={`https://wa.me/${phoneNumber}?text=Olá! Vim pelo site da FamilyWay`}
          target="_blank"
          rel="noopener noreferrer"
          className="
            bg-[#F97316]
            hover:bg-[#EA580C]
            text-[#0F4C81]
            w-14 h-14 md:w-16 md:h-16
            rounded-full
            flex items-center justify-center
            shadow-lg
            transition-all
            hover:scale-110
          "
          aria-label="Falar no WhatsApp"
        >
          <MessageCircle size={26} />
        </a>
      </div>
    </div>
  );
};

export default WhatsAppFloat;