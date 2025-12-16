import ShopItem from "../ShopItem";
import { Shield } from "lucide-react";

export default function ShopItemExample() {
  return (
    <div className="max-w-sm">
      <ShopItem
        id="unban"
        name="Desbanimento"
        description="Remova seu banimento e volte a jogar no servidor."
        price={15.0}
        icon={<Shield className="w-6 h-6" />}
        popular
      />
    </div>
  );
}
