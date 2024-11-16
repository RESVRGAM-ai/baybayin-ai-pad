import { 
    TAGALOG_SOUND_MAPPINGS, 
    NAME_PATTERNS, 
    LOAN_WORD_PATTERNS 
} from './localization';

export class TagalogLocalizationProcessor {
    private static processNamePatterns(word: string): string {
        const lowerWord = word.toLowerCase();
        if (NAME_PATTERNS[lowerWord]) {
            return NAME_PATTERNS[lowerWord];
        }
        return word;
    }

    private static processSoundPatterns(word: string): string {
        let result = word.toLowerCase();
        
        // Process complex patterns first
        const patterns = Object.entries(TAGALOG_SOUND_MAPPINGS)
            .sort((a, b) => b[0].length - a[0].length); // Longer patterns first
        
        for (const [pattern, replacement] of patterns) {
            const regex = new RegExp(pattern, 'gi');
            result = result.replace(regex, replacement);
        }
        
        return result;
    }

    private static processLoanWords(word: string): string {
        const lowerWord = word.toLowerCase();
        if (LOAN_WORD_PATTERNS[lowerWord]) {
            return LOAN_WORD_PATTERNS[lowerWord];
        }
        return word;
    }

    static localizeWord(word: string): string {
        // Check if it's a known name pattern
        let processed = this.processNamePatterns(word);
        if (processed !== word) return processed;

        // Check if it's a known loan word
        processed = this.processLoanWords(word);
        if (processed !== word) return processed;

        // Apply sound pattern replacements
        return this.processSoundPatterns(word);
    }
} 