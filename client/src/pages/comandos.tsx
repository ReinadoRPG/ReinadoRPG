import { useState } from "react";
import CommandCard from "@/components/CommandCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import backgroundImage from "@assets/background_1765854796078.jpg";

const commands = [
  { category: "Autenticacao", command: "/register (senha) (senha)", description: "Registra sua conta no servidor pela primeira vez." },
  { category: "Autenticacao", command: "/login (senha)", description: "Faz login na sua conta quando voce entrar no servidor." },
  { category: "Navegacao", command: "/spawn", description: "Teleporta voce de volta para o spawn principal." },
  { category: "Navegacao", command: "/rtp", description: "Teleporta voce para um local aleatorio no mundo." },
  { category: "Navegacao", command: "/warp", description: "Abre a lista de locais publicos para onde voce pode se teleportar." },
  { category: "Navegacao", command: "/createhome (nome)", description: "Cria um ponto de teleporte (home) na sua localizacao atual." },
  { category: "Navegacao", command: "/sethome (nome)", description: "Atualiza a localizacao de uma home existente." },
  { category: "Navegacao", command: "/home (nome)", description: "Teleporta voce para a home especificada." },
  { category: "Navegacao", command: "/delhome (nome)", description: "Apaga uma de suas homes." },
  { category: "Social", command: "/g (mensagem)", description: "Envia uma mensagem no chat global." },
  { category: "Social", command: "/tell (jogador) (msg)", description: "Envia uma mensagem privada para outro jogador." },
  { category: "Social", command: "/afk", description: "Marca voce como 'Ausente' (Away From Keyboard), ou tira a marcacao de ausencia." },
  { category: "Social", command: "/sit", description: "Permite que seu personagem se sente no chao." },
  { category: "Social", command: "/ignoreplayer (nome)", description: "Bloqueia todas as mensagens de um jogador especifico." },
  { category: "Economia", command: "/balance", description: "Mostra quanto dinheiro (money) voce possui." },
  { category: "Economia", command: "/balancetop", description: "Exibe a lista dos jogadores mais ricos do servidor." },
  { category: "Economia", command: "/pay (jogador) (quantia)", description: "Paga uma quantia em dinheiro para outro jogador." },
  { category: "Economia", command: "/sell (item) (quantia)", description: "Vende itens do seu inventario." },
  { category: "Economia", command: "/sell blocks", description: "Vende blocos." },
  { category: "Clas", command: "/clan menu", description: "Abre a interface principal de gerenciamento do seu cla." },
  { category: "Clas", command: "/clan invite (jogador)", description: "Convida um jogador para o seu cla." },
  { category: "Clas", command: "/clan accept", description: "Aceita um convite para entrar em um cla." },
  { category: "Clas", command: "/clan deny", description: "Recusa um convite de cla." },
  { category: "Clas", command: "/clan kick (jogador)", description: "Remove um membro do seu cla." },
  { category: "Clas", command: "/clan setbase", description: "Define a base (home) do seu cla na sua localizacao." },
  { category: "Clas", command: "/clan base", description: "Teleporta voce para a base do seu cla." },
  { category: "Outros", command: "/kit", description: "Abre a interface para selecionar e receber kits." },
  { category: "Outros", command: "/pass", description: "Permite que voce pegue o passe gratuito ou premium." },
  { category: "Outros", command: "/bendinggui", description: "Abre a interface de habilidades e magias." },
  { category: "Outros", command: "/level", description: "Exibe seu nivel atual e progresso." },
  { category: "Outros", command: "/skin menu", description: "Abre o menu para alterar ou customizar sua skin." },
  { category: "Outros", command: "/discord", description: "Mostra o link do Discord oficial do servidor." },
  { category: "Outros", command: "/claim (nome)", description: "Possivelmente relacionado a proteger seu terreno." },
  { category: "Outros", command: "/ping", description: "Testa sua latencia (conexao) com o servidor. (Resposta: Pong!)" },
  { category: "Outros", command: "/jukebox", description: "Permite tocar musicas com bloco de notas." },
  { category: "Outros", command: "/helpop (mensagem)", description: "Envia uma mensagem de ajuda diretamente para a Staff online." },
];

const categories = [...new Set(commands.map((c) => c.category))];

export default function Comandos() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCommands = commands.filter((cmd) => {
    const matchesSearch =
      cmd.command.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || cmd.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
        <div className="text-center mb-8">
          <h1 className="font-medieval text-4xl md:text-5xl text-amber-400 mb-4" data-testid="text-comandos-title">
            Comandos do Servidor
          </h1>
          <p className="font-body text-lg text-amber-200/80 max-w-2xl mx-auto">
            Lista completa de comandos disponiveis para todos os jogadores.
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="relative max-w-md mx-auto w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
            <Input
              placeholder="Buscar comandos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-black/60 border-amber-900/50 text-amber-100 placeholder:text-amber-500/50 font-body"
              data-testid="input-search-commands"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Badge
              className={`cursor-pointer font-medieval ${!selectedCategory ? "bg-amber-600 text-white" : "bg-amber-900/50 text-amber-300"}`}
              onClick={() => setSelectedCategory(null)}
              data-testid="button-filter-all"
            >
              Todos
            </Badge>
            {categories.map((cat) => (
              <Badge
                key={cat}
                className={`cursor-pointer font-medieval ${selectedCategory === cat ? "bg-amber-600 text-white" : "bg-amber-900/50 text-amber-300"}`}
                onClick={() => setSelectedCategory(cat)}
                data-testid={`button-filter-${cat.toLowerCase()}`}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCommands.map((cmd, index) => (
            <CommandCard key={index} command={cmd.command} description={cmd.description} />
          ))}
        </div>

        {filteredCommands.length === 0 && (
          <div className="text-center py-12">
            <p className="font-body text-amber-300/60 text-lg">
              Nenhum comando encontrado.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
