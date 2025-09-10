export interface IslamicName {
  name: string;
  meaning: string;
  origin: string;
  gender: 'boy' | 'girl';
  category?: string;
}

export const islamicNames: IslamicName[] = [
  // Boys Names
  { name: "Abdullah", meaning: "Servant of Allah", origin: "Arabic", gender: "boy", category: "Popular" },
  { name: "Ahmad", meaning: "Most praiseworthy", origin: "Arabic", gender: "boy", category: "Prophetic" },
  { name: "Ali", meaning: "High, elevated", origin: "Arabic", gender: "boy", category: "Popular" },
  { name: "Amir", meaning: "Prince, commander", origin: "Arabic", gender: "boy", category: "Leadership" },
  { name: "Bilal", meaning: "Wetting, moisture", origin: "Arabic", gender: "boy", category: "Companion" },
  { name: "Daniyal", meaning: "God is my judge", origin: "Hebrew", gender: "boy", category: "Prophetic" },
  { name: "Faisal", meaning: "Decisive", origin: "Arabic", gender: "boy", category: "Leadership" },
  { name: "Hasan", meaning: "Good, beautiful", origin: "Arabic", gender: "boy", category: "Popular" },
  { name: "Ibrahim", meaning: "Father of many", origin: "Hebrew", gender: "boy", category: "Prophetic" },
  { name: "Ismail", meaning: "God will hear", origin: "Hebrew", gender: "boy", category: "Prophetic" },
  { name: "Junaid", meaning: "Young fighter", origin: "Arabic", gender: "boy", category: "Virtue" },
  { name: "Khalid", meaning: "Eternal", origin: "Arabic", gender: "boy", category: "Companion" },
  { name: "Luqman", meaning: "Prophet's name", origin: "Arabic", gender: "boy", category: "Prophetic" },
  { name: "Muhammad", meaning: "Praised one", origin: "Arabic", gender: "boy", category: "Prophetic" },
  { name: "Noor", meaning: "Light", origin: "Arabic", gender: "boy", category: "Spiritual" },
  { name: "Omar", meaning: "Long-lived", origin: "Arabic", gender: "boy", category: "Companion" },
  { name: "Qasim", meaning: "Distributor", origin: "Arabic", gender: "boy", category: "Virtue" },
  { name: "Rahman", meaning: "Merciful", origin: "Arabic", gender: "boy", category: "Divine" },
  { name: "Salam", meaning: "Peace", origin: "Arabic", gender: "boy", category: "Virtue" },
  { name: "Tariq", meaning: "Morning star", origin: "Arabic", gender: "boy", category: "Nature" },
  { name: "Usman", meaning: "Baby bustard", origin: "Arabic", gender: "boy", category: "Companion" },
  { name: "Yusuf", meaning: "God increases", origin: "Hebrew", gender: "boy", category: "Prophetic" },
  { name: "Zakariya", meaning: "God remembers", origin: "Hebrew", gender: "boy", category: "Prophetic" },
  { name: "Zain", meaning: "Beauty, grace", origin: "Arabic", gender: "boy", category: "Popular" },
  { name: "Arif", meaning: "Learned, expert", origin: "Arabic", gender: "boy", category: "Knowledge" },
  { name: "Basit", meaning: "One who enlarges", origin: "Arabic", gender: "boy", category: "Divine" },
  { name: "Fahad", meaning: "Panther", origin: "Arabic", gender: "boy", category: "Nature" },
  { name: "Hakim", meaning: "Wise", origin: "Arabic", gender: "boy", category: "Wisdom" },
  { name: "Idris", meaning: "Studious", origin: "Arabic", gender: "boy", category: "Prophetic" },
  { name: "Jamil", meaning: "Beautiful", origin: "Arabic", gender: "boy", category: "Beauty" },
  
  // Girls Names
  { name: "Aisha", meaning: "Living, prosperous", origin: "Arabic", gender: "girl", category: "Popular" },
  { name: "Amina", meaning: "Trustworthy", origin: "Arabic", gender: "girl", category: "Virtue" },
  { name: "Fatima", meaning: "Captivating", origin: "Arabic", gender: "girl", category: "Popular" },
  { name: "Khadija", meaning: "Premature child", origin: "Arabic", gender: "girl", category: "Historical" },
  { name: "Maryam", meaning: "Wished for child", origin: "Hebrew", gender: "girl", category: "Prophetic" },
  { name: "Zainab", meaning: "Fragrant flower", origin: "Arabic", gender: "girl", category: "Nature" },
  { name: "Hafsa", meaning: "Young lioness", origin: "Arabic", gender: "girl", category: "Historical" },
  { name: "Ruqayyah", meaning: "Gentle", origin: "Arabic", gender: "girl", category: "Historical" },
  { name: "Umm Kulthum", meaning: "Mother of Kulthum", origin: "Arabic", gender: "girl", category: "Historical" },
  { name: "Safiyyah", meaning: "Pure, sincere", origin: "Arabic", gender: "girl", category: "Virtue" },
  { name: "Layla", meaning: "Night", origin: "Arabic", gender: "girl", category: "Nature" },
  { name: "Nadia", meaning: "Caller", origin: "Arabic", gender: "girl", category: "Popular" },
  { name: "Rania", meaning: "Queenly", origin: "Arabic", gender: "girl", category: "Royal" },
  { name: "Salma", meaning: "Safe", origin: "Arabic", gender: "girl", category: "Virtue" },
  { name: "Yasmin", meaning: "Jasmine flower", origin: "Persian", gender: "girl", category: "Nature" },
  { name: "Zahra", meaning: "Bright, shining", origin: "Arabic", gender: "girl", category: "Beauty" },
  { name: "Aaliya", meaning: "High, sublime", origin: "Arabic", gender: "girl", category: "Popular" },
  { name: "Bushra", meaning: "Good news", origin: "Arabic", gender: "girl", category: "Joy" },
  { name: "Dania", meaning: "Close, near", origin: "Arabic", gender: "girl", category: "Popular" },
  { name: "Esma", meaning: "Name", origin: "Arabic", gender: "girl", category: "Divine" },
  { name: "Farah", meaning: "Joy", origin: "Arabic", gender: "girl", category: "Joy" },
  { name: "Hala", meaning: "Halo around the moon", origin: "Arabic", gender: "girl", category: "Nature" },
  { name: "Iman", meaning: "Faith", origin: "Arabic", gender: "girl", category: "Spiritual" },
  { name: "Jana", meaning: "Paradise", origin: "Arabic", gender: "girl", category: "Spiritual" },
  { name: "Karima", meaning: "Generous", origin: "Arabic", gender: "girl", category: "Virtue" },
  { name: "Lina", meaning: "Tender", origin: "Arabic", gender: "girl", category: "Beauty" },
  { name: "Malak", meaning: "Angel", origin: "Arabic", gender: "girl", category: "Spiritual" },
  { name: "Nour", meaning: "Light", origin: "Arabic", gender: "girl", category: "Spiritual" },
  { name: "Rahma", meaning: "Mercy", origin: "Arabic", gender: "girl", category: "Divine" },
  { name: "Samira", meaning: "Entertaining companion", origin: "Arabic", gender: "girl", category: "Social" },
  { name: "Tala", meaning: "Gold", origin: "Arabic", gender: "girl", category: "Precious" },
  
  // More Boys Names
  { name: "Abdur Rahman", meaning: "Servant of the Merciful", origin: "Arabic", gender: "boy", category: "Divine" },
  { name: "Abdul Aziz", meaning: "Servant of the Mighty", origin: "Arabic", gender: "boy", category: "Divine" },
  { name: "Hamza", meaning: "Strong", origin: "Arabic", gender: "boy", category: "Companion" },
  { name: "Saad", meaning: "Good fortune", origin: "Arabic", gender: "boy", category: "Fortune" },
  { name: "Talha", meaning: "Kind of tree", origin: "Arabic", gender: "boy", category: "Companion" },
  { name: "Anas", meaning: "Friendly", origin: "Arabic", gender: "boy", category: "Companion" },
  { name: "Sulaiman", meaning: "Man of peace", origin: "Hebrew", gender: "boy", category: "Prophetic" },
  { name: "Dawud", meaning: "Beloved", origin: "Hebrew", gender: "boy", category: "Prophetic" },
  { name: "Ayoub", meaning: "Job", origin: "Hebrew", gender: "boy", category: "Prophetic" },
  { name: "Yahya", meaning: "God is gracious", origin: "Hebrew", gender: "boy", category: "Prophetic" },
  
  // More Girls Names
  { name: "Asma", meaning: "Excellent, lofty", origin: "Arabic", gender: "girl", category: "Historical" },
  { name: "Sawsan", meaning: "Lily of the valley", origin: "Arabic", gender: "girl", category: "Nature" },
  { name: "Sumayya", meaning: "High above", origin: "Arabic", gender: "girl", category: "Historical" },
  { name: "Juwayriyya", meaning: "Young woman", origin: "Arabic", gender: "girl", category: "Historical" },
  { name: "Maymuna", meaning: "Blessed", origin: "Arabic", gender: "girl", category: "Historical" },
  { name: "Hind", meaning: "India", origin: "Arabic", gender: "girl", category: "Geographic" },
  { name: "Lubaba", meaning: "Innermost essence", origin: "Arabic", gender: "girl", category: "Virtue" },
  { name: "Ghalia", meaning: "Fragrant", origin: "Arabic", gender: "girl", category: "Beauty" },
  { name: "Reem", meaning: "White antelope", origin: "Arabic", gender: "girl", category: "Nature" },
  { name: "Laila", meaning: "Night beauty", origin: "Arabic", gender: "girl", category: "Beauty" }
];

