import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/bottom-navigation";
import { Calendar, Star } from "lucide-react";
import { getHijriDate, getGregorianFromHijri } from "@/lib/islamic-calendar";
import type { IslamicEvent } from "@shared/schema";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { data: events } = useQuery<IslamicEvent[]>({
    queryKey: ["/api/islamic-events"],
  });

  const hijriDate = getHijriDate(selectedDate);
  const currentDate = new Date();
  const currentHijriDate = getHijriDate(currentDate);

  return (
    <div className="flex flex-col h-full">
      <header className="bg-primary text-primary-foreground p-4 rounded-b-lg shadow-lg">
        <h1 className="text-xl font-bold" data-testid="calendar-title">Islamic Calendar</h1>
        <p className="text-sm opacity-90">Hijri dates and Islamic events</p>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Current Date Display */}
        <Card data-testid="card-current-date">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">{currentHijriDate}</CardTitle>
            <p className="text-muted-foreground">
              {currentDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </CardHeader>
        </Card>

        {/* Important Islamic Events */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Star className="mr-2 text-accent" />
            Important Events
          </h2>
          
          {events && events.length > 0 ? (
            <div className="space-y-3">
              {events.map((event) => (
                <Card key={event.id} data-testid={`card-event-${event.id}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{event.title}</h3>
                      {event.isImportant && (
                        <Badge variant="secondary" data-testid="badge-important">
                          Important
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {event.description}
                    </p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span data-testid={`text-hijri-${event.id}`}>{event.hijriDate}</span>
                      <span data-testid={`text-gregorian-${event.id}`}>
                        {new Date(event.gregorianDate).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No events loaded</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Calendar Conversion Tool */}
        <Card data-testid="card-conversion">
          <CardHeader>
            <CardTitle className="text-lg">Date Conversion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">Today (Gregorian)</p>
                <p className="text-lg" data-testid="text-gregorian-today">
                  {currentDate.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium">Today (Hijri)</p>
                <p className="text-lg font-semibold text-primary" data-testid="text-hijri-today">
                  {currentHijriDate}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation currentPage="calendar" />
    </div>
  );
}
