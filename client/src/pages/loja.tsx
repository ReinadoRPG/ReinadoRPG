import ShopItem from "@/components/ShopItem";
import { Shield, Crown, Sword, Sparkles, Star, Zap } from "lucide-react";
import backgroundImage from "@assets/background_1765854796078.jpg";

const shopItems = [
  {
    id: "unban",
    name: "Desbanimento",
    description: "Remova seu banimento e volte a jogar no servidor.",
    price: 15.0,
    icon: <Shield className="w-6 h-6" />,
    popular: true,
  },
  {
    id: "vip",
    name: "VIP",
    description: "Acesso a comandos exclusivos, kits especiais e beneficios unicos.",
    price: 25.0,
    icon: <Crown className="w-6 h-6" />,
    popular: true,
  },
  {
    id: "vip-plus",
    name: "VIP+",
    description: "Todos os beneficios do VIP, mais homes, kits melhores e mais!",
    price: 40.0,
    icon: <Star className="w-6 h-6" />,
    popular: false,
  },
  {
    id: "kit-guerreiro",
    name: "Kit Guerreiro",
    description: "Armadura de ferro completa + espada de diamante encantada.",
    price: 10.0,
    icon: <Sword className="w-6 h-6" />,
    popular: false,
  },
  {
    id: "kit-mago",
    name: "Kit Mago",
    description: "Itens magicos, pocoes e equipamentos para dominar a magia.",
    price: 12.0,
    icon: <Sparkles className="w-6 h-6" />,
    popular: false,
  },
  {
    id: "booster-xp",
    name: "Booster XP",
    description: "2x de experiencia por 7 dias! Suba de nivel mais rapido.",
    price: 8.0,
    icon: <Zap className="w-6 h-6" />,
    popular: false,
  },
];

export default function Loja() {
  return (
    <div
      className="min-h-screen pt-20 pb-12 px-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/80 -z-10 fixed" />

      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center mb-12">
          <h1 className="font-medieval text-4xl md:text-5xl text-amber-400 mb-4" data-testid="text-loja-title">
            Loja do Servidor
          </h1>
          <p className="font-body text-lg text-amber-200/80 max-w-2xl mx-auto">
            Adquira itens exclusivos e apoie o servidor! Clique em comprar para enviar
            seu pedido diretamente pelo WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shopItems.map((item) => (
            <ShopItem
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              icon={item.icon}
              popular={item.popular}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-body text-amber-300/60 text-sm">
            Ao realizar uma compra, voce concorda com nossos termos de uso.
            Pagamentos processados via WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
