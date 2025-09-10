import { useState, useEffect } from "react";
import QiblaCompass from "@/components/qibla-compass";
import BottomNavigation from "@/components/bottom-navigation";

export default function QiblaPage() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => {
          setLocation({
            latitude: 40.7128,
            longitude: -74.0060
          });
        }
      );
    } else {
      setLocation({
        latitude: 40.7128,
        longitude: -74.0060
      });
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <header className="bg-secondary text-secondary-foreground p-4 rounded-b-lg shadow-lg">
        <h1 className="text-xl font-bold" data-testid="qibla-title">Qibla Direction</h1>
        <p className="text-sm opacity-90">Find the direction to Kaaba</p>
      </header>

      <main className="flex-1 p-4 flex items-center justify-center">
        {location ? (
          <QiblaCompass latitude={location.latitude} longitude={location.longitude} standalone />
        ) : (
          <div className="text-center">
            <p className="text-muted-foreground">Loading location...</p>
          </div>
        )}
      </main>

      <BottomNavigation currentPage="qibla" />
    </div>
  );
}
