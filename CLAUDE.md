# Japanese Flashcard App - Architecture Documentation

## Project Overview

This is a web-based flashcard application designed for learning Japanese Hiragana and Katakana characters. The application is built with vanilla HTML, CSS, and JavaScript using a modular architecture that's prepared for future enhancements like spaced repetition algorithms and persistent storage.

## Architecture Decisions

### Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript ES6+ modules
- **Fonts**: Google Fonts (Noto Sans JP for Japanese characters, Roboto for UI)
- **Storage**: Memory-only (V1), prepared for localStorage/IndexedDB expansion
- **Module System**: ES6 imports/exports

### Design Principles
1. **Modular Architecture**: Clear separation of concerns with dedicated modules
2. **Future-Ready**: Architecture prepared for advanced features without breaking changes
3. **Clean UI**: Minimal, distraction-free design focused on learning
4. **Responsive**: Works on desktop, tablet, and mobile devices
5. **Accessible**: Keyboard navigation and high contrast support

## Project Structure

```
hiragana-flashcards/
├── index.html              # Main HTML entry point
├── css/
│   └── styles.css          # Complete responsive styling
├── js/
│   ├── data/               # Character data and processing
│   │   ├── hiragana.js     # 46 basic hiragana characters
│   │   ├── katakana.js     # 46 basic katakana characters
│   │   └── characters.js   # Data processing and exports
│   ├── models/             # Core data models
│   │   ├── Character.js    # Character model with SRS fields
│   │   └── StudySession.js # Study session management
│   ├── algorithms/         # Selection algorithms
│   │   └── random.js       # V1: Random character selection
│   ├── modes/              # Study mode definitions
│   │   └── index.js        # Available study modes
│   ├── storage/            # Data persistence layer
│   │   └── memory.js       # V1: In-memory storage
│   ├── components/         # UI components
│   │   ├── Card.js         # Flashcard display component
│   │   ├── Progress.js     # Progress tracking component
│   │   └── ModeSelector.js # Mode selection component
│   └── app.js              # Main application controller
├── CLAUDE.md               # This architecture documentation
└── README.md               # User-facing documentation
```

## Core Components

### Character Model (`js/models/Character.js`)
Represents a Japanese character with:
- Basic properties: `id`, `character`, `romanji`, `type`, `category`
- SRS fields (prepared): `easiness`, `interval`, `repetitions`, `nextReview`, `lastReviewed`
- Methods: `checkAnswer()`, `updateSRS()`, `isDue()`

### Study Session (`js/models/StudySession.js`)
Manages learning sessions with:
- Character selection via pluggable algorithms
- Answer checking and statistics tracking
- Session history and performance metrics
- Reset and review functionality

### UI Components

#### Card Component (`js/components/Card.js`)
- Displays Japanese characters
- Handles user input and answer checking
- Shows immediate feedback (correct/incorrect)
- Keyboard navigation support

#### Progress Component (`js/components/Progress.js`)
- Real-time session statistics
- Accuracy tracking and streak counting
- Session duration and progress visualization
- Completion celebration

#### Mode Selector (`js/components/ModeSelector.js`)
- Study mode selection interface
- Mode descriptions and difficulty indicators
- Session start/reset controls

## Data Flow

1. **Initialization**: App loads character data and initializes components
2. **Mode Selection**: User selects study mode (hiragana_basic/katakana_basic)
3. **Session Start**: StudySession created with selected characters
4. **Character Display**: Random algorithm selects character, Card displays it
5. **User Input**: User types romanji answer, Card validates
6. **Feedback Loop**: Result shown, stats updated, next character loaded
7. **Session Management**: Progress tracked, history maintained

## Future-Ready Architecture

### Spaced Repetition System (SRS)
The Character model includes SRS fields:
- `easiness`: Difficulty multiplier (default 2.5)
- `interval`: Days until next review
- `repetitions`: Number of successful reviews
- `nextReview`: Scheduled review date
- `lastReviewed`: Last study timestamp

