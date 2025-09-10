export function getHijriDate(date: Date): string {
  // Simple Hijri calendar conversion (approximation)
  // In a real app, you'd use a proper Islamic calendar library
  
  const gregorianYear = date.getFullYear();
  const gregorianMonth = date.getMonth() + 1;
  const gregorianDay = date.getDate();
  
  // Approximate conversion (this is not accurate for production use)
  const hijriYear = Math.floor((gregorianYear - 622) * 1.030684) + 1;
  const hijriMonthNames = [
    "Muharram", "Safar", "Rabi' al-awwal", "Rabi' al-thani",
    "Jumada al-awwal", "Jumada al-thani", "Rajab", "Sha'ban",
    "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
  ];
  
  // Simple month calculation (not accurate)
  const hijriMonth = ((gregorianMonth - 1 + Math.floor(gregorianDay / 29)) % 12);
  const hijriDay = ((gregorianDay - 1) % 29) + 1;
  
  return `${hijriDay} ${hijriMonthNames[hijriMonth]} ${hijriYear}`;
}

export function getGregorianFromHijri(hijriDateString: string): Date {
  // Simple reverse conversion (approximation)
  // This is a placeholder implementation
  return new Date();
}

export function isImportantIslamicDate(hijriDate: string): boolean {
  const importantDates = [
    "1 Muharram", // Islamic New Year
    "10 Muharram", // Day of Ashura
    "12 Rabi' al-awwal", // Mawlid al-Nabi
    "27 Rajab", // Isra and Mi'raj
    "1 Ramadan", // First day of Ramadan
    "27 Ramadan", // Laylat al-Qadr
    "1 Shawwal", // Eid al-Fitr
    "10 Dhu al-Hijjah", // Eid al-Adha
  ];
  
  return importantDates.some(date => hijriDate.includes(date));
}
