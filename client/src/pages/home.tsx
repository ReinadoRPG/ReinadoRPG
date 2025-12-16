import HeroSection from "@/components/HeroSection";
import LoreSection from "@/components/LoreSection";
import Carousel from "@/components/Carousel";
import PlayerList from "@/components/PlayerList";
import { Shield, Crown, ScrollText, Terminal } from "lucide-react";

const highlights = [
  {
    id: "unban",
    title: "Desbanimento",
    description: "Remova seu banimento e volte a jogar! Acesso completo ao servidor.",
    icon: <Shield className="w-16 h-16" />,
    color: "bg-gradient-to-br from-red-900/80 to-red-950/80",
    link: "/loja",
  },
  {
    id: "vip",
    title: "VIP Premium",
    description: "Desbloqueie beneficios exclusivos, kits especiais e muito mais!",
    icon: <Crown className="w-16 h-16" />,
    color: "bg-gradient-to-br from-amber-700/80 to-amber-800/80",
    link: "/loja",
  },
  {
    id: "regras",
    title: "Regras do Servidor",
    description: "Leia nossas regras e mantenha a comunidade segura e divertida.",
    icon: <ScrollText className="w-16 h-16" />,
    color: "bg-gradient-to-br from-blue-900/80 to-blue-950/80",
    link: "/regras",
  },
  {
    id: "comandos",
    title: "Comandos",
    description: "Veja todos os comandos disponiveis para jogadores.",
    icon: <Terminal className="w-16 h-16" />,
    color: "bg-gradient-to-br from-green-900/80 to-green-950/80",
    link: "/comandos",
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />
      
      <PlayerList />
      
      <section className="py-16 px-4 bg-stone-950 dark:bg-stone-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-medieval text-4xl text-amber-500 dark:text-amber-400 mb-4" data-testid="text-highlights-title">
              Destaques
            </h2>
            <p className="font-body text-amber-700 dark:text-amber-200/80">
              Conheca as principais atracoes do servidor
            </p>
          </div>

          <Carousel items={highlights} autoPlay={true} interval={6000} />
        </div>
      </section>

      <LoreSection />
    </>
  );
}
