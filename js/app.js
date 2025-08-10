// Main application file
import { getCharactersByMode } from './data/characters.js';
import { StudySession } from './models/StudySession.js';
import { RandomAlgorithm } from './algorithms/random.js';
import { MemoryStorage } from './storage/memory.js';
import { Card } from './components/Card.js';
import { Progress } from './components/Progress.js';
import { ModeSelector } from './components/ModeSelector.js';

class FlashcardApp {
  constructor() {
    this.currentSession = null;
    this.storage = new MemoryStorage();
    this.algorithm = new RandomAlgorithm();
    this.components = {};
    this.isSessionActive = false;
    
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    // Initialize components
    this.components.modeSelector = new ModeSelector(document.getElementById('mode-selector'));
    this.components.card = new Card(document.getElementById('card-container'));
    this.components.progress = new Progress(document.getElementById('progress-container'));
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Load saved settings
    this.loadSettings();
    
    console.log('Flashcard app initialized');
  }

  setupEventListeners() {
    // Mode selector events
    this.components.modeSelector.onModeChange((mode) => {
      this.handleModeChange(mode);
    });

    // Card component events
    this.components.card.onAnswer((userAnswer, isCorrect) => {
      this.handleAnswer(userAnswer, isCorrect);
    });

    this.components.card.onNext(() => {
      this.nextCard();
    });

    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      this.handleKeyboard(e);
    });
  }

  handleModeChange(mode) {
    console.log('Mode changed to:', mode.name);
    // Store the selected mode
    this.storage.saveSetting('currentMode', mode.id);
  }

  startSession() {
    const currentMode = this.components.modeSelector.getCurrentMode();
    if (!currentMode) {
      console.error('No mode selected');
      return;
    }

    console.log('Starting session with mode:', currentMode.name);
    
    // Get characters for the selected mode
    const characters = getCharactersByMode(currentMode.id);
    if (!characters || characters.length === 0) {
      console.error('No characters found for mode:', currentMode.id);
      return;
    }

    // Create new study session
    this.currentSession = new StudySession(characters, this.algorithm);
    this.isSessionActive = true;
    
    // Update UI
    this.components.modeSelector.startSession();
    this.components.progress.reset();
    
    // Start with first card
    this.nextCard();
  }

  handleAnswer(userAnswer, isCorrect) {
    if (!this.currentSession) return;

    // Process the answer
    const result = this.currentSession.checkAnswer(userAnswer);
    
    // Update progress display
    const stats = this.currentSession.getStats();
    this.components.progress.updateStats(stats);
    
    // Animate stat changes
    if (isCorrect) {
      this.components.progress.animateStatChange('correct-count', stats.correct);
      this.components.progress.animateStatChange('streak', stats.streak);
    } else {
      this.components.progress.animateStatChange('incorrect-count', stats.incorrect);
    }
    
    console.log('Answer result:', result);
  }

  nextCard() {
    if (!this.currentSession) {
      console.log('No active session, starting new session');
      this.startSession();
      return;
    }

    // Get next character
    const nextCharacter = this.currentSession.getNextCharacter();
    
    if (!nextCharacter) {
      console.error('No next character available');
      return;
    }

    // Display the character
    this.components.card.displayCharacter(nextCharacter);
    
    console.log('Showing character:', nextCharacter.character, '->', nextCharacter.romanji);
  }

  resetSession() {
    console.log('Resetting session');
    
    this.currentSession = null;
    this.isSessionActive = false;
    
    // Update UI
    this.components.modeSelector.resetSession();
    this.components.progress.reset();
    this.components.card.showEmpty();
  }

  handleKeyboard(e) {
    // Global keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'r':
          e.preventDefault();
          this.resetSession();
          break;
        case 'n':
          e.preventDefault();
          if (this.isSessionActive) {
            this.nextCard();
          } else {
            this.startSession();
          }
          break;
      }
    }
    
    // Space bar to start session or get next card
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
      e.preventDefault();
      if (this.isSessionActive) {
        // Only advance if we're showing results
        const resultSection = document.getElementById('result-section');
        if (resultSection && resultSection.style.display !== 'none') {
          this.nextCard();
        }
      } else {
        this.startSession();
      }
    }
  }

  loadSettings() {
    // Load saved mode
    const savedMode = this.storage.loadSetting('currentMode');
    if (savedMode) {
      this.components.modeSelector.setMode(savedMode);
    }
  }

  // Get current session stats (for debugging/external access)
  getSessionStats() {
    return this.currentSession ? this.currentSession.getStats() : null;
  }

  // Get application info
  getAppInfo() {
    return {
      version: '1.0.0',
      mode: this.components.modeSelector.getCurrentMode()?.name || 'None',
      sessionActive: this.isSessionActive,
      storage: this.storage.getStorageInfo(),
      algorithm: this.algorithm.getInfo()
    };
  }
}

// Initialize the application
const app = new FlashcardApp();

// Make app available globally for debugging
window.FlashcardApp = app;

// Export for potential module usage
export default FlashcardApp;