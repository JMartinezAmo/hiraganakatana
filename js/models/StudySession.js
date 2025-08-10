export class StudySession {
  constructor(characters, algorithm) {
    this.characters = characters;
    this.algorithm = algorithm;
    this.currentCard = null;
    this.stats = {
      correct: 0,
      incorrect: 0,
      total: 0,
      streak: 0,
      longestStreak: 0
    };
    this.history = [];
    this.startTime = new Date();
  }

  // Get next character based on algorithm
  getNextCharacter() {
    this.currentCard = this.algorithm.selectNext(this.characters, this.history);
    return this.currentCard;
  }

  // Process user answer and update statistics
  checkAnswer(userAnswer) {
    if (!this.currentCard) return null;

    const isCorrect = this.currentCard.checkAnswer(userAnswer);
    
    // Update statistics
    this.stats.total++;
    if (isCorrect) {
      this.stats.correct++;
      this.stats.streak++;
      if (this.stats.streak > this.stats.longestStreak) {
        this.stats.longestStreak = this.stats.streak;
      }
    } else {
      this.stats.incorrect++;
      this.stats.streak = 0;
    }

    // Add to history
    const result = {
      character: this.currentCard,
      userAnswer,
      correct: isCorrect,
      timestamp: new Date()
    };
    this.history.push(result);

    // Update character SRS data (for future implementation)
    const grade = isCorrect ? 4 : 1; // Simple grade for now
    this.currentCard.updateSRS(grade);

    return result;
  }

  // Get session statistics
  getStats() {
    const accuracy = this.stats.total > 0 ? (this.stats.correct / this.stats.total) * 100 : 0;
    const duration = Math.floor((new Date() - this.startTime) / 1000);
    
    return {
      ...this.stats,
      accuracy: Math.round(accuracy * 100) / 100,
      duration
    };
  }

  // Reset session
  reset() {
    this.stats = {
      correct: 0,
      incorrect: 0,
      total: 0,
      streak: 0,
      longestStreak: 0
    };
    this.history = [];
    this.startTime = new Date();
    this.currentCard = null;
  }

  // Get recent mistakes for review
  getRecentMistakes(count = 5) {
    return this.history
      .filter(item => !item.correct)
      .slice(-count)
      .map(item => item.character);
  }
}