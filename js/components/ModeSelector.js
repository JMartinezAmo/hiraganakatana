import { getAvailableModes, getModeById } from '../modes/index.js';

export class ModeSelector {
  constructor(container) {
    this.container = container;
    this.currentMode = null;
    this.onModeChangeCallback = null;
    this.init();
  }

  init() {
    this.createSelectorStructure();
    this.loadAvailableModes();
    this.attachEventListeners();
  }

  createSelectorStructure() {
    this.container.innerHTML = `
      <div class="mode-selector">
        <h3>Study Mode</h3>
        <div class="mode-options" id="mode-options">
          <!-- Mode options will be loaded here -->
        </div>
        <div class="mode-description" id="mode-description">
          <p>Select a study mode to begin learning Japanese characters.</p>
        </div>
        <div class="mode-actions">
          <button id="start-session" class="btn btn-primary" disabled>
            Start Study Session
          </button>
          <button id="reset-session" class="btn btn-secondary" style="display: none;">
            Reset Session
          </button>
        </div>
      </div>
    `;
  }

  loadAvailableModes() {
    const modesContainer = this.container.querySelector('#mode-options');
    const availableModes = getAvailableModes();
    
    modesContainer.innerHTML = '';
    
    availableModes.forEach(mode => {
      const modeElement = document.createElement('div');
      modeElement.className = 'mode-option';
      modeElement.innerHTML = `
        <input type="radio" id="${mode.id}" name="study-mode" value="${mode.id}">
        <label for="${mode.id}" class="mode-label">
          <div class="mode-title">${mode.name}</div>
          <div class="mode-subtitle">${mode.description}</div>
          <div class="mode-difficulty difficulty-${mode.difficulty}">${mode.difficulty}</div>
        </label>
      `;
      modesContainer.appendChild(modeElement);
    });
    
    // Select first mode by default
    if (availableModes.length > 0) {
      const firstRadio = modesContainer.querySelector('input[type="radio"]');
      firstRadio.checked = true;
      this.selectMode(availableModes[0].id);
    }
  }

  attachEventListeners() {
    const modeOptions = this.container.querySelector('#mode-options');
    const startButton = this.container.querySelector('#start-session');
    const resetButton = this.container.querySelector('#reset-session');
    
    // Mode selection
    modeOptions.addEventListener('change', (e) => {
      if (e.target.type === 'radio') {
        this.selectMode(e.target.value);
      }
    });
    
    // Start session button
    startButton.addEventListener('click', () => {
      this.startSession();
    });
    
    // Reset session button  
    resetButton.addEventListener('click', () => {
      this.resetSession();
    });
  }

  selectMode(modeId) {
    const mode = getModeById(modeId);
    if (!mode) return;
    
    this.currentMode = mode;
    
    // Update description
    const descriptionElement = this.container.querySelector('#mode-description');
    descriptionElement.innerHTML = `
      <h4>${mode.name}</h4>
      <p>${mode.description}</p>
      <div class="mode-details">
        <span class="detail-item">Difficulty: <strong>${mode.difficulty}</strong></span>
        <span class="detail-item">Character Set: <strong>${mode.characterSet}</strong></span>
      </div>
    `;
    
    // Enable start button
    this.container.querySelector('#start-session').disabled = false;
    
    // Call callback if provided
    if (this.onModeChangeCallback) {
      this.onModeChangeCallback(mode);
    }
  }

  startSession() {
    if (!this.currentMode) return;
    
    // Hide mode selector, show reset button
    this.container.querySelector('.mode-options').style.display = 'none';
    this.container.querySelector('#start-session').style.display = 'none';
    this.container.querySelector('#reset-session').style.display = 'inline-block';
    
    // Update description to show current session
    const descriptionElement = this.container.querySelector('#mode-description');
    descriptionElement.innerHTML = `
      <h4>Current Session: ${this.currentMode.name}</h4>
      <p>Study session in progress...</p>
    `;
  }

  resetSession() {
    // Show mode selector, hide reset button
    this.container.querySelector('.mode-options').style.display = 'block';
    this.container.querySelector('#start-session').style.display = 'inline-block';
    this.container.querySelector('#reset-session').style.display = 'none';
    
    // Restore mode description
    if (this.currentMode) {
      this.selectMode(this.currentMode.id);
    }
  }

  getCurrentMode() {
    return this.currentMode;
  }

  setMode(modeId) {
    const radio = this.container.querySelector(`input[value="${modeId}"]`);
    if (radio) {
      radio.checked = true;
      this.selectMode(modeId);
    }
  }

  onModeChange(callback) {
    this.onModeChangeCallback = callback;
  }

  disable() {
    const inputs = this.container.querySelectorAll('input, button');
    inputs.forEach(input => input.disabled = true);
  }

  enable() {
    const inputs = this.container.querySelectorAll('input, button');
    inputs.forEach(input => input.disabled = false);
  }
}