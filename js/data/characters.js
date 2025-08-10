import hiraganaData from './hiragana.js';
import katakanaData from './katakana.js';
import { Character } from '../models/Character.js';

function processCharacterData(rawData, type) {
  return rawData.map((char, index) => {
    const id = `${type}_${char.romanji}`;
    return new Character(id, char.character, char.romanji, type, 'basic');
  });
}

export const hiraganaCharacters = processCharacterData(hiraganaData, 'hiragana');
export const katakanaCharacters = processCharacterData(katakanaData, 'katakana');

export const allCharacters = {
  hiragana: hiraganaCharacters,
  katakana: katakanaCharacters
};

export function getCharactersByMode(mode) {
  switch (mode) {
    case 'hiragana_basic':
      return hiraganaCharacters;
    case 'katakana_basic':
      return katakanaCharacters;
    case 'mixed_basic':
      return [...hiraganaCharacters, ...katakanaCharacters];
    default:
      return hiraganaCharacters;
  }
}