export class RandomAlgorithm {
  constructor() {
    this.name = 'random';
  }

  // Select next character randomly from available characters
  selectNext(characters, history = []) {
    if (!characters || characters.length === 0) {
      return null;
    }

    // Simple random selection for V1
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }

  // Future: Could implement weighted random based on performance
  selectNextWeighted(characters, history = []) {
    // Placeholder for future implementation
    // Could weight selection based on recent errors, SRS intervals, etc.
    return this.selectNext(characters, history);
  }

  // Get algorithm configuration info
  getInfo() {
    return {
      name: this.name,
      description: 'Random selection of characters',
      version: '1.0'
    };
  }
}