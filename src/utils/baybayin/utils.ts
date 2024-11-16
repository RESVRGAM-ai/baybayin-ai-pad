// src/utils/baybayin/utils.ts

import { VowelCancellerType } from './types';

// Core character mappings
export const baybayinMap: { [key: string]: string } = {
    // Historical vs Modern 'A' forms
    'A': 'A',  // [0041] - Historical APIS root form
    'a': 'a',  // [0061] - Modern simplified form
    // Standard vowels
    'e': 'ᜁ', 'i': 'ᜁ', 'o': 'ᜂ', 'u': 'ᜂ',
    // Syllables with base consonants
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
    // Special mappings
    'mga': 'ᜋᜅ',
    'Mga': 'ᜋᜅ',
    // Standalone consonants with default canceller
    'ng': 'ᜅ᜔', 'n': 'ᜈ᜔',
    'b': 'ᜊ᜔', 'k': 'ᜃ᜔', 'd': 'ᜇ᜔', 'g': 'ᜄ᜔', 'h': 'ᜑ᜔',
    'l': 'ᜎ᜔', 'm': 'ᜋ᜔', 'p': 'ᜉ᜔', 'r': 'ᜍ᜔', 's': 'ᜐ᜔',
    't': 'ᜆ᜔', 'w': 'ᜏ᜔', 'y': 'ᜌ᜔',
};

// Base consonants without vowel cancellation
export const baseConsonantMap: { [key: string]: string } = {
    'b': 'ᜊ', 'k': 'ᜃ', 'd': 'ᜇ', 'g': 'ᜄ', 'h': 'ᜑ',
    'l': 'ᜎ', 'm': 'ᜋ', 'p': 'ᜉ', 'r': 'ᜍ', 's': 'ᜐ',
    't': 'ᜆ', 'w': 'ᜏ', 'y': 'ᜌ', 'ng': 'ᜅ', 'n': 'ᜈ'
};

// Vowel cancellation marks configuration
export const VOWEL_CANCELLERS: { [key: string]: VowelCancellerConfig } = {
    '+': {
        symbol: '+',
        name: 'Kurus',
        description: 'Traditional cross (Cruz)',
        isModern: false,
        fontDependent: true,
        defaultPosition: 'below'
    },
    'x': {
        symbol: 'x',
        name: 'Ekis',
        description: 'Rotated cross below character',
        isModern: false,
        fontDependent: true,
        defaultPosition: 'below'
    },
    ']': {
        symbol: ']',
        name: 'Pamudpod',
        description: 'Close bracket after character',
        isModern: false,
        fontDependent: true,
        defaultPosition: 'after'
    },
    '_': {
        symbol: '_',
        name: 'Pangaltas',
        description: 'Modern cancellation mark',
        isModern: true,
        fontDependent: true,
        defaultPosition: 'below'
    }
};

// Special character handling maps
export const specialDigraphMap: { [key: string]: string } = {
    'dya': 'ᜇ᜔ᜌ', 'dye': 'ᜇ᜔ᜌᜒ', 'dyi': 'ᜇ᜔ᜌᜒ', 'dyo': 'ᜇ᜔ᜌᜓ', 'dyu': 'ᜇ᜔ᜌᜓ',
    'tsa': 'ᜆ᜔ᜐ', 'tse': 'ᜆ᜔ᜐᜒ', 'tsi': 'ᜆ᜔ᜐᜒ', 'tso': 'ᜆ᜔ᜐᜓ', 'tsu': 'ᜆ᜔ᜐᜓ',
    'kwa': 'ᜃ᜔ᜏ', 'kwe': 'ᜃ᜔ᜏᜒ', 'kwi': 'ᜃ᜔ᜏᜒ', 'kwo': 'ᜃ᜔ᜏᜓ', 'kwu': 'ᜃ᜔ᜏᜓ',
    'qui': 'ᜃᜒ',
    'gue': 'ᜄᜒ'
};

// Helper functions
export const isVowel = (char: string): boolean => {
    return /[aeiouAEIOU]/.test(char);
};

export const isConsonant = (char: string): boolean => {
    return /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/.test(char);
};

export const isVowelCanceller = (char: string): boolean => {
    return char in VOWEL_CANCELLERS;
};

export const isStandaloneMga = (word: string): boolean => {
    return /\b[Mm]ga\b/.test(word);
};

export const handleForeignSound = (char: string): string => {
    const foreignSoundMap: { [key: string]: string } = {
        'f': 'p',
        'v': 'b',
        'z': 's',
        'c': 'k',
        'j': 'h',
        'ñ': 'ny',
        'q': 'k'
    };
    return foreignSoundMap[char.toLowerCase()] || char;
};

export const FONT_CANCELLER_SUPPORT: FontCancellerSupport = {
    'BaybayinSimple': {
        '+': true,  // Supports direct + key
        'x': true,  // Supports direct x key
        ']': true,  // Supports direct ] key
        '_': true   // Supports direct _ key
    },
    'BaybayinFilipinoRILL': {
        '+': true,
        'x': true,
        ']': true,
        '_': false
    },
    'TAWBIDPinta': {
        '+': true,
        'x': true,
        ']': true,
        '_': false
    }
};

export function getAvailableCancellersForFont(fontFamily: string): VowelCancellerType[] {
    const support = FONT_CANCELLER_SUPPORT[fontFamily];
    if (!support) return ['+'];  // Default to Kurus if font not found
    
    return Object.entries(support)
        .filter(([_, isSupported]) => isSupported)
        .map(([canceller]) => canceller as VowelCancellerType);
}