export interface ConversionOptions {
    mode: 'traditional' | 'modern' | 'technical';
    preserveCase: boolean;
    vowelCancellerType: '+' | 'x' | ']' | '_';
    localizeText?: boolean;
}

export interface ConversionResult {
    text: string;
    metadata: {
        specialCases: string[];
        technicalTerms: string[];
        foreignWords: string[];
    };
}

export interface FontCancellerSupport {
    [key: string]: {
        [key in VowelCancellerType]: boolean;
    };
}

export type VowelCancellerType = '+' | 'x' | ']' | '_';

export interface VowelCancellerConfig {
    symbol: VowelCancellerType;
    name: string;
    description: string;
    isModern: boolean;
    fontDependent: boolean;
    defaultPosition: 'below' | 'after';
}