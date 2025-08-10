
import type { DictionaryEntry, Phrase } from '../types';
import { WORD_DICTIONARY } from './dictionary';

const wordMap = new Map<string, DictionaryEntry>(
    WORD_DICTIONARY.map(entry => [entry.term.toLowerCase(), entry])
);

// A list of phrases composed ONLY of words available in the WORD_DICTIONARY
const phraseStrings: string[] = [
    "Get a hot cup",
    "Your first game",
    "A beautiful relationship",
    "Clear day",
    "Do not laugh",
    "Her last chance",
    "Pick a part",
    "Return from business",
    "Check your message",
    "Another important detail",
    "A beautiful image",
    "Eat hot oil",
    "Provide a positive sense",
    "Do your business",
    "Your team manager"
];

export const PHRASES: Phrase[] = phraseStrings.map(phraseText => {
    const words = phraseText.toLowerCase().split(' ');
    const signs = words.map(word => wordMap.get(word)).filter(Boolean) as DictionaryEntry[];
    
    // Ensure every word in the phrase was found in our dictionary
    if (signs.length === words.length) {
        return {
            text: phraseText.charAt(0).toUpperCase() + phraseText.slice(1),
            signs: signs
        };
    }
    // Log an error if a phrase is invalid, to help with debugging in the future
    console.error(`Could not create phrase "${phraseText}" due to missing words.`);
    return null;
}).filter(Boolean) as Phrase[];
