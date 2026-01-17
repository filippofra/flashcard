# Spanish Flashcard App

A web-based flashcard application designed to help users learn Spanish vocabulary through active recall and self-assessment.

## 🌐 Live Website

**👉 [Visit the Live App](https://flashcard-app-drab.vercel.app)**

## Features

- 📚 **Study Mode**: Flip cards to learn Spanish vocabulary
- 🎯 **Quiz Mode**: Test your knowledge with multiple-choice questions
- 📊 **Statistics Dashboard**: Track your progress and mastery
- 🔄 **Review Mode**: Focus on cards you've struggled with
- 💾 **Local Storage**: All progress saved locally in your browser

## Tech Stack

- React 18.2.0 with TypeScript
- Vite 5.0.8
- CSS3 with animations
- Browser LocalStorage API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/filippofra/flashcard.git

# Navigate to the project directory
cd Flashcard_app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
# Run all tests
npm run test

# Generate test report
npm run test:report
```

## Project Structure

```
Flashcard_app/
├── src/
│   ├── components/      # React components
│   ├── utils/          # Utility functions
│   ├── __tests__/      # Test files
│   └── dictionary.ts    # Flashcard data
├── docs/               # Documentation
└── scripts/            # Build scripts
```

## Dictionary

The app includes 30 Spanish words organized into 3 categories:
- 🍎 Food (10 words)
- 🐾 Animals (10 words)
- 🏃 Verbs (10 words)

## Deployment

This app is deployed on [Vercel](https://vercel.com) and automatically deploys on every push to the `main` branch.

**Production URL:** https://flashcard-app-drab.vercel.app

## License

This project is open source and available for educational purposes.

## Contributing

Contributions, issues, and feature requests are welcome!

---

**Repository:** [https://github.com/filippofra/flashcard](https://github.com/filippofra/flashcard)  
**Live App:** [https://flashcard-app-drab.vercel.app](https://flashcard-app-drab.vercel.app)
