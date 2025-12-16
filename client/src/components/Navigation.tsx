import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, ShoppingBag, ScrollText, Terminal, X } from "lucide-react";

const navItems = [
  { path: "/", label: "Inicio", icon: Home },
  { path: "/loja", label: "Loja", icon: ShoppingBag },
  { path: "/regras", label: "Regras", icon: ScrollText },
  { path: "/comandos", label: "Comandos", icon: Terminal },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-amber-900/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/">
            <span className="font-medieval text-2xl text-amber-400 cursor-pointer" data-testid="link-home-logo">
              RPG Medieval
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`font-medieval ${isActive ? "bg-amber-700 text-white" : "text-amber-200"}`}
                    data-testid={`link-nav-${item.label.toLowerCase()}`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                <Menu className="w-6 h-6 text-amber-400" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black/95 border-amber-900/50">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.path;
                  return (
                    <Link key={item.path} href={item.path}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className={`w-full justify-start font-medieval text-lg ${isActive ? "bg-amber-700 text-white" : "text-amber-200"}`}
                        onClick={() => setIsOpen(false)}
                        data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
