import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Clock, Sun, Moon, Star } from "lucide-react";
import { calculateNextPrayer, formatTimeRemaining } from "@/lib/prayer-times";
import type { PrayerTimes as PrayerTimesType } from "@shared/schema";

interface PrayerTimesProps {
  latitude: number;
  longitude: number;
}

export default function PrayerTimes({ latitude, longitude }: PrayerTimesProps) {
  const today = new Date().toISOString().split('T')[0];
  
  const { data: prayerTimes, isLoading } = useQuery<PrayerTimesType>({
    queryKey: ["/api/prayer-times", { latitude, longitude, date: today }],
  });

  if (isLoading) {
    return (
      <section className="p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-muted rounded w-1/3"></div>
          <div className="h-16 bg-muted rounded"></div>
          <div className="h-16 bg-muted rounded"></div>
        </div>
      </section>
    );
  }

  if (!prayerTimes) {
    return (
      <section className="p-4">
        <div className="text-center text-muted-foreground">
          Unable to load prayer times
        </div>
      </section>
    );
  }

  const prayers = [
    { name: "Fajr", time: prayerTimes.fajr, icon: Star },
    { name: "Sunrise", time: prayerTimes.sunrise, icon: Sun },
    { name: "Dhuhr", time: prayerTimes.dhuhr, icon: Sun },
    { name: "Asr", time: prayerTimes.asr, icon: Sun },
    { name: "Maghrib", time: prayerTimes.maghrib, icon: Moon },
    { name: "Isha", time: prayerTimes.isha, icon: Star },
  ];

  const { nextPrayer, currentPrayer, timeRemaining } = calculateNextPrayer(prayers);

  return (
    <section className="p-4" data-testid="section-prayer-times">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 flex items-center">
          <Clock className="mr-2 text-primary" />
          Prayer Times
        </h2>
        {nextPrayer && (
          <div className="text-sm text-muted-foreground mb-3">
            Next: <span className="font-medium text-foreground" data-testid="text-next-prayer">{nextPrayer.name}</span> 
            in <span className="font-medium text-accent" data-testid="text-time-remaining">{formatTimeRemaining(timeRemaining)}</span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {prayers.map((prayer) => {
          const isCurrent = currentPrayer?.name === prayer.name;
          const isNext = nextPrayer?.name === prayer.name;
          const IconComponent = prayer.icon;
          
          return (
            <Card 
              key={prayer.name} 
              className={`p-4 ${
                isCurrent 
                  ? "prayer-status-current" 
                  : isNext 
                  ? "prayer-status-next" 
                  : "bg-muted"
              }`}
              data-testid={`card-prayer-${prayer.name.toLowerCase()}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <IconComponent 
                    className={`mr-3 text-lg ${
                      isCurrent || isNext ? "text-white" : "text-muted-foreground"
                    }`} 
                  />
                  <div>
                    <h3 className={`font-semibold ${
                      isCurrent || isNext ? "text-white" : ""
                    }`}>
                      {prayer.name}
                    </h3>
                    {(isCurrent || isNext) && (
                      <p className="text-xs text-white/80">
                        {isCurrent ? "Current Prayer" : "Next Prayer"}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    isCurrent || isNext ? "text-white" : ""
                  }`} data-testid={`text-prayer-time-${prayer.name.toLowerCase()}`}>
                    {prayer.time}
                  </p>
                  {isCurrent && (
                    <p className="text-xs text-white/80">Started</p>
                  )}
                  {isNext && (
                    <p className="text-xs text-white/80">
                      in {formatTimeRemaining(timeRemaining)}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
