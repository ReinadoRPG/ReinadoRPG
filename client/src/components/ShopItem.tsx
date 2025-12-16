import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

interface ShopItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  icon?: React.ReactNode;
  popular?: boolean;
}

export default function ShopItem({ id, name, description, price, icon, popular }: ShopItemProps) {
  const handleBuy = () => {
    const message = encodeURIComponent(
      `Ola! Gostaria de comprar os seguintes itens:\n${name} - R$ ${price.toFixed(2)}\nTotal: R$ ${price.toFixed(2)}`
    );
    const whatsappUrl = `https://wa.me/5514998199235?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Card
      className="bg-black/70 backdrop-blur-sm border-amber-900/50 p-6 flex flex-col gap-4 relative overflow-visible"
      data-testid={`card-shop-item-${id}`}
    >
      {popular && (
        <Badge className="absolute -top-2 -right-2 bg-amber-600 text-white font-medieval">
          Popular
        </Badge>
      )}

      <div className="flex items-start gap-4">
        {icon && (
          <div className="w-12 h-12 bg-amber-900/30 rounded-md flex items-center justify-center text-amber-400">
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-medieval text-xl text-amber-100">{name}</h3>
          <p className="font-body text-amber-300/70 text-sm mt-1">{description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 mt-auto flex-wrap">
        <span className="font-medieval text-2xl text-amber-400" data-testid={`text-price-${id}`}>
          R$ {price.toFixed(2)}
        </span>
        <Button
          onClick={handleBuy}
          className="bg-green-600 text-white font-medieval gap-2"
          data-testid={`button-buy-${id}`}
        >
          <SiWhatsapp className="w-4 h-4" />
          Comprar
        </Button>
      </div>
    </Card>
  );
}
