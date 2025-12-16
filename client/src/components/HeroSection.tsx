import { Button } from "@/components/ui/button";
import { SiDiscord } from "react-icons/si";
import { SiWhatsapp } from "react-icons/si";
import ServerStatus from "./ServerStatus";
import backgroundImage from "@assets/background_1765854796078.jpg";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-4"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-8">
        <h1
          className="font-medieval text-5xl md:text-7xl text-amber-400 drop-shadow-lg"
          data-testid="text-hero-title"
        >
          RPG Medieval
        </h1>
        <p className="font-body text-xl md:text-2xl text-amber-100/90 max-w-2xl">
          Aventure-se em um mundo de fantasia, batalhas epicas e magia!
          Junte-se a nossa comunidade e construa seu legado.
        </p>

        <ServerStatus />

        <div className="flex flex-col sm:flex-row gap-4 mt-4 flex-wrap justify-center">
          <Button
            size="lg"
            className="bg-indigo-600 text-white font-medieval text-lg gap-2 px-8"
            onClick={() => window.open("https://discord.gg/5jvwssAV9t", "_blank")}
            data-testid="button-discord"
          >
            <SiDiscord className="w-5 h-5" />
            Entrar no Discord
          </Button>
          <Button
            size="lg"
            className="bg-green-600 text-white font-medieval text-lg gap-2 px-8"
            onClick={() => window.open("https://chat.whatsapp.com/EyBu39XdT7LEYKy4OXibOp", "_blank")}
            data-testid="button-whatsapp-group"
          >
            <SiWhatsapp className="w-5 h-5" />
            Grupo WhatsApp
          </Button>
        </div>

        <div className="mt-8 font-body text-amber-300/70">
          <p>IP do Servidor: <code className="font-mono text-amber-400">sd-br7.blazebr.com:25575</code></p>
        </div>
      </div>
    </section>
  );
}
