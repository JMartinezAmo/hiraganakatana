export class Character {
  constructor(id, character, romanji, type, category) {
    this.id = id;
    this.character = character;
    this.romanji = romanji;
    this.type = type; // 'hiragana' | 'katakana'
    this.category = category; // 'basic' | 'dakuten' | 'handakuten'
    
    // Future fields for spaced repetition system
    this.easiness = 2.5;
    this.interval = 1;
    this.repetitions = 0;
    this.nextReview = null;
    this.lastReviewed = null;
  }

  // Check if user answer matches the romanji
  checkAnswer(userAnswer) {
    return userAnswer.toLowerCase().trim() === this.romanji.toLowerCase();
  }

  // Update SRS parameters after review (for future implementation)
  updateSRS(grade) {
    // grade: 0-5 (0 = wrong, 5 = perfect)
    // Implementation placeholder for future SRS algorithm
    this.lastReviewed = new Date();
    
    if (grade >= 3) {
      if (this.repetitions === 0) {
        this.interval = 1;
      } else if (this.repetitions === 1) {
        this.interval = 6;
      } else {
        this.interval = Math.round(this.interval * this.easiness);
      }
      this.repetitions++;
    } else {
      this.repetitions = 0;
      this.interval = 1;
    }

    this.easiness = this.easiness + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    if (this.easiness < 1.3) this.easiness = 1.3;

    this.nextReview = new Date(Date.now() + this.interval * 24 * 60 * 60 * 1000);
  }

  // Check if character is due for review (for future implementation)
  isDue() {
    if (!this.nextReview) return true;
    return new Date() >= this.nextReview;
  }
}