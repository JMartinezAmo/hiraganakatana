// Study modes configuration
export const studyModes = {
  hiragana_basic: {
    id: 'hiragana_basic',
    name: 'Hiragana Basic',
    description: 'Learn the 46 basic hiragana characters',
    characterSet: 'hiragana',
    difficulty: 'beginner',
    available: true
  },
  katakana_basic: {
    id: 'katakana_basic',
    name: 'Katakana Basic',
    description: 'Learn the 46 basic katakana characters',
    characterSet: 'katakana',
    difficulty: 'beginner',
    available: true
  },
  // Future modes (prepared but not yet available)
  hiragana_advanced: {
    id: 'hiragana_advanced',
    name: 'Hiragana Advanced',
    description: 'Hiragana with dakuten and handakuten',
    characterSet: 'hiragana',
    difficulty: 'intermediate',
    available: false // Will be enabled in future versions
  },
  katakana_advanced: {
    id: 'katakana_advanced',
    name: 'Katakana Advanced',
    description: 'Katakana with dakuten and handakuten',
    characterSet: 'katakana',
    difficulty: 'intermediate',
    available: false
  },
  mixed_basic: {
    id: 'mixed_basic',
    name: 'Mixed Basic',
    description: 'Mix of basic hiragana and katakana',
    characterSet: 'mixed',
    difficulty: 'intermediate',
    available: false // Future implementation
  },
  mixed_god: {
    id: 'mixed_god',
    name: 'God Mode',
    description: 'All characters mixed together',
    characterSet: 'all',
    difficulty: 'expert',
    available: false
  }
};

// Get available study modes
export function getAvailableModes() {
  return Object.values(studyModes).filter(mode => mode.available);
}

// Get mode by ID
export function getModeById(modeId) {
  return studyModes[modeId] || null;
}

// Get default mode
export function getDefaultMode() {
  return studyModes.hiragana_basic;
}