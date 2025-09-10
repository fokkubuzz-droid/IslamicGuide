import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { asmaUlHusna } from "@/data/asma-ul-husna";

export default function AsmaUlHusna() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentName = asmaUlHusna[currentIndex];

  const previousName = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : asmaUlHusna.length - 1);
  };

  const nextName = () => {
    setCurrentIndex(prev => prev < asmaUlHusna.length - 1 ? prev + 1 : 0);
  };

  const viewAllNames = () => {
    // For now, we'll just cycle through names
    // In a full implementation, this would navigate to a dedicated page
    nextName();
  };

  return (
    <section className="p-4 border-t border-border" data-testid="section-asma-ul-husna">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <Star className="mr-2 text-accent" />
        Asma ul Husna
      </h2>
      
      <div className="bg-gradient-to-r from-accent/10 to-secondary/10 rounded-xl p-6 text-center border border-border/50">
        <div 
          className="text-3xl font-bold mb-2 text-secondary" 
          style={{ fontFamily: 'Times New Roman, serif' }}
          data-testid="text-name-arabic"
        >
          {currentName.arabic}
        </div>
        <div className="text-lg font-semibold mb-2" data-testid="text-name-transliteration">
          {currentName.transliteration}
        </div>
        <div className="text-sm text-muted-foreground mb-4" data-testid="text-name-meaning">
          {currentName.meaning}
        </div>
        
        <div className="flex justify-center space-x-4 mb-4">
          <Button 
            variant="ghost"
            size="sm"
            className="p-2 rounded-full bg-muted hover:bg-muted/80"
            onClick={previousName}
            data-testid="button-previous-name"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="px-4 py-2 bg-accent/20 rounded-full text-sm font-medium" data-testid="text-name-number">
            {currentIndex + 1} / {asmaUlHusna.length}
          </span>
          <Button 
            variant="ghost"
            size="sm"
            className="p-2 rounded-full bg-muted hover:bg-muted/80"
            onClick={nextName}
            data-testid="button-next-name"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <Button 
          className="w-full bg-secondary text-secondary-foreground py-2 rounded-lg font-medium hover:bg-secondary/90"
          onClick={viewAllNames}
          data-testid="button-view-all-names"
        >
          View All 99 Names
        </Button>
      </div>
    </section>
  );
}
