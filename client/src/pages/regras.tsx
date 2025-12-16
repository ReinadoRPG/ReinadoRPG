import RuleCard from "@/components/RuleCard";
import { Button } from "@/components/ui/button";
import { SiDiscord } from "react-icons/si";
import backgroundImage from "@assets/background_1765854796078.jpg";

const rules = [
  {
    number: 1,
    title: "Respeito Mutuo",
    description:
      "Mantenha um ambiente amigavel. E proibido o excesso de linguagem ofensiva (palavroes), flood, spam, e qualquer forma de assedio, preconceito ou desrespeito a outros jogadores ou a staff.",
  },
  {
    number: 2,
    title: "Jogo Limpo (Sem Cheats)",
    description:
      "E estritamente proibido o uso de hacks, clients alternativos (cheats), texturas (ex: X-Ray) ou qualquer modificacao que conceda vantagens injustas sobre outros jogadores.",
  },
  {
    number: 3,
    title: "Regras de PvP (Combate)",
    description:
      "O combate Jogador vs. Jogador (PvP) e ativado apenas durante o periodo noturno no jogo. Lutar fora desse horario (exceto em areas designadas) nao e permitido. Esteja preparado para o anoitecer!",
  },
  {
    number: 4,
    title: "Exploracao de Bugs",
    description:
      "E proibido abusar de bugs, falhas ou mecanicas nao intencionais do servidor para beneficio proprio. Se encontrar um bug, reporte imediatamente a Staff.\n\nRecompensa: Jogadores que reportarem falhas graves de forma correta serao recompensados pela sua honestidade!",
  },
  {
    number: 5,
    title: "Denuncias e Alertas",
    description:
      "Para denuncias (provas sao necessarias), alertas importantes ou problemas graves, a forma mais rapida e segura de nos contatar e abrindo um ticket em nosso Discord oficial.",
  },
];

export default function Regras() {
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

      <div className="container mx-auto max-w-4xl relative">
        <div className="text-center mb-12">
          <h1 className="font-medieval text-4xl md:text-5xl text-amber-400 mb-4" data-testid="text-regras-title">
            Regras, Leis e Normas
          </h1>
          <p className="font-body text-lg text-amber-200/80 max-w-2xl mx-auto">
            Para garantir uma experiencia justa e agradavel para todos os jogadores,
            pedimos que siga estas regras. A violacao pode resultar em punicoes,
            incluindo banimento permanente.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {rules.map((rule) => (
            <RuleCard
              key={rule.number}
              number={rule.number}
              title={rule.title}
              description={rule.description}
              extraContent={
                rule.number === 5 ? (
                  <Button
                    className="bg-indigo-600 text-white font-medieval gap-2"
                    onClick={() => window.open("https://discord.gg/5jvwssAV9t", "_blank")}
                    data-testid="button-discord-ticket"
                  >
                    <SiDiscord className="w-4 h-4" />
                    Ir para o Discord
                  </Button>
                ) : undefined
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
