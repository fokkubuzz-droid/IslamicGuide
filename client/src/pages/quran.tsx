import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BottomNavigation from "@/components/bottom-navigation";
import { Search, BookOpen, Share } from "lucide-react";
import type { QuranVerse } from "@shared/schema";

export default function QuranPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: randomVerse } = useQuery<QuranVerse>({
    queryKey: ["/api/quran/random"],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: searchResults, refetch: searchVerses } = useQuery<QuranVerse[]>({
    queryKey: ["/api/quran/search", searchQuery],
    enabled: false,
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchVerses();
    }
  };

  const handleShare = (verse: QuranVerse) => {
    if (navigator.share) {
      navigator.share({
        title: `Quran ${verse.surahName} ${verse.surahNumber}:${verse.verseNumber}`,
        text: `${verse.arabic}\n\n"${verse.translation}"\n\n- Quran ${verse.surahNumber}:${verse.verseNumber}`,
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="bg-secondary text-secondary-foreground p-4 rounded-b-lg shadow-lg">
        <h1 className="text-xl font-bold" data-testid="quran-title">Holy Quran</h1>
        <p className="text-sm opacity-90">Read and search verses</p>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Search Section */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search verses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              data-testid="input-search"
            />
            <Button onClick={handleSearch} data-testid="button-search">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {searchResults && searchResults.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Search Results</h2>
              {searchResults.map((verse) => (
                <Card key={`${verse.surahNumber}-${verse.verseNumber}`} data-testid={`card-verse-${verse.surahNumber}-${verse.verseNumber}`}>
                  <CardContent className="p-4">
                    <div className="text-right mb-3 text-xl font-semibold leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
                      {verse.arabic}
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      "{verse.translation}"
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        {verse.surahName} {verse.surahNumber}:{verse.verseNumber}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(verse)}
                        data-testid={`button-share-${verse.surahNumber}-${verse.verseNumber}`}
                      >
                        <Share className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {searchResults && searchResults.length === 0 && searchQuery && (
            <p className="text-muted-foreground text-center py-4">No verses found for "{searchQuery}"</p>
          )}
        </div>

        {/* Random Verse Section */}
        {randomVerse && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center">
              <BookOpen className="mr-2" />
              Featured Verse
            </h2>
            <Card data-testid="card-random-verse">
              <CardContent className="p-6">
                <div className="text-right mb-4 text-2xl font-semibold leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
                  {randomVerse.arabic}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  "{randomVerse.translation}"
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {randomVerse.surahName} {randomVerse.surahNumber}:{randomVerse.verseNumber}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(randomVerse)}
                    data-testid="button-share-random"
                  >
                    <Share className="h-3 w-3 mr-1" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <BottomNavigation currentPage="quran" />
    </div>
  );
}
