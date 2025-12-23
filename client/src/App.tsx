import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "@/pages/home";
import Loja from "@/pages/loja";
import Regras from "@/pages/regras";
import Comandos from "@/pages/comandos";
import NotFound from "@/pages/not-found";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";

/**
 * 🔁 Fix para GitHub Pages + SPA (Wouter)
 * Permite recarregar páginas como /regras sem dar 404
 */
const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect");

if (redirect) {
  window.history.replaceState(null, "", redirect);
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/loja" component={Loja} />
      <Route path="/regras" component={Regras} />
      <Route path="/comandos" component={Comandos} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CartProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-background text-foreground flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />
            </div>
            <Toaster />
          </TooltipProvider>
        </CartProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
