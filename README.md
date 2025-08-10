# Japanese Flashcards - Hiragana & Katakana Learning App

A clean, modern web application for learning Japanese Hiragana and Katakana characters through interactive flashcards. Built with vanilla HTML, CSS, and JavaScript using a modular architecture designed for future enhancements.

## Features

✅ **Complete Character Sets**: 46 basic Hiragana and 46 basic Katakana characters  
✅ **Interactive Flashcards**: Type answers and get instant feedback  
✅ **Real-time Progress**: Track accuracy, streaks, and session statistics  
✅ **Multiple Study Modes**: Separate Hiragana and Katakana practice  
✅ **Responsive Design**: Works on desktop, tablet, and mobile devices  
✅ **Keyboard Shortcuts**: Efficient navigation for power users  
✅ **Clean UI**: Distraction-free design focused on learning  
✅ **Future-Ready**: Architecture prepared for spaced repetition and advanced features  

## Getting Started

### Quick Start
1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. Select a study mode (Hiragana Basic or Katakana Basic)
4. Click "Start Study Session" and begin learning!

### System Requirements
- Modern web browser (Chrome 61+, Firefox 60+, Safari 10.1+)
- JavaScript enabled
- Internet connection (for Google Fonts)

## How to Use

### Study Modes
- **Hiragana Basic**: Learn all 46 basic hiragana characters (あ, い, う, え, お, か, き...)
- **Katakana Basic**: Learn all 46 basic katakana characters (ア, イ, ウ, エ, オ, カ, キ...)

### Study Process
1. **Select Mode**: Choose between Hiragana or Katakana
2. **Start Session**: Click "Start Study Session"
3. **View Character**: A Japanese character will be displayed
4. **Type Answer**: Enter the romanji (English pronunciation)
5. **Get Feedback**: See if you're correct and learn from mistakes
6. **Continue**: Click "Next Card" or press Space to continue

### Progress Tracking
- **Correct/Incorrect Count**: See how many you've gotten right
- **Accuracy Percentage**: Track your overall performance
- **Current Streak**: See how many in a row you've gotten correct
- **Best Streak**: Remember your longest streak
- **Session Time**: Track how long you've been studying

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Space` | Start session or advance to next card |
| `Enter` | Check your answer |
| `Ctrl+R` (or `Cmd+R`) | Reset current session |
| `Ctrl+N` (or `Cmd+N`) | Next card |

## Character Reference

### Hiragana (46 characters)
```
あ い う え お    a  i  u  e  o
か き く け こ    ka ki ku ke ko
さ し す せ そ    sa shi su se so
た ち つ て と    ta chi tsu te to
な に ぬ ね の    na ni nu ne no
は ひ ふ へ ほ    ha hi fu he ho
ま み む め も    ma mi mu me mo
や    ゆ    よ    ya    yu    yo
ら り る れ ろ    ra ri ru re ro
わ          を    wa          wo
ん                   n
```

### Katakana (46 characters)
```
ア イ ウ エ オ    a  i  u  e  o
カ キ ク ケ コ    ka ki ku ke ko
サ シ ス セ ソ    sa shi su se so
タ チ ツ テ ト    ta chi tsu te to
ナ ニ ヌ ネ ノ    na ni nu ne no
ハ ヒ フ ヘ ホ    ha hi fu he ho
マ ミ ム メ モ    ma mi mu me mo
ヤ    ユ    ヨ    ya    yu    yo
ラ リ ル レ ロ    ra ri ru re ro
ワ          ヲ    wa          wo
ン                   n
```

## Future Features (Roadmap)

🚧 **Advanced Characters**: Dakuten (゙) and handakuten (゚) characters  
🚧 **Mixed Mode**: Practice hiragana and katakana together  
🚧 **Spaced Repetition**: Smart algorithm to show difficult characters more often  
🚧 **Persistent Storage**: Save progress across browser sessions  
🚧 **Audio Pronunciation**: Hear how characters sound  
🚧 **Custom Study Sets**: Create your own character combinations  
🚧 **Statistics Dashboard**: Detailed performance analytics  
🚧 **PWA Support**: Install as a mobile app  

## Technical Details

### Architecture
- **Modular Design**: Clean separation of data, logic, and presentation
- **ES6 Modules**: Modern JavaScript with import/export
- **Component-Based UI**: Reusable components for different parts of the app
- **Responsive CSS**: Mobile-first design with CSS Grid and Flexbox
- **Future-Ready**: Prepared for advanced features like SRS algorithms

### File Structure
```
hiragana-flashcards/
├── index.html              # Main application page
├── css/styles.css          # Complete styling
├── js/
│   ├── app.js              # Main application logic
│   ├── data/               # Character datasets
│   ├── models/             # Data models (Character, StudySession)
│   ├── components/         # UI components (Card, Progress, ModeSelector)
│   ├── algorithms/         # Selection algorithms
│   ├── storage/            # Data persistence layer
│   └── modes/              # Study mode definitions
├── CLAUDE.md               # Architecture documentation
└── README.md               # This file
```

### Browser Support
- Chrome 61+ ✅
- Firefox 60+ ✅
- Safari 10.1+ ✅
- Edge 79+ ✅

## Deployment

### Static Hosting
This app can be deployed to any static file host:

**GitHub Pages**:
1. Push code to GitHub repository
2. Enable GitHub Pages in repository settings
3. Access via `https://yourusername.github.io/repo-name`

**Netlify**:
1. Drag and drop the project folder to Netlify
2. Get instant deployment with automatic HTTPS

**Local Development**:
```bash
# Simple HTTP server (Python)
python -m http.server 8000

# Or with Node.js
npx serve .

# Or with PHP
php -S localhost:8000
```

## Contributing

Contributions are welcome! Here's how you can help:

### Adding Characters
1. Edit `js/data/hiragana.js` or `js/data/katakana.js`
2. Add character object with `{ character: 'あ', romanji: 'a' }`
3. Characters will automatically appear in the app

### Adding Features
1. Follow the existing modular architecture
2. Add new components in `js/components/`
3. Update `js/app.js` to integrate new features
4. Test thoroughly before submitting

### Reporting Issues
- Check if the issue already exists
- Provide detailed description and steps to reproduce
- Include browser/device information

## Learning Tips

### Effective Study Strategies
1. **Start with Hiragana**: Most learners find it easier than Katakana
2. **Practice Daily**: Short, consistent sessions work better than long cramming
3. **Focus on Problem Characters**: Pay attention to your mistake patterns
4. **Use Mnemonics**: Create memory aids for difficult characters
5. **Practice Writing**: Complement digital practice with pen and paper

### Common Confusing Characters
- **あ (a)** vs **お (o)**: Look for the extra stroke in お
- **は (ha)** vs **ほ (ho)**: ほ has an extra dot
- **け (ke)** vs **こ (ko)**: け is more angular
- **し (shi)** vs **つ (tsu)**: つ has a horizontal line

## License

This project is open source and available under the MIT License.

## Acknowledgments

- **Google Fonts**: Noto Sans JP for beautiful Japanese character display
- **Unicode Consortium**: For standardizing Japanese character encoding
- **Japanese Language Community**: For feedback and suggestions

---

**Happy Learning!** 🇯🇵

Start your Japanese journey today with these fundamental writing systems. Master hiragana and katakana to build a strong foundation for reading Japanese text, names, and foreign words written in Japanese.

Remember: 順々に (jun jun ni) - step by step! 🚀