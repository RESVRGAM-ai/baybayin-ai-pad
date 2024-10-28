/**
 * Baybayin Script Converter with Special Font Support
 * 
 * Font-Specific Features:
 * This converter includes special support for the Baybayin SIMPLE 2018 TRS font,
 * which implements a unique historical-modern distinction for the vowel 'A/a':
 * 
 * - Capital 'A' [ASCII 0041]: Displays the historical APIS root form (ᜇ-like glyph with extra curl)
 *   Used in educational contexts to show the character's historical evolution
 * 
 * - Lowercase 'a' [ASCII 0061]: Displays the modern simplified form (ᜀ-like glyph)
 *   Used for contemporary writing
 * 
 * This distinction is based on research from "Anatomya ng Baybayin" by John NL Leyson,
 * which traces the evolution of Baybayin characters from their APIS roots.
 * 
 * Special Cases:
 * 1. A/a distinction: Preserves case to trigger appropriate font glyphs
 * 2. "mga"/"Mga": Handled as "ma-nga" (ᜋᜅ) without vowel deleter on 'm',
 *    reflecting historical "manga"/"ma-nga" pronunciation
 */

// Type definition for vowel cancellation marks
type VowelCancellerType = {
    symbol: string;
    name: string;
    description: string;
    isModern: boolean;
    fontDependent: boolean;
  };
  
  const baybayinMap: { [key: string]: string } = {
    // Historical vs Modern 'A' forms
    // These ASCII characters trigger special glyphs in Baybayin SIMPLE 2018 TRS font
    'A': 'A',  // [0041] - Historical APIS root form
    'a': 'a',  // [0061] - Modern simplified form
    // Standard vowels
    'e': 'ᜁ', 'i': 'ᜁ', 'o': 'ᜂ', 'u': 'ᜂ',
    'ba': 'ᜊ', 'be': 'ᜊᜒ', 'bi': 'ᜊᜒ', 'bo': 'ᜊᜓ', 'bu': 'ᜊᜓ',
    'ka': 'ᜃ', 'ke': 'ᜃᜒ', 'ki': 'ᜃᜒ', 'ko': 'ᜃᜓ', 'ku': 'ᜃᜓ',
    'da': 'ᜇ', 'de': 'ᜇᜒ', 'di': 'ᜇᜒ', 'do': 'ᜇᜓ', 'du': 'ᜇᜓ',
    'ga': 'ᜄ', 'ge': 'ᜄᜒ', 'gi': 'ᜄᜒ', 'go': 'ᜄᜓ', 'gu': 'ᜄᜓ',
    'ha': 'ᜑ', 'he': 'ᜑᜒ', 'hi': 'ᜑᜒ', 'ho': 'ᜑᜓ', 'hu': 'ᜑᜓ',
    'la': 'ᜎ', 'le': 'ᜎᜒ', 'li': 'ᜎᜒ', 'lo': 'ᜎᜓ', 'lu': 'ᜎᜓ',
    'ma': 'ᜋ', 'me': 'ᜋᜒ', 'mi': 'ᜋᜒ', 'mo': 'ᜋᜓ', 'mu': 'ᜋᜓ',
    'na': 'ᜈ', 'ne': 'ᜈᜒ', 'ni': 'ᜈᜒ', 'no': 'ᜈᜓ', 'nu': 'ᜈᜓ',
    'nga': 'ᜅ', 'nge': 'ᜅᜒ', 'ngi': 'ᜅᜒ', 'ngo': 'ᜅᜓ', 'ngu': 'ᜅᜓ',
    'pa': 'ᜉ', 'pe': 'ᜉᜒ', 'pi': 'ᜉᜒ', 'po': 'ᜉᜓ', 'pu': 'ᜉᜓ',
    'ra': 'ᜍ', 're': 'ᜍᜒ', 'ri': 'ᜍᜒ', 'ro': 'ᜍᜓ', 'ru': 'ᜍᜓ',
    'sa': 'ᜐ', 'se': 'ᜐᜒ', 'si': 'ᜐᜒ', 'so': 'ᜐᜓ', 'su': 'ᜐᜓ',
    'ta': 'ᜆ', 'te': 'ᜆᜒ', 'ti': 'ᜆᜒ', 'to': 'ᜆᜓ', 'tu': 'ᜆᜓ',
    'wa': 'ᜏ', 'we': 'ᜏᜒ', 'wi': 'ᜏᜒ', 'wo': 'ᜏᜓ', 'wu': 'ᜏᜓ',
    'ya': 'ᜌ', 'ye': 'ᜌᜒ', 'yi': 'ᜌᜒ', 'yo': 'ᜌᜓ', 'yu': 'ᜌᜓ',
    // Special mapping for "mga" as a single unit
    'mga': 'ᜋᜄ',
    'Mga': 'ᜋᜄ',
    // Keep default deleter for standalone consonants
    'ng': 'ᜅ᜔', 'n': 'ᜈ᜔',
    'b': 'ᜊ᜔', 'k': 'ᜃ᜔', 'd': 'ᜇ᜔', 'g': 'ᜄ᜔', 'h': 'ᜑ᜔',
    'l': 'ᜎ᜔', 'm': 'ᜋ᜔', 'p': 'ᜉ᜔', 'r': 'ᜍ᜔', 's': 'ᜐ᜔',
    't': 'ᜆ᜔', 'w': 'ᜏ᜔', 'y': 'ᜌ᜔',
  };
  
  const baseConsonantMap: { [key: string]: string } = {
    'b': 'ᜊ', 'k': 'ᜃ', 'd': 'ᜇ', 'g': 'ᜄ', 'h': 'ᜑ',
    'l': 'ᜎ', 'm': 'ᜋ', 'p': 'ᜉ', 'r': 'ᜍ', 's': 'ᜐ',
    't': 'ᜆ', 'w': 'ᜏ', 'y': 'ᜌ', 'ng': 'ᜅ', 'n': 'ᜈ'
  };
  
  const VOWEL_CANCELLERS: { [key: string]: VowelCancellerType } = {
    'x': {
      symbol: 'x',
      name: 'Ekis',
      description: 'Traditional rotated cross symbol placed below the character to cancel vowel sound',
      isModern: false,
      fontDependent: true,
    },
    ']': {
      symbol: ']',
      name: 'Pamudpod',
      description: 'Traditional close bracket symbol placed next to the character to cancel vowel sound',
      isModern: false,
      fontDependent: true,
    },
    '_': {
      symbol: '_',
      name: 'Pangaltas',
      description: 'Modern vowel cancellation symbol developed by John NL Leyson, placed below the character',
      isModern: true,
      fontDependent: true,
    }
  };
  
  // Helper functions
  const isVowelCanceller = (char: string): boolean => {
    return char in VOWEL_CANCELLERS;
  };
  
  // Helper function to check if a word is standalone "mga"
