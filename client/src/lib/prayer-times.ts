export interface Prayer {
  name: string;
  time: string;
  icon: any;
}

export function calculateNextPrayer(prayers: Prayer[]) {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  // Convert prayer times to minutes
  const prayerMinutes = prayers.map(prayer => {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    return {
      ...prayer,
      minutes: hours * 60 + minutes
    };
  });
  
  // Find current and next prayer
  let currentPrayer = null;
  let nextPrayer = null;
  let timeRemaining = 0;
  
  for (let i = 0; i < prayerMinutes.length; i++) {
    const prayer = prayerMinutes[i];
    const nextIndex = (i + 1) % prayerMinutes.length;
    const nextPrayerTime = prayerMinutes[nextIndex];
    
    // Check if current time is between this prayer and next
    if (i === prayerMinutes.length - 1) {
      // Last prayer of the day
      if (currentTime >= prayer.minutes) {
        currentPrayer = prayer;
        nextPrayer = prayerMinutes[0]; // First prayer of next day
        timeRemaining = (24 * 60) - currentTime + nextPrayer.minutes;
      }
    } else {
      if (currentTime >= prayer.minutes && currentTime < nextPrayerTime.minutes) {
        currentPrayer = prayer;
        nextPrayer = nextPrayerTime;
        timeRemaining = nextPrayerTime.minutes - currentTime;
        break;
      }
    }
  }
  
  // If no current prayer found, we're before the first prayer
  if (!currentPrayer && !nextPrayer) {
    nextPrayer = prayerMinutes[0];
    timeRemaining = prayerMinutes[0].minutes - currentTime;
  }
  
  return { currentPrayer, nextPrayer, timeRemaining };
}

export function formatTimeRemaining(minutes: number): string {
  if (minutes < 0) return "0m";
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}
