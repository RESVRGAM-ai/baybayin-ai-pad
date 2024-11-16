import { ConversionOptions, ConversionResult } from './types';
import {
    baseConsonantMap,
    VOWEL_CANCELLERS
} from './utils';
import { TagalogLocalizationProcessor } from './localization-processor';

// Configuration Management Class
export class BaybayinConfig {
    private static instance: BaybayinConfig;
    private currentCanceller: keyof typeof VOWEL_CANCELLERS = '+';

    private constructor() {}

    static getInstance(): BaybayinConfig {
        if (!BaybayinConfig.instance) {
            BaybayinConfig.instance = new BaybayinConfig();
        }
        return BaybayinConfig.instance;
    }

    setVowelCanceller(canceller: keyof typeof VOWEL_CANCELLERS): void {
        if (canceller in VOWEL_CANCELLERS) {
            this.currentCanceller = canceller;
        }
    }

    getCurrentCanceller(): typeof VOWEL_CANCELLERS[keyof typeof VOWEL_CANCELLERS] {
        return VOWEL_CANCELLERS[this.currentCanceller];
    }
}

/**
 * Main conversion function with enhanced syllabic handling
 */
export function convertToBaybayin(
    input: string,
    options: Partial<ConversionOptions> = {}
): ConversionResult {
    const defaultOptions: ConversionOptions = {
        mode: 'modern',
        preserveCase: true,
        vowelCancellerType: '+',
        localizeText: true
    };

    const settings = { ...defaultOptions, ...options };
    const sanitizedInput = input.trim();
    const words = sanitizedInput.split(/(\s+|[,.!?-])/);
    let output = '';
    const metadata = {
        specialCases: [] as string[],
        technicalTerms: [] as string[],
        foreignWords: [] as string[]
    };

    for (const word of words) {
        // Handle punctuation and whitespace
        if (/^[,.!?-]$/.test(word) || /^\s+$/.test(word)) {
            output += word;
            continue;
        }

        // Process localization if enabled
        let processedWord = word;
        if (settings.localizeText) {
            const originalWord = word;
            processedWord = TagalogLocalizationProcessor.localizeWord(word);
            
            // Track changes in metadata
            if (processedWord !== originalWord) {
                if (/[A-Z]/.test(originalWord[0])) {
                    metadata.foreignWords.push(`${originalWord} → ${processedWord}`);
                } else {
                    metadata.technicalTerms.push(`${originalWord} → ${processedWord}`);
                }
            }
        }

        let convertedWord = '';
        let i = 0;

        // Special case for "mga"
        if (processedWord.toLowerCase() === 'mga') {
            output += 'ᜋᜅ';
            continue;
        }

        while (i < processedWord.length) {
            // Check for 'nga' trigraph first with proper syllable handling
            if (i + 2 < processedWord.length && 
                processedWord.substring(i, i + 3).toLowerCase() === 'nga') {
                convertedWord += 'ᜅ';  // Base nga character
                // Don't add vowel canceller for 'nga' syllable
                i += 3;  // Move past 'nga'
                continue;
            }

            // Check for 'ng' digraph (when not part of 'nga')
            if (i + 1 < processedWord.length && 
                processedWord.substring(i, i + 2).toLowerCase() === 'ng') {
                convertedWord += 'ᜅ';
                if (i + 2 < processedWord.length && isVowel(processedWord[i + 2])) {
                    convertedWord += getVowelMark(processedWord[i + 2]);
                    i += 3;
                } else {
                    convertedWord += settings.vowelCancellerType;
                    i += 2;
                }
                continue;
            }

            // Handle single consonants
            if (baseConsonantMap[processedWord[i]]) {
                convertedWord += baseConsonantMap[processedWord[i]];
                if (i + 1 < processedWord.length && isVowel(processedWord[i + 1])) {
                    convertedWord += getVowelMark(processedWord[i + 1]);
                    i += 2;
                } else {
                    convertedWord += settings.vowelCancellerType;
                    i++;
                }
                continue;
            }

            // Handle standalone vowels
            if (isVowel(processedWord[i])) {
                convertedWord += getStandaloneVowel(processedWord[i]);
                i++;
                continue;
            }

            // Skip unrecognized characters
            i++;
        }

        output += convertedWord;
    }

    return {
        text: output.trim(),
        metadata
    };
}

// Helper functions
function isVowel(char: string): boolean {
    return ['a', 'e', 'i', 'o', 'u'].includes(char.toLowerCase());
}

function getVowelMark(vowel: string): string {
    const marks = {
        'a': '',  // No mark needed for 'a'
        'e': 'ᜒ',
        'i': 'ᜒ',
        'o': 'ᜓ',
        'u': 'ᜓ'
    };
    return marks[vowel.toLowerCase()] || '';
}

function getStandaloneVowel(vowel: string): string {
    const vowels = {
        'a': 'ᜀ',
        'e': 'ᜁ',
        'i': 'ᜁ',
        'o': 'ᜂ',
        'u': 'ᜂ'
    };
    return vowels[vowel.toLowerCase()] || '';
}

export function getVowelCancellerOptions() {
    return Object.entries(VOWEL_CANCELLERS).map(([key, value]) => ({
        symbol: key,
        name: value.name,
        description: value.description,
        isModern: value.isModern
    }));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const baybayinMap = ...