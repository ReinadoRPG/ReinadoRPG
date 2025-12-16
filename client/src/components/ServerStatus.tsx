import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Server, Wifi, WifiOff } from "lucide-react";

interface ServerStatusData {
  online: boolean;
  players: {
    online: number;
    max: number;
  };
  version?: string;
  motd?: {
    clean: string[];
  };
}

export default function ServerStatus() {
  const { data, isLoading, error } = useQuery<ServerStatusData>({
    queryKey: ["server-status"],
    queryFn: async () => {
      const response = await fetch("https://api.mcsrvstat.us/2/sd-br7.blazebr.com:25575");
      if (!response.ok) throw new Error("Failed to fetch server status");
      return response.json();
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <Card className="bg-black/60 backdrop-blur-sm border-amber-900/50 p-6">
        <div className="flex items-center gap-3">
          <Server className="w-6 h-6 text-amber-500 animate-pulse" />
          <span className="font-medieval text-amber-200 text-lg">Carregando status...</span>
        </div>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="bg-black/60 backdrop-blur-sm border-red-900/50 p-6">
        <div className="flex items-center gap-3">
          <WifiOff className="w-6 h-6 text-red-500" />
          <span className="font-medieval text-red-300 text-lg">Erro ao carregar status</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-black/60 backdrop-blur-sm border-amber-900/50 p-6" data-testid="card-server-status">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            {data.online ? (
              <Wifi className="w-6 h-6 text-green-500" />
            ) : (
              <WifiOff className="w-6 h-6 text-red-500" />
            )}
            <span className="font-medieval text-xl text-amber-100">
              {data.online ? "Servidor Online" : "Servidor Offline"}
            </span>
            <Badge
              variant={data.online ? "default" : "destructive"}
              className={data.online ? "bg-green-600 text-white" : ""}
            >
              {data.online ? "ONLINE" : "OFFLINE"}
            </Badge>
          </div>
        </div>

        {data.online && (
          <div className="flex items-center gap-3 text-amber-200">
            <Users className="w-5 h-5 text-amber-500" />
            <span className="font-body text-lg" data-testid="text-player-count">
              Jogadores Online: <strong className="text-amber-400">{data.players.online}</strong> / {data.players.max}
            </span>
          </div>
        )}

        {data.version && (
          <div className="text-amber-300/70 font-body text-sm">
            Versao: {data.version}
          </div>
        )}
      </div>
    </Card>
  );
}
