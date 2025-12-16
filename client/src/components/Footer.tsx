import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="mt-16 bg-stone-950 dark:bg-stone-950 border-t border-amber-900/50">
      <div className="container mx-auto px-4 py-8">
        <Separator className="mb-6 bg-amber-900/30" />
        <div className="text-center">
          <p className="font-medieval text-lg text-amber-500 dark:text-amber-400 mb-2">ReinadoRPG</p>
          <div className="font-body text-amber-700 dark:text-amber-200/70 text-sm space-y-1">
            <p>© 2025 ReinadoRPG</p>
            <p>Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
