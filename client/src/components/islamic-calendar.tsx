import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { getHijriDate } from "@/lib/islamic-calendar";
import { useLocation } from "wouter";

export default function IslamicCalendar() {
  const [, setLocation] = useLocation();
  const today = new Date();
  const hijriDate = getHijriDate(today);
  const [day, monthYear] = hijriDate.split(' ', 2);

  const viewCalendar = () => {
    setLocation("/calendar");
  };

  return (
    <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl p-4 text-center border border-primary/20" data-testid="islamic-calendar">
      <Calendar className="text-2xl text-primary mb-2 mx-auto" />
      <h3 className="font-semibold mb-2">Islamic Calendar</h3>
      <div className="text-lg font-bold text-primary mb-1" data-testid="text-hijri-day">
        {day}
      </div>
      <div className="text-sm text-muted-foreground mb-2" data-testid="text-hijri-month-year">
        {monthYear}
      </div>
      <Button 
        className="w-full bg-primary text-primary-foreground py-2 rounded-md text-sm font-medium hover:bg-primary/90"
        onClick={viewCalendar}
        data-testid="button-view-calendar"
      >
        View Calendar
      </Button>
    </div>
  );
}
