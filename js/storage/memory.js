// V1 Memory-only storage implementation
// Future: Can be replaced with localStorage, IndexedDB, or server storage

export class MemoryStorage {
  constructor() {
    this.sessionData = new Map();
    this.characterProgress = new Map();
    this.settings = {
      currentMode: 'hiragana_basic',
      volume: 0.5,
      autoAdvance: false,
      showHints: true
    };
  }

  // Session management
  saveSession(sessionId, sessionData) {
    this.sessionData.set(sessionId, {
      ...sessionData,
      savedAt: new Date()
    });
    return true;
  }

  loadSession(sessionId) {
    return this.sessionData.get(sessionId) || null;
  }

  deleteSession(sessionId) {
    return this.sessionData.delete(sessionId);
  }

  getAllSessions() {
    return Array.from(this.sessionData.entries()).map(([id, data]) => ({
      id,
      ...data
    }));
  }

  // Character progress tracking
  saveCharacterProgress(characterId, progress) {
    this.characterProgress.set(characterId, {
      ...progress,
      updatedAt: new Date()
    });
    return true;
  }

  loadCharacterProgress(characterId) {
    return this.characterProgress.get(characterId) || null;
  }

  getAllCharacterProgress() {
    return Array.from(this.characterProgress.entries()).map(([id, progress]) => ({
      id,
      ...progress
    }));
  }

  // Settings management
  saveSetting(key, value) {
    this.settings[key] = value;
    return true;
  }

  loadSetting(key) {
    return this.settings[key];
  }

  loadAllSettings() {
    return { ...this.settings };
  }

  // Clear all data
  clearAll() {
    this.sessionData.clear();
    this.characterProgress.clear();
    this.settings = {
      currentMode: 'hiragana_basic',
      volume: 0.5,
      autoAdvance: false,
      showHints: true
    };
    return true;
  }

  // Get storage info
  getStorageInfo() {
    return {
      type: 'memory',
      persistent: false,
      sessionCount: this.sessionData.size,
      characterProgressCount: this.characterProgress.size,
      warning: 'Data will be lost when page is refreshed'
    };
  }
}