export const nameCategories = [
  "All",
  "Popular",
  "Prophetic", 
  "Historical",
  "Virtue",
  "Divine",
  "Nature",
  "Beauty",
  "Spiritual",
  "Companion",
  "Leadership",
  "Knowledge",
  "Wisdom",
  "Joy",
  "Royal",
  "Precious",
  "Fortune",
  "Social",
  "Geographic"
];

export function getNamesByGender(gender: 'boy' | 'girl' | 'all'): IslamicName[] {
  if (gender === 'all') return islamicNames;
  return islamicNames.filter(name => name.gender === gender);
}

export function getNamesByCategory(category: string, gender?: 'boy' | 'girl' | 'all'): IslamicName[] {
  let filtered = category === 'All' ? islamicNames : islamicNames.filter(name => name.category === category);
  if (gender && gender !== 'all') {
    filtered = filtered.filter(name => name.gender === gender);
  }
  return filtered;
}

export function searchNames(query: string, gender?: 'boy' | 'girl' | 'all'): IslamicName[] {
  const searchTerm = query.toLowerCase();
  let filtered = islamicNames.filter(name =>
    name.name.toLowerCase().includes(searchTerm) ||
    name.meaning.toLowerCase().includes(searchTerm) ||
    name.origin.toLowerCase().includes(searchTerm) ||
    name.category?.toLowerCase().includes(searchTerm)
  );
  
  if (gender && gender !== 'all') {
    filtered = filtered.filter(name => name.gender === gender);
  }
  
  return filtered;
}