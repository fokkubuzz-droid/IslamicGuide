import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { BookOpen, Share } from "lucide-react";
import { useLocation } from "wouter";
import type { QuranVerse as QuranVerseType } from "@shared/schema";

export default function QuranVerse() {
  const [, setLocation] = useLocation();
  
  const { data: verse, isLoading } = useQuery<QuranVerseType>({
    queryKey: ["/api/quran/random"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const shareVerse = () => {
    if (verse && navigator.share) {
      navigator.share({
        title: `Quran ${verse.surahName} ${verse.surahNumber}:${verse.verseNumber}`,
        text: `${verse.arabic}\n\n"${verse.translation}"\n\n- Quran ${verse.surahNumber}:${verse.verseNumber}`,
      });
    }
  };

  const browseQuran = () => {
    setLocation("/quran");
  };

  if (isLoading) {
    return (
      <section className="p-4 border-t border-border">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/3"></div>
          <div className="h-20 bg-muted rounded-xl"></div>
        </div>
      </section>
    );
  }

  if (!verse) {
    return (
      <section className="p-4 border-t border-border">
        <div className="text-center text-muted-foreground">
          Unable to load verse
        </div>
      </section>
    );
  }

  return (
    <section className="p-4 border-t border-border" data-testid="section-quran-verse">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <BookOpen className="mr-2 text-secondary" />
        Verse of the Day
      </h2>
      
      <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-xl p-6 border border-border/50 mb-4">
        <div 
          className="text-right mb-4 text-2xl font-semibold leading-relaxed" 
          style={{ fontFamily: 'Times New Roman, serif' }}
          data-testid="text-verse-arabic"
        >
          {verse.arabic}
        </div>
        <div className="text-sm text-muted-foreground mb-2" data-testid="text-verse-translation">
          "{verse.translation}"
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground" data-testid="text-verse-reference">
            {verse.surahName} {verse.surahNumber}:{verse.verseNumber}
          </span>
          <Button 
            variant="ghost"
            size="sm"
            onClick={shareVerse}
            data-testid="button-share-verse"
          >
            <Share className="mr-1 h-3 w-3" />
            Share
          </Button>
        </div>
      </div>
      
      <Button 
        className="w-full bg-muted text-foreground py-3 rounded-lg font-medium hover:bg-muted/80"
        onClick={browseQuran}
        data-testid="button-browse-quran"
      >
        <BookOpen className="mr-2 h-4 w-4" />
        Browse Quran
      </Button>
    </section>
  );
}