### Storage Layer
Abstracted storage interface allows easy migration:
- V1: `memory.js` - In-memory only
- V2: `localStorage.js` - Browser local storage
- V3: `indexeddb.js` - Advanced client storage
- V4: `cloud.js` - Server synchronization

### Algorithm System
Pluggable selection algorithms:
- V1: `random.js` - Simple random selection
- V2: `weighted.js` - Performance-weighted selection
- V3: `srs.js` - Spaced repetition scheduling
- V4: `adaptive.js` - ML-powered difficulty adjustment

### Study Modes (Prepared)
- `hiragana_basic` ✅ Available
- `katakana_basic` ✅ Available
- `hiragana_advanced` 🚧 Prepared (dakuten/handakuten)
- `katakana_advanced` 🚧 Prepared (dakuten/handakuten)
- `mixed_basic` 🚧 Prepared (mixed hiragana/katakana)
- `mixed_god` 🚧 Prepared (all characters)

## Performance Considerations

- **Modular Loading**: ES6 modules for code splitting
- **Optimized Fonts**: Preloaded Google Fonts for Japanese characters
- **Efficient DOM Updates**: Minimal DOM manipulation in components
- **Responsive Images**: CSS optimization for various screen sizes
- **Memory Management**: Proper cleanup in storage abstraction

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support with shortcuts
- **High Contrast**: CSS media query support for high contrast mode
- **Screen Reader**: Semantic HTML with proper ARIA labels
- **Focus Management**: Clear focus indicators and logical tab order
- **Reduced Motion**: Respects user preference for reduced motion

## Browser Compatibility

- **ES6 Modules**: Modern browsers (Chrome 61+, Firefox 60+, Safari 10.1+)
- **CSS Grid**: Full support in target browsers
- **Google Fonts**: Universal font fallbacks
- **Progressive Enhancement**: Core functionality works without JavaScript

## Development Guidelines

### Adding New Characters
1. Update appropriate data file (`hiragana.js` or `katakana.js`)
2. Characters automatically processed by `characters.js`
3. No changes needed to core application logic

### Adding New Study Modes
1. Define mode in `modes/index.js`
2. Set `available: true` when ready
3. Update `getCharactersByMode()` if needed
4. Mode automatically appears in selector

### Adding New Algorithms
1. Create new file in `algorithms/` folder
2. Implement `selectNext(characters, history)` method
3. Update StudySession to use new algorithm
4. Algorithm can be swapped without UI changes

### Extending Storage
1. Implement storage interface in `storage/` folder
2. Maintain API compatibility with `memory.js`
3. Update app initialization to use new storage
4. Existing components work unchanged

## Testing Strategy

### Manual Testing Checklist
- [ ] Mode selection works correctly
- [ ] Characters display properly (Japanese fonts)
- [ ] Answer validation is accurate
- [ ] Statistics update in real-time
- [ ] Keyboard shortcuts function
- [ ] Mobile responsiveness
- [ ] Accessibility features

### Automated Testing (Future)
- Unit tests for Character and StudySession models
- Component testing for UI elements
- Integration testing for data flow
- E2E testing for complete user journeys

## Deployment Notes

### Static Hosting
App can be deployed to any static host:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront

### Requirements
- HTTPS (required for service workers in future)
- Modern browser support
- Google Fonts access

### Future PWA Features
- Service worker for offline functionality
- Web app manifest for installation
- Background sync for progress backup

## Known Limitations (V1)

1. **No Persistence**: Data lost on page refresh
2. **Simple Algorithm**: Pure random selection only
3. **Basic Modes**: Only hiragana_basic and katakana_basic
4. **No Audio**: No pronunciation guidance
5. **No Advanced Characters**: No dakuten/handakuten support

## Contribution Guidelines

### Code Style
- Use ES6+ features consistently
- Follow existing naming conventions
- Add JSDoc comments for public methods
- Maintain modular architecture

### Git Workflow
- Feature branches for new capabilities
- Clear commit messages
- Test before committing
- Update documentation

This architecture provides a solid foundation for a comprehensive Japanese learning application while maintaining simplicity and extensibility.