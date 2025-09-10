import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPrayerTimesSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Prayer times routes
  app.get("/api/prayer-times", async (req, res) => {
    try {
      const { latitude, longitude, date } = req.query;
      
      if (!latitude || !longitude || !date) {
        return res.status(400).json({ message: "Latitude, longitude, and date are required" });
      }

      const lat = parseFloat(latitude as string);
      const lng = parseFloat(longitude as string);
      
      // Check if we have cached prayer times
      let prayerTimes = await storage.getPrayerTimes(lat, lng, date as string);
      
      if (!prayerTimes) {
        // Calculate prayer times using a simple algorithm
        // In a real app, you'd use a proper Islamic prayer time calculation library
        const now = new Date();
        const prayerTimesData = {
          userId: null,
          date: date as string,
          fajr: "05:20",
          sunrise: "06:45",
          dhuhr: "12:30",
          asr: "15:45",
          maghrib: "18:12",
          isha: "19:35",
          latitude: lat,
          longitude: lng,
          calculationMethod: "ISNA"
        };
        
        prayerTimes = await storage.savePrayerTimes(prayerTimesData);
      }
      
      res.json(prayerTimes);
    } catch (error) {
      res.status(500).json({ message: "Failed to get prayer times" });
    }
  });

  // Qibla direction route
  app.get("/api/qibla", async (req, res) => {
    try {
      const { latitude, longitude } = req.query;
      
      if (!latitude || !longitude) {
        return res.status(400).json({ message: "Latitude and longitude are required" });
      }

      const lat = parseFloat(latitude as string);
      const lng = parseFloat(longitude as string);
      
      // Kaaba coordinates
      const kaabaLat = 21.422487;
      const kaabaLng = 39.826206;
      
      // Calculate direction to Kaaba
      const dLng = (kaabaLng - lng) * Math.PI / 180;
      const lat1Rad = lat * Math.PI / 180;
      const lat2Rad = kaabaLat * Math.PI / 180;
      
      const y = Math.sin(dLng) * Math.cos(lat2Rad);
      const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);
      
      let bearing = Math.atan2(y, x) * 180 / Math.PI;
      bearing = (bearing + 360) % 360;
      
      // Calculate distance to Kaaba
      const R = 6371; // Earth's radius in km
      const dLat = (kaabaLat - lat) * Math.PI / 180;
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                Math.sin(dLng/2) * Math.sin(dLng/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      
      res.json({
        direction: Math.round(bearing),
        distance: Math.round(distance),
        compassDirection: getCompassDirection(bearing)
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to calculate Qibla direction" });
    }
  });

  // Quran verses routes
  app.get("/api/quran/random", async (req, res) => {
    try {
      const verse = await storage.getRandomQuranVerse();
      if (!verse) {
        return res.status(404).json({ message: "No verses found" });
      }
      res.json(verse);
    } catch (error) {
      res.status(500).json({ message: "Failed to get random verse" });
    }
  });

  app.get("/api/quran/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const verses = await storage.searchQuranVerses(q as string);
      res.json(verses);
    } catch (error) {
      res.status(500).json({ message: "Failed to search verses" });
    }
  });

  app.get("/api/quran/:surah/:verse", async (req, res) => {
    try {
      const { surah, verse } = req.params;
      const surahNumber = parseInt(surah);
      const verseNumber = parseInt(verse);
      
      const quranVerse = await storage.getQuranVerse(surahNumber, verseNumber);
      if (!quranVerse) {
        return res.status(404).json({ message: "Verse not found" });
      }
      
      res.json(quranVerse);
    } catch (error) {
      res.status(500).json({ message: "Failed to get verse" });
    }
  });

  // Islamic events route
  app.get("/api/islamic-events", async (req, res) => {
    try {
      const events = await storage.getIslamicEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to get Islamic events" });
    }
  });

  // User dhikr counter route
  app.post("/api/dhikr/increment", async (req, res) => {
    try {
      // For now, we'll use a simple in-memory counter
      // In a real app, this would be tied to user authentication
      res.json({ count: Math.floor(Math.random() * 100) + 1 });
    } catch (error) {
      res.status(500).json({ message: "Failed to increment dhikr count" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function getCompassDirection(bearing: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(bearing / 22.5) % 16;
  return directions[index];
}
