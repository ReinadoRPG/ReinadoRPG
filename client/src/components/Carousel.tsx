import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarouselItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
}

export default function Carousel({ items, autoPlay = true, interval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(-1);
  const [shuffledItems, setShuffledItems] = useState<CarouselItem[]>([]);

  useEffect(() => {
    // Shuffle items without repeating the previous one
    let newItems = [...items];
    let randomIndex = Math.floor(Math.random() * newItems.length);
    
    // Ensure it's not the same as previous
    while (previousIndex !== -1 && randomIndex === previousIndex) {
      randomIndex = Math.floor(Math.random() * newItems.length);
    }
    
    setShuffledItems([newItems[randomIndex]]);
    setPreviousIndex(randomIndex);
  }, []);

  useEffect(() => {
    if (!autoPlay || shuffledItems.length === 0) return;

    const timer = setInterval(() => {
      let newItems = [...items];
      let randomIndex = Math.floor(Math.random() * newItems.length);
      
      while (randomIndex === previousIndex) {
        randomIndex = Math.floor(Math.random() * newItems.length);
      }
      
      setShuffledItems([newItems[randomIndex]]);
      setPreviousIndex(randomIndex);
    }, interval);

    return () => clearInterval(timer);
  }, [items, interval, autoPlay, previousIndex]);

  if (shuffledItems.length === 0) return null;

  const current = shuffledItems[0];

  const handleNext = () => {
    let newItems = [...items];
    let randomIndex = Math.floor(Math.random() * newItems.length);
    
    while (randomIndex === previousIndex) {
      randomIndex = Math.floor(Math.random() * newItems.length);
    }
    
    setShuffledItems([newItems[randomIndex]]);
    setPreviousIndex(randomIndex);
  };

  const handlePrev = () => {
    let newItems = [...items];
    let randomIndex = Math.floor(Math.random() * newItems.length);
    
    while (randomIndex === previousIndex) {
      randomIndex = Math.floor(Math.random() * newItems.length);
    }
    
    setShuffledItems([newItems[randomIndex]]);
    setPreviousIndex(randomIndex);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" data-testid="carousel-container">
      <Card
        className={`${current.color} backdrop-blur-sm border-none p-8 text-center relative overflow-hidden`}
      >
        <div className="flex items-center justify-center mb-4 text-5xl">
          {current.icon}
        </div>
        <h3 className="font-medieval text-2xl text-white mb-3" data-testid={`carousel-title-${current.id}`}>
          {current.title}
        </h3>
        <p className="font-body text-white/90 text-base">
          {current.description}
        </p>
      </Card>

      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 text-amber-400 hover:text-amber-300"
        data-testid="button-carousel-prev"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 text-amber-400 hover:text-amber-300"
        data-testid="button-carousel-next"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      <div className="flex justify-center gap-2 mt-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`h-2 w-2 rounded-full transition-colors ${
              current.id === item.id ? "bg-amber-400" : "bg-amber-900/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
