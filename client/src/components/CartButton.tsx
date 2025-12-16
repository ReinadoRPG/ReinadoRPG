import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, totalItems, totalPrice, addItem, removeItem, clearCart, checkout } = useCart();

  const handleCheckout = () => {
    checkout();
    setIsOpen(false);
    clearCart();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-amber-400"
          data-testid="button-cart"
        >
          <ShoppingCart className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-stone-900 dark:bg-stone-900 border-amber-900/50 w-80">
        <SheetHeader>
          <SheetTitle className="font-medieval text-amber-400 text-xl">Carrinho</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 flex flex-col gap-4 h-[calc(100vh-200px)] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-amber-200/60 text-center py-8">Seu carrinho esta vazio</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-stone-800 rounded-lg p-4 flex flex-col gap-2"
                data-testid={`cart-item-${item.id}`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-medieval text-amber-300 text-sm">{item.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-400 h-6 w-6"
                    onClick={() => {
                      for (let i = 0; i < item.quantity; i++) {
                        removeItem(item.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 border-amber-700"
                      onClick={() => removeItem(item.id)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="text-amber-200 w-6 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6 border-amber-700"
                      onClick={() => addItem({ id: item.id, name: item.name, price: item.price })}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <span className="text-amber-400 font-bold">
                    R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-stone-900 border-t border-amber-900/50">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medieval text-amber-200">Total:</span>
              <span className="font-medieval text-amber-400 text-xl">
                R$ {totalPrice.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <Button
              className="w-full bg-green-600 text-white font-medieval"
              onClick={handleCheckout}
              data-testid="button-checkout"
            >
              Finalizar Compra ({totalItems} itens)
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
