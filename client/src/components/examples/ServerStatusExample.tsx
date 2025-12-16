import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ServerStatus from "../ServerStatus";

const queryClient = new QueryClient();

export default function ServerStatusExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-md">
        <ServerStatus />
      </div>
    </QueryClientProvider>
  );
}
