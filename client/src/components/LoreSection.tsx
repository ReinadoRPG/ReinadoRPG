import { Card } from "@/components/ui/card";
import backgroundImage from "@assets/background_1765854796078.jpg";

export default function LoreSection() {
  return (
    <section
      className="relative py-16 px-4 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/85" />

      <div className="container mx-auto max-w-3xl relative z-10">
        <Card className="bg-black/60 backdrop-blur-sm border-amber-900/50 p-8 md:p-12">
          <div className="text-center">
            <h2 className="font-medieval text-3xl md:text-4xl text-amber-400 mb-6" data-testid="text-lore-title">
              A Historia de Aeldrynn
            </h2>
            <p className="font-body text-lg text-amber-100 leading-relaxed whitespace-pre-line">
              O continente de Aeldrynn é dividido em 5 grandes regiões, cada uma com sua história, cidades, conflitos e criaturas próprias. No centro de tudo, um poder antigo desperta..
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
