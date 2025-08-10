
import type { DictionaryEntry } from '../types';

const wordList = ["admit", "eat", "official", "five", "pull", "performance", "shoulder", "sure", "window", "part", "population", "cup", "order", "similar", "interesting", "owner", "citizen", "message", "interview", "laugh", "nature", "chance", "probably", "alone", "structure", "last", "expert", "service", "happen", "usually", "half", "image", "fail", "large", "vote", "manager", "maybe", "then", "four", "remove", "return", "seek", "any", "clear", "fine", "might", "else", "right", "front", "employee", "important", "game", "likely", "list", "occur", "business", "girl", "collection", "necessary", "knowledge", "relationship", "first", "on", "bed", "yourself", "day", "team", "various", "both", "against", "industry", "art", "different", "social", "toward", "purpose", "him", "power", "majority", "finish", "check", "indicate", "rule", "over", "through", "pick", "kitchen", "experience", "boy", "station", "fear", "church", "do", "produce", "certain", "before", "plan", "your", "place", "bit", "yes", "many", "daughter", "medical", "draw", "with", "from", "positive", "beautiful", "sense", "lead", "single", "size", "room", "can", "blue", "provide", "fire", "cultural", "hit", "perform", "score", "create", "especially", "not", "magazine", "until", "economy", "concern", "specific", "defense", "own", "technology", "however", "next", "person", "by", "detail", "a", "her", "very", "get", "of", "week", "why", "another", "oil", "hot"];
const wordsToRemove = new Set(["campaign", "congress", "democrat", "city", "effect", "herself", "oh", "onto", "moment", "morning", "series", "true", "whether"]);
const cleanedWordList = wordList.filter(word => !wordsToRemove.has(word));
const uniqueWordList = [...new Set(cleanedWordList)];
const wordBaseUrl = 'https://raw.githubusercontent.com/maeleck/asl_vocab_signs/main/asl1_mobm/';

export const WORD_DICTIONARY: DictionaryEntry[] = uniqueWordList.map(word => ({
    term: word.charAt(0).toUpperCase() + word.slice(1),
    mediaUrl: `${wordBaseUrl}${word}.webm`,
    mediaType: 'video' as const,
})).sort((a, b) => a.term.localeCompare(b.term));
