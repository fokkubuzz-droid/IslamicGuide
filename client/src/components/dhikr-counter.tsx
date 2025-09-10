import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Hand, RotateCcw } from "lucide-react";

export default function DhikrCounter() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(prev => prev + 1);
  };

  const resetCount = () => {
    setCount(0);
  };

  return (
    <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl p-4 text-center border border-accent/20" data-testid="dhikr-counter">
      <Hand className="text-2xl text-accent mb-2 mx-auto" />
      <h3 className="font-semibold mb-2">Dhikr Counter</h3>
      <div className="text-3xl font-bold text-accent mb-2" data-testid="text-dhikr-count">
        {count}
      </div>
      <Button 
        className="w-full bg-accent text-accent-foreground py-2 rounded-md font-medium hover:bg-accent/90 mb-2"
        onClick={incrementCount}
        data-testid="button-increment-dhikr"
      >
        Tap to Count
      </Button>
      <Button 
        variant="ghost"
        size="sm"
        className="w-full text-xs text-muted-foreground hover:text-foreground"
        onClick={resetCount}
        data-testid="button-reset-dhikr"
      >
        <RotateCcw className="mr-1 h-3 w-3" />
        Reset
      </Button>
    </div>
  );
}
