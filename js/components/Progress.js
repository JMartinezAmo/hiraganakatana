export class Progress {
  constructor(container) {
    this.container = container;
    this.init();
  }

  init() {
    this.createProgressStructure();
  }

  createProgressStructure() {
    this.container.innerHTML = `
      <div class="progress-container">
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value" id="correct-count">0</div>
            <div class="stat-label">Correct</div>
          </div>
          <div class="stat-item">
            <div class="stat-value" id="incorrect-count">0</div>
            <div class="stat-label">Incorrect</div>
          </div>
          <div class="stat-item">
            <div class="stat-value" id="accuracy">0%</div>
            <div class="stat-label">Accuracy</div>
          </div>
          <div class="stat-item">
            <div class="stat-value" id="streak">0</div>
            <div class="stat-label">Streak</div>
          </div>
        </div>
        
        <div class="progress-bar-container">
          <div class="progress-bar" id="progress-bar">
            <div class="progress-fill" id="progress-fill" style="width: 0%"></div>
          </div>
          <div class="progress-text" id="progress-text">0 / 0</div>
        </div>
        
        <div class="session-info">
          <div class="session-item">
            <span class="session-label">Time:</span>
            <span class="session-value" id="session-time">0:00</span>
          </div>
          <div class="session-item">
            <span class="session-label">Best Streak:</span>
            <span class="session-value" id="best-streak">0</span>
          </div>
        </div>
      </div>
    `;
  }

  updateStats(stats) {
    // Update stat counters
    this.container.querySelector('#correct-count').textContent = stats.correct;
    this.container.querySelector('#incorrect-count').textContent = stats.incorrect;
    this.container.querySelector('#accuracy').textContent = `${stats.accuracy || 0}%`;
    this.container.querySelector('#streak').textContent = stats.streak;
    this.container.querySelector('#best-streak').textContent = stats.longestStreak;
    
    // Update progress text
    this.container.querySelector('#progress-text').textContent = 
      `${stats.total} questions answered`;
    
    // Update time
    this.updateTime(stats.duration || 0);
  }

  updateTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const timeString = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    this.container.querySelector('#session-time').textContent = timeString;
  }

  updateProgress(current, total) {
    const percentage = total > 0 ? (current / total) * 100 : 0;
    const progressFill = this.container.querySelector('#progress-fill');
    const progressText = this.container.querySelector('#progress-text');
    
    progressFill.style.width = `${percentage}%`;
    progressText.textContent = `${current} / ${total}`;
  }

  showSessionComplete(stats) {
    // Add session complete indicator
    const container = this.container.querySelector('.progress-container');
    
    // Remove existing completion message if any
    const existingMessage = container.querySelector('.completion-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Add completion message
    const completionMessage = document.createElement('div');
    completionMessage.className = 'completion-message';
    completionMessage.innerHTML = `
      <div class="completion-content">
        <h3>Session Complete!</h3>
        <p>Final Accuracy: ${stats.accuracy}%</p>
        <p>Total Time: ${this.formatTime(stats.duration)}</p>
        <p>Best Streak: ${stats.longestStreak}</p>
      </div>
    `;
    
    container.appendChild(completionMessage);
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  reset() {
    // Reset all displays to zero
    this.updateStats({
      correct: 0,
      incorrect: 0,
      total: 0,
      accuracy: 0,
      streak: 0,
      longestStreak: 0,
      duration: 0
    });
    
    this.updateProgress(0, 0);
    
    // Remove completion message if present
    const completionMessage = this.container.querySelector('.completion-message');
    if (completionMessage) {
      completionMessage.remove();
    }
  }

  // Animate stat changes
  animateStatChange(statId, newValue) {
    const element = this.container.querySelector(`#${statId}`);
    if (element) {
      element.classList.add('stat-highlight');
      setTimeout(() => {
        element.classList.remove('stat-highlight');
      }, 500);
    }
  }
}