import { createContext, useContext, useState, ReactNode } from "react";

type Language = "pt" | "en" | "es";

interface Translations {
  [key: string]: {
    pt: string;
    en: string;
    es: string;
  };
}

const translations: Translations = {
  home: { pt: "Inicio", en: "Home", es: "Inicio" },
  shop: { pt: "Loja", en: "Shop", es: "Tienda" },
  rules: { pt: "Regras", en: "Rules", es: "Reglas" },
  commands: { pt: "Comandos", en: "Commands", es: "Comandos" },
  buy: { pt: "Comprar", en: "Buy", es: "Comprar" },
  addToCart: { pt: "Adicionar", en: "Add", es: "Agregar" },
  cart: { pt: "Carrinho", en: "Cart", es: "Carrito" },
  checkout: { pt: "Finalizar Compra", en: "Checkout", es: "Finalizar" },
  total: { pt: "Total", en: "Total", es: "Total" },
  onlinePlayers: { pt: "Jogadores Online", en: "Online Players", es: "Jugadores Online" },
  noPlayers: { pt: "Nenhum jogador online no momento", en: "No players online at the moment", es: "Ningun jugador online" },
  serverOnline: { pt: "Servidor Online", en: "Server Online", es: "Servidor Online" },
  serverOffline: { pt: "Servidor Offline", en: "Server Offline", es: "Servidor Offline" },
  highlights: { pt: "Destaques", en: "Highlights", es: "Destacados" },
  lore: { pt: "A Historia de Aeldrynn", en: "The History of Aeldrynn", es: "La Historia de Aeldrynn" },
  viewPackage: { pt: "Ver Pacote", en: "View Package", es: "Ver Paquete" },
  closePackage: { pt: "Fechar", en: "Close", es: "Cerrar" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
