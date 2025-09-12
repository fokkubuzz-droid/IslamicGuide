import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  location: text("location"),
  latitude: real("latitude"),
  longitude: real("longitude"),
  calculationMethod: text("calculation_method").default("ISNA"),
  dhikrCount: integer("dhikr_count").default(0),
  favoriteVerses: text("favorite_verses").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const prayerTimes = pgTable("prayer_times", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  date: text("date").notNull(),
  fajr: text("fajr").notNull(),
  sunrise: text("sunrise").notNull(),
  dhuhr: text("dhuhr").notNull(),
  asr: text("asr").notNull(),
  maghrib: text("maghrib").notNull(),
  isha: text("isha").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  calculationMethod: text("calculation_method").notNull(),
});

export const quranVerses = pgTable("quran_verses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  surahNumber: integer("surah_number").notNull(),
  verseNumber: integer("verse_number").notNull(),
  arabic: text("arabic").notNull(),
  translation: text("translation").notNull(),
  transliteration: text("transliteration"),
  surahName: text("surah_name").notNull(),
});

export const islamicEvents = pgTable("islamic_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hijriDate: text("hijri_date").notNull(),
  gregorianDate: text("gregorian_date").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  isImportant: boolean("is_important").default(false),
});

export const islamicNames = pgTable("islamic_names", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(), // English name
  nameArabic: text("name_arabic").notNull(), // Arabic script
  nameBengali: text("name_bengali").notNull(), // Bengali script
  meaning: text("meaning").notNull(),
  meaningBengali: text("meaning_bengali").notNull(), // Bengali meaning
  origin: text("origin").notNull(),
  gender: text("gender").notNull(), // 'boy' | 'girl'
  category: text("category"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  location: true,
  latitude: true,
  longitude: true,
  calculationMethod: true,
});

export const insertPrayerTimesSchema = createInsertSchema(prayerTimes).omit({
  id: true,
});

export const insertQuranVerseSchema = createInsertSchema(quranVerses).omit({
  id: true,
});

export const insertIslamicEventSchema = createInsertSchema(islamicEvents).omit({
  id: true,
});

export const insertIslamicNameSchema = createInsertSchema(islamicNames).omit({
  id: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type PrayerTimes = typeof prayerTimes.$inferSelect;
export type InsertPrayerTimes = z.infer<typeof insertPrayerTimesSchema>;
export type QuranVerse = typeof quranVerses.$inferSelect;
export type InsertQuranVerse = z.infer<typeof insertQuranVerseSchema>;
export type IslamicEvent = typeof islamicEvents.$inferSelect;
export type InsertIslamicEvent = z.infer<typeof insertIslamicEventSchema>;
export type IslamicName = typeof islamicNames.$inferSelect;
export type InsertIslamicName = z.infer<typeof insertIslamicNameSchema>;

// Raw interface for names before Bengali translation is applied
export interface RawIslamicName {
  id?: string;
  name: string;
  nameArabic: string;
  nameBengali: string;
  meaning: string;
  meaningBengali?: string;
  origin: string;
  gender: "boy" | "girl" | "unisex";
  category: string;
}
