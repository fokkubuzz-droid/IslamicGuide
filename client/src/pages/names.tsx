import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNavigation from "@/components/bottom-navigation";
import { Search, Heart, Share, Baby, Languages } from "lucide-react";
import type { IslamicName } from "@shared/schema";

export default function NamesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGender, setSelectedGender] = useState<"all" | "boy" | "girl">("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState<"english" | "arabic" | "bengali">("english");

  const { data: allNames, isLoading } = useQuery<IslamicName[]>({
    queryKey: [`/api/islamic-names?gender=${selectedGender}&category=${encodeURIComponent(selectedCategory)}`],
  });

  const { data: searchResults, refetch: searchNames } = useQuery<IslamicName[]>({
    queryKey: [`/api/islamic-names/search?q=${encodeURIComponent(searchQuery)}&gender=${selectedGender}`],
    enabled: false,
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      searchNames();
    }
  };

  const handleShare = (name: IslamicName) => {
    if (navigator.share) {
      navigator.share({
        title: `Islamic Name: ${name.name}`,
        text: `${name.name} (${name.gender})\nMeaning: ${name.meaning}\nOrigin: ${name.origin}\n\nFrom Islamic Names App`,
      });
    }
  };

  const categories = [
    "All", "Popular", "Prophetic", "Historical", "Virtue", "Divine", 
    "Nature", "Beauty", "Spiritual", "Companion", "Leadership", 
    "Knowledge", "Wisdom", "Joy", "Royal", "Precious"
  ];

  const displayNames = searchQuery.trim() && searchResults ? searchResults : allNames || [];
  const boyNames = displayNames.filter(name => name.gender === 'boy');
  const girlNames = displayNames.filter(name => name.gender === 'girl');

  return (
    <div className="flex flex-col h-full">
      <header className="bg-accent text-accent-foreground p-4 rounded-b-lg shadow-lg">
        <h1 className="text-xl font-bold flex items-center" data-testid="names-title">
          <Baby className="mr-2" />
          Islamic Baby Names
        </h1>
        <p className="text-sm opacity-90">Beautiful names with meanings</p>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search names or meanings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              data-testid="input-search-names"
            />
            <Button onClick={handleSearch} data-testid="button-search-names">
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger data-testid="select-category">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedGender} onValueChange={(value: "all" | "boy" | "girl") => setSelectedGender(value)}>
              <SelectTrigger data-testid="select-gender">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="boy">Boys</SelectItem>
                <SelectItem value="girl">Girls</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <Languages className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedLanguage} onValueChange={(value: "english" | "arabic" | "bengali") => setSelectedLanguage(value)}>
              <SelectTrigger data-testid="select-language" className="w-[150px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="arabic">العربية</SelectItem>
                <SelectItem value="bengali">বাংলা</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        {!isLoading && (
          <div className="text-center text-sm text-muted-foreground">
            Found {displayNames.length} names 
            {selectedGender !== 'all' && ` for ${selectedGender}s`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </div>
        )}

        {/* Names Display */}
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-muted rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : selectedGender === 'all' ? (
          <Tabs defaultValue="boys" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="boys" data-testid="tab-boys">
                Boys ({boyNames.length})
              </TabsTrigger>
              <TabsTrigger value="girls" data-testid="tab-girls">
                Girls ({girlNames.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="boys" className="space-y-3 mt-4">
              {boyNames.length > 0 ? (
                boyNames.map((name) => (
                  <NameCard key={name.id} name={name} selectedLanguage={selectedLanguage} onShare={handleShare} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No boy names found
                </p>
              )}
            </TabsContent>
            
            <TabsContent value="girls" className="space-y-3 mt-4">
              {girlNames.length > 0 ? (
                girlNames.map((name) => (
                  <NameCard key={name.id} name={name} selectedLanguage={selectedLanguage} onShare={handleShare} />
                ))
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No girl names found
                </p>
              )}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="space-y-3">
            {displayNames.length > 0 ? (
              displayNames.map((name) => (
                <NameCard key={name.id} name={name} selectedLanguage={selectedLanguage} onShare={handleShare} />
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No names found
              </p>
            )}
          </div>
        )}
      </main>

      <BottomNavigation currentPage="names" />
    </div>
  );
}

interface NameCardProps {
  name: IslamicName;
  selectedLanguage: "english" | "arabic" | "bengali";
  onShare: (name: IslamicName) => void;
}

function NameCard({ name, selectedLanguage, onShare }: NameCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const getDisplayName = () => {
    switch (selectedLanguage) {
      case "arabic":
        return name.nameArabic;
      case "bengali":
        return name.nameBengali;
      default:
        return name.name;
    }
  };

  const getNameClass = () => {
    if (selectedLanguage === "arabic") {
      return "text-lg font-bold text-primary text-right";
    }
    return "text-lg font-bold text-primary";
  };

  return (
    <Card data-testid={`card-name-${name.name.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className={getNameClass()} data-testid={`text-name-${name.name.toLowerCase().replace(/\s+/g, '-')}`}>
              {getDisplayName()}
            </h3>
            {selectedLanguage !== "english" && (
              <p className="text-sm text-muted-foreground mt-1">
                {name.name}
              </p>
            )}
            <Badge 
              variant={name.gender === 'boy' ? 'default' : 'secondary'} 
              className="mb-2"
              data-testid={`badge-gender-${name.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {name.gender === 'boy' ? 'Boy' : 'Girl'}
            </Badge>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFavorite(!isFavorite)}
              data-testid={`button-favorite-${name.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare(name)}
              data-testid={`button-share-${name.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Meaning:</span> {name.meaning}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Origin:</span> {name.origin}
          </p>
          {name.category && (
            <Badge variant="outline" className="text-xs">
              {name.category}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}