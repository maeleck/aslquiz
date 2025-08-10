import type { VocabTopic, StructuredVocab, VocabLevel } from '../types';

export const VOCAB_TREE: VocabTopic[] = [
    {
        id: 'basics',
        label: 'Basics',
        cost: 0,
        iconId: 'graduation-cap',
        prerequisites: [],
    },
    {
        id: 'family',
        label: 'Family',
        cost: 50,
        iconId: 'users',
        prerequisites: ['basics'],
    },
    {
        id: 'food',
        label: 'Food',
        cost: 75,
        iconId: 'cake',
        prerequisites: ['basics'],
    },
    {
        id: 'animals',
        label: 'Animals',
        cost: 100,
        iconId: 'paw-print',
        prerequisites: ['family', 'food'],
    }
];

export const STRUCTURED_VOCAB: StructuredVocab = {
    basics: {
        label: "Basics",
        levels: [
            { level: 1, words: ["Admit", "Official", "Pull", "Performance", "Shoulder", "Sure", "Window", "Part", "Population", "Order", "Similar", "Interesting", "Message", "Interview", "Laugh", "Nature", "Chance", "Probably", "Alone", "Structure"] },
            { level: 2, words: ["Last", "Expert", "Service", "Happen", "Usually", "Half", "Image", "Fail", "Large", "Vote", "Maybe", "Then", "Remove", "Return", "Seek", "Any", "Clear", "Fine", "Might", "Else"] },
            { level: 3, words: ["Right", "Front", "Important", "Game", "Likely", "List", "Occur", "Business", "Collection", "Necessary", "Knowledge", "First", "On", "Bed", "Day", "Team", "Various", "Both", "Against", "Industry"] },
            { level: 4, words: ["Art", "Different", "Social", "Toward", "Purpose", "Power", "Majority", "Finish", "Check", "Indicate", "Rule", "Over", "Through", "Pick", "Experience", "Fear", "Church", "Do", "Produce", "Certain"] },
            { level: 5, words: ["Before", "Plan", "Your", "Place", "Bit", "Yes", "Many", "Medical", "Draw", "With", "From", "Positive", "Beautiful", "Sense", "Lead", "Single", "Size", "Room", "Can", "Blue"] },
            { level: 6, words: ["Provide", "Fire", "Cultural", "Hit", "Perform", "Score", "Create", "Especially", "Not", "Magazine", "Until", "Economy", "Concern", "Specific", "Defense", "Own", "Technology", "However", "Next", "By"] },
            { level: 7, words: ["Detail", "A", "Very", "Get", "Of", "Week", "Why", "Another"] }
        ]
    },
    family: {
        label: "Family",
        levels: [
            { level: 1, words: ["Owner", "Citizen", "Manager", "Employee", "Girl", "Relationship", "Boy", "Daughter", "Person", "Yourself", "Her", "Him"] }
        ]
    },
    food: {
        label: "Food",
        levels: [
            { level: 1, words: ["Eat", "Cup", "Kitchen", "Oil", "Hot", "Five", "Four"] }
        ]
    },
    animals: {
        label: "Animals",
        levels: []
    }
};

const allWords = Object.values(STRUCTURED_VOCAB).flatMap(topic => 
    topic.levels.flatMap(level => level.words)
);
const uniqueWords = [...new Set(allWords)];

const CHUNK_SIZE = 20;
export const VOCAB_BY_COMMONALITY: VocabLevel[] = [];
for (let i = 0; i < uniqueWords.length; i += CHUNK_SIZE) {
    VOCAB_BY_COMMONALITY.push({
        level: (i / CHUNK_SIZE) + 1,
        words: uniqueWords.slice(i, i + CHUNK_SIZE),
    });
}