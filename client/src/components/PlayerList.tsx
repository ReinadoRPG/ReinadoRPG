import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import headImage from "@assets/head_1765856418592.jpg";

interface ServerData {
  online: boolean;
  players?: {
    online: number;
    max: number;
    list?: { name: string; uuid: string }[];
  };
}

export default function PlayerList() {
  const { data, isLoading } = useQuery<ServerData>({
    queryKey: ["/api/server-status"],
    refetchInterval: 30000,
  });

  const players = data?.players?.list || [];
  const isOnline = data?.online || false;

  return (
    <section className="py-12 px-4 bg-stone-950 dark:bg-stone-950">
      <div className="container mx-auto max-w-4xl">
        <Card className="bg-stone-900/80 dark:bg-stone-900/80 border-amber-900/50 p-6">
          <h2 className="font-medieval text-2xl text-amber-400 mb-6" data-testid="text-players-title">
            Jogadores Online
          </h2>

          <div className="bg-stone-800/50 rounded-lg p-4">
            {isLoading ? (
              <p className="text-amber-200/60 font-body">Carregando...</p>
            ) : !isOnline ? (
              <p className="text-amber-200/60 font-body" data-testid="text-no-players">
                Servidor offline no momento
              </p>
            ) : players.length === 0 ? (
              <p className="text-amber-200/60 font-body" data-testid="text-no-players">
                Nenhum jogador online no momento
              </p>
            ) : (
              <div className="flex flex-wrap gap-4">
                {players.map((player, index) => (
                  <div
                    key={player.uuid || index}
                    className="flex items-center gap-2 bg-stone-700/50 rounded-lg px-3 py-2"
                    data-testid={`player-${player.name}`}
                  >
                    <img
                      src={headImage}
                      alt={player.name}
                      className="w-8 h-8 rounded"
                    />
                    <span className="font-body text-amber-200">{player.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {isOnline && data?.players && (
            <p className="mt-4 text-amber-300/60 font-body text-sm text-center">
              {data.players.online} / {data.players.max} jogadores
            </p>
          )}
        </Card>
      </div>
    </section>
  );
}
