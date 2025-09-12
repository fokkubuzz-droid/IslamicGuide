import { bengaliGlossary, servantPatterns } from './bengali-glossary';

/**
 * Translates English Islamic name meanings to Bengali
 */
export function translateToBengali(
  meaning: string, 
  name?: string, 
  origin?: string, 
  category?: string
): string {
  // Remove extra whitespace and normalize
  const normalizedMeaning = meaning.trim().replace(/\s+/g, ' ');
  
  // Check for direct servant patterns first
  if (servantPatterns[normalizedMeaning]) {
    return servantPatterns[normalizedMeaning];
  }
  
  // Check for "Servant of the X" pattern
  const servantMatch = normalizedMeaning.match(/^Servant of the (.+)$/i);
  if (servantMatch) {
    const attribute = servantMatch[1];
    const bengaliAttribute = bengaliGlossary[attribute];
    if (bengaliAttribute) {
      return `${bengaliAttribute}এর বান্দা`;
    }
  }
  
  // Check for "Servant of X" pattern (without "the")
  const servantMatchSimple = normalizedMeaning.match(/^Servant of (.+)$/i);
  if (servantMatchSimple) {
    const attribute = servantMatchSimple[1];
    const bengaliAttribute = bengaliGlossary[attribute];
    if (bengaliAttribute) {
      return `${bengaliAttribute}র বান্দা`;
    }
  }
  
  // Check for direct translations in glossary
  if (bengaliGlossary[normalizedMeaning]) {
    return bengaliGlossary[normalizedMeaning];
  }
  
  // Try word-by-word translation for compound meanings
  const words = normalizedMeaning.split(' ');
  const translatedWords: string[] = [];
  
  for (const word of words) {
    // Remove punctuation for lookup
    const cleanWord = word.replace(/[.,;:!?]/g, '');
    const bengaliWord = bengaliGlossary[cleanWord] || bengaliGlossary[cleanWord.toLowerCase()];
    
    if (bengaliWord) {
      translatedWords.push(bengaliWord);
    } else {
      // Keep the original word if no translation found
      translatedWords.push(word);
    }
  }
  
  // Join translated words
  let result = translatedWords.join(' ');
  
  // Clean up common patterns
  result = result.replace(/\s+/g, ' ').trim();
  
  // If no translation was possible, return the original meaning
  if (result === normalizedMeaning || result.includes('undefined')) {
    return normalizedMeaning;
  }
  
  return result;
}

/**
 * Enhanced translation with context-aware patterns
 */
export function translateWithContext(
  meaning: string,
  name: string,
  origin?: string,
  category?: string
): string {
  // Special handling for names with known patterns
  if (name.startsWith('Abd') || name.startsWith('Abdul')) {
    // This is likely a "Servant of" name
    if (!meaning.toLowerCase().includes('servant')) {
      // If meaning doesn't mention servant, try to infer it
      const bengaliAttribute = bengaliGlossary[meaning];
      if (bengaliAttribute) {
        return `${bengaliAttribute}এর বান্দা`;
      }
    }
  }
  
  // Use the main translation function
  return translateToBengali(meaning, name, origin, category);
}

/**
 * Batch translation utility for converting all names
 */
export function batchTranslate(
  names: Array<{ meaning: string; name: string; origin?: string; category?: string }>
): Array<{ meaning: string; meaningBengali: string }> {
  const results: Array<{ meaning: string; meaningBengali: string }> = [];
  const unknownMeanings = new Set<string>();
  
  for (const nameData of names) {
    const bengaliMeaning = translateWithContext(
      nameData.meaning,
      nameData.name,
      nameData.origin,
      nameData.category
    );
    
    results.push({
      meaning: nameData.meaning,
      meaningBengali: bengaliMeaning
    });
    
    // Track meanings that couldn't be translated
    if (bengaliMeaning === nameData.meaning) {
      unknownMeanings.add(nameData.meaning);
    }
  }
  
  // Log unknown meanings for improvement
  if (unknownMeanings.size > 0) {
    console.log('Unknown meanings for Bengali translation:', Array.from(unknownMeanings));
  }
  
  return results;
}