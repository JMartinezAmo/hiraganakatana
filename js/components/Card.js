export class Card {
  constructor(container) {
    this.container = container;
    this.currentCharacter = null;
    this.isFlipped = false;
    this.onAnswerCallback = null;
    this.onNextCallback = null;
    this.init();
  }

  init() {
    this.createCardStructure();
    this.attachEventListeners();
  }

  createCardStructure() {
    this.container.innerHTML = `
      <div class="card" id="flashcard">
        <div class="card-inner">
          <div class="card-front">
            <div class="character-display" id="character">?</div>
            <div class="card-prompt">What is this character?</div>
          </div>
          <div class="card-back" id="card-back">
            <div class="answer-section">
              <input type="text" id="user-answer" placeholder="Type romanji..." autocomplete="off">
              <button id="check-answer" class="btn btn-primary">Check</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="result-section" id="result-section" style="display: none;">
        <div class="result-message" id="result-message"></div>
        <div class="correct-answer" id="correct-answer"></div>
        <button id="next-card" class="btn btn-secondary">Next Card</button>
      </div>
    `;
  }

  attachEventListeners() {
    const answerInput = this.container.querySelector('#user-answer');
    const checkButton = this.container.querySelector('#check-answer');
    const nextButton = this.container.querySelector('#next-card');

    // Check answer on button click
    checkButton.addEventListener('click', () => {
      this.checkAnswer();
    });

    // Check answer on Enter key
    answerInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.checkAnswer();
      }
    });

    // Next card button
    nextButton.addEventListener('click', () => {
      this.nextCard();
    });
  }

  displayCharacter(character) {
    this.currentCharacter = character;
    this.isFlipped = false;
    
    // Update character display
    const characterElement = this.container.querySelector('#character');
    characterElement.textContent = character.character;
    
    // Reset card state
    this.container.querySelector('#user-answer').value = '';
    this.container.querySelector('#result-section').style.display = 'none';
    this.container.querySelector('#flashcard').style.display = 'block';
    
    // Focus on input
    this.container.querySelector('#user-answer').focus();
  }

  checkAnswer() {
    if (!this.currentCharacter) return;

    const userAnswer = this.container.querySelector('#user-answer').value.trim();
    const isCorrect = this.currentCharacter.checkAnswer(userAnswer);
    
    // Show result
    this.showResult(isCorrect, userAnswer);
    
    // Call callback if provided
    if (this.onAnswerCallback) {
      this.onAnswerCallback(userAnswer, isCorrect);
    }
  }

  showResult(isCorrect, userAnswer) {
    const resultSection = this.container.querySelector('#result-section');
    const resultMessage = this.container.querySelector('#result-message');
    const correctAnswerElement = this.container.querySelector('#correct-answer');
    
    // Hide card, show result
    this.container.querySelector('#flashcard').style.display = 'none';
    resultSection.style.display = 'block';
    
    // Update result message
    if (isCorrect) {
      resultMessage.textContent = 'Correct! ✅';
      resultMessage.className = 'result-message correct';
      correctAnswerElement.style.display = 'none';
    } else {
      resultMessage.textContent = 'Incorrect ❌';
      resultMessage.className = 'result-message incorrect';
      correctAnswerElement.textContent = `Correct answer: ${this.currentCharacter.romanji}`;
      correctAnswerElement.style.display = 'block';
    }
    
    // Focus on next button
    this.container.querySelector('#next-card').focus();
  }

  nextCard() {
    if (this.onNextCallback) {
      this.onNextCallback();
    }
  }

  // Set callback functions
  onAnswer(callback) {
    this.onAnswerCallback = callback;
  }

  onNext(callback) {
    this.onNextCallback = callback;
  }

  // Show loading state
  showLoading() {
    const characterElement = this.container.querySelector('#character');
    characterElement.textContent = '...';
  }

  // Show empty state
  showEmpty() {
    const characterElement = this.container.querySelector('#character');
    characterElement.textContent = '?';
    this.container.querySelector('#result-section').style.display = 'none';
    this.container.querySelector('#flashcard').style.display = 'block';
  }
}