import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HeroSection from "../HeroSection";

const queryClient = new QueryClient();

export default function HeroSectionExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroSection />
    </QueryClientProvider>
  );
}
