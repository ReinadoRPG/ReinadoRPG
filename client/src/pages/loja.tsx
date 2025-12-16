import ShopItem from "@/components/ShopItem";
import { Shield, Crown, Coins } from "lucide-react";
import backgroundImage from "@assets/background_1765854796078.jpg";

const vipPackageItems = [
  "Armadura com todos os tipos de Protecao",
  "Reparacao na armadura Inquebravel 4",
  "Totem (1)",
  "Pack (64) de frasco de XP",
  "8 blocos de ferro, esmeralda, ouro e lapis lazuli",
  "Casco de shulker (1)",
  "Pack (64) flechas",
  "33 barras de ferro",
  "20 lapis lazuli",
  "Pe de coelho e pele de coelho",
  "2 packs (128) de costela de porco",
];

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
    id: "vip-cavaleiro",
    name: "VIP - Cavaleiro do Futuro",
    description: "Pacote VIP completo com armadura encantada, itens exclusivos e muito mais!",
    price: 50.0,
    icon: <Crown className="w-6 h-6" />,
    popular: true,
    packageItems: vipPackageItems,
  },
  {
    id: "coins-100",
    name: "100 BronzeCoins",
    description: "Pacote inicial de moedas para usar no servidor.",
    price: 5.0,
    icon: <Coins className="w-6 h-6" />,
    popular: false,
  },
  {
    id: "coins-574",
    name: "574 BronzeCoins",
    description: "Pacote medio de moedas com bonus incluso.",
    price: 23.0,
    icon: <Coins className="w-6 h-6" />,
    popular: false,
  },
  {
    id: "coins-1050",
    name: "1050 BronzeCoins",
    description: "Pacote grande de moedas - melhor custo-beneficio!",
    price: 46.9,
    icon: <Coins className="w-6 h-6" />,
    popular: true,
  },
  {
    id: "coins-2432",
    name: "2432 BronzeCoins",
    description: "Mega pacote de moedas para jogadores dedicados.",
    price: 120.0,
    icon: <Coins className="w-6 h-6" />,
    popular: false,
  },
  {
    id: "coins-5000",
    name: "5000 BronzeCoins",
    description: "Pacote supremo! Moedas suficientes para dominar o servidor.",
    price: 345.0,
    icon: <Coins className="w-6 h-6" />,
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
      <div className="absolute inset-0 bg-black/80 dark:bg-black/80 -z-10 fixed" />

      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center mb-12">
          <h1 className="font-medieval text-4xl md:text-5xl text-amber-400 mb-4" data-testid="text-loja-title">
            Loja ReinadoRPG
          </h1>
          <p className="font-body text-lg text-amber-200/80 max-w-2xl mx-auto">
            Adquira itens exclusivos e apoie o servidor! Adicione os itens ao carrinho
            e finalize sua compra pelo WhatsApp.
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
              packageItems={item.packageItems}
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
