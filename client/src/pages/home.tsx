import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import PrayerTimes from "@/components/prayer-times";
import QiblaCompass from "@/components/qibla-compass";
import DhikrCounter from "@/components/dhikr-counter";
import IslamicCalendar from "@/components/islamic-calendar";
import QuranVerse from "@/components/quran-verse";
import AsmaUlHusna from "@/components/asma-ul-husna";
import BottomNavigation from "@/components/bottom-navigation";
import { getHijriDate } from "@/lib/islamic-calendar";

export default function HomePage() {
  const [location, setLocation] = useState<{ city: string; latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            city: "Current Location",
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        () => {
          // Default to New York if geolocation fails
          setLocation({
            city: "New York, NY",
            latitude: 40.7128,
            longitude: -74.0060
          });
        }
      );
    } else {
      setLocation({
        city: "New York, NY",
        latitude: 40.7128,
        longitude: -74.0060
      });
    }
  }, []);

  const hijriDate = getHijriDate(new Date());

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-4 rounded-b-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold" data-testid="app-title">Islamic Companion</h1>
            <p className="text-sm opacity-90" data-testid="location-text">
              {location?.city || "Loading..."}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Today</p>
            <p className="text-lg font-semibold" data-testid="hijri-date">{hijriDate}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {location && (
          <>
            <PrayerTimes latitude={location.latitude} longitude={location.longitude} />
            <QiblaCompass latitude={location.latitude} longitude={location.longitude} />
          </>
        )}
        
        <section className="p-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4">
            <DhikrCounter />
            <IslamicCalendar />
          </div>
        </section>

        <QuranVerse />
        <AsmaUlHusna />
      </main>

      <BottomNavigation currentPage="home" />
    </div>
  );
}