/** 
 * Checks if a word is the standalone plural marker "mga"/"Mga".
 * This special case reflects the historical "ma-nga" pronunciation
 * and implements the special no-deleter rule for the initial 'm'.
 */
const isStandaloneMga = (word: string, fullText: string): boolean => {
    const mgaPattern = /\b[Mm]ga\b/;
    return mgaPattern.test(word);
  };
  
  /**
   * Converts Latin text to Baybayin script with special handling for:
   * 1. Historical vs modern 'A' glyphs (font-dependent)
   * 2. The "mga" plural marker as "ma-nga"
   * 3. Standard syllable rules and vowel cancellation
   * 
   * @param input - Latin text to convert
   * @returns Baybayin text with special cases handled
   */
  
  function convertToBaybayin(input: string): string {
    let output = '';
    const words = input.split(/(\s+)/);
  
    for (const word of words) {
      let tempOutput = '';
      
      // Special handling for standalone "mga"
      if (isStandaloneMga(word, input)) {
        tempOutput += 'ᜋᜅ';
        output += tempOutput;
        continue;
      }
  
      // Process word character by character
      for (let i = 0; i < word.length; i++) {
        const threeChars = word.slice(i, i + 3);
        const twoChars = word.slice(i, i + 2);
        const oneChar = word[i];
        const nextChar = word[i + 1];
        const afterNextChar = word[i + 2];
  
        // Direct case-sensitive handling for A/a
        if (oneChar === 'A' || oneChar === 'a') {
          tempOutput += baybayinMap[oneChar]; // Will preserve exact case
          continue;
        }
  
        // Rest of the processing remains the same...
        // (Previous logic for handling other characters)
        if (twoChars.toLowerCase() === 'ng') {
          if (afterNextChar && 'aeiou'.includes(afterNextChar.toLowerCase())) {
            if (baybayinMap[twoChars.toLowerCase() + afterNextChar.toLowerCase()]) {
              tempOutput += baybayinMap[twoChars.toLowerCase() + afterNextChar.toLowerCase()];
              i += 2;
              continue;
            }
          } else if (afterNextChar && isVowelCanceller(afterNextChar)) {
            tempOutput += baseConsonantMap['ng'] + afterNextChar;
            i += 2;
            continue;
          } else {
            tempOutput += baybayinMap['ng'];
            i++;
            continue;
          }
        }
  
        if (baseConsonantMap[oneChar.toLowerCase()] && nextChar && isVowelCanceller(nextChar)) {
          const baseChar = baseConsonantMap[oneChar.toLowerCase()].replace('᜔', '');
          tempOutput += baseChar + nextChar;
          i++;
          continue;
        }
  
        if (baybayinMap[threeChars.toLowerCase()]) {
          tempOutput += baybayinMap[threeChars.toLowerCase()];
          i += 2;
        } else if (baybayinMap[twoChars.toLowerCase()]) {
          tempOutput += baybayinMap[twoChars.toLowerCase()];
          i++;
        } else if (baybayinMap[oneChar.toLowerCase()]) {
          tempOutput += baybayinMap[oneChar.toLowerCase()];
        } else if (oneChar === '-') {
          tempOutput += '-';
        } else {
          tempOutput += word[i];
        }
      }
      output += tempOutput;
    }
  
    return output;
  }
  
  // Export the function
  export { convertToBaybayin };
  export default convertToBaybayin;