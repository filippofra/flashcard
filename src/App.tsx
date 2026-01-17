import { useState, useEffect } from 'react'
import { dictionary } from './dictionary'
import Flashcard from './components/Flashcard'
import StatsDashboard from './components/StatsDashboard'
import QuizView from './components/QuizView'
import {
  loadUserProgress,
  updateCardProgress,
  loadWrongCards,
  addWrongCard,
  removeWrongCard,
  type UserProgress
} from './utils/storage'
import './App.css'

type View = 'home' | 'study' | 'review' | 'quiz' | 'stats'

/**
 * Main App component that manages routing between different views
 * and handles the overall application state.
 */
function App() {
  const [currentView, setCurrentView] = useState<View>('home')
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [progress, setProgress] = useState<UserProgress>({})
  const [wrongCards, setWrongCards] = useState<string[]>([])
  const [currentDeck, setCurrentDeck] = useState(dictionary)

  // Load progress and wrong cards from localStorage on mount
  useEffect(() => {
    const loadedProgress = loadUserProgress()
    const loadedWrongCards = loadWrongCards()
    setProgress(loadedProgress)
    setWrongCards(loadedWrongCards)
  }, [])

  // Set the current deck based on the view
  useEffect(() => {
    if (currentView === 'review') {
      // Filter to only show wrong cards
      setCurrentDeck(dictionary.filter(card => wrongCards.includes(card.id)))
    } else {
      // Show all cards for study and quiz modes
      setCurrentDeck(dictionary)
    }
    setCurrentCardIndex(0)
  }, [currentView, wrongCards])

  /**
   * Handles answer submission from the flashcard component.
   * Updates progress and wrong cards list accordingly.
   */
  const handleAnswer = (isCorrect: boolean) => {
    const currentCard = currentDeck[currentCardIndex]
    if (!currentCard) return

    // Update progress
    const updatedProgress = updateCardProgress(
      currentCard.id,
      isCorrect,
      progress
    )
    setProgress(updatedProgress)

    // Update wrong cards list
    if (!isCorrect) {
      addWrongCard(currentCard.id)
      setWrongCards([...wrongCards, currentCard.id].filter((v, i, a) => a.indexOf(v) === i))
    } else if (currentView === 'review') {
      // If in review mode and got it right, remove from wrong cards
      removeWrongCard(currentCard.id)
      setWrongCards(prev => prev.filter(id => id !== currentCard.id))
    }
  }

  /**
   * Advances to the next card in the deck.
   * Returns to home if all cards are completed.
   */
  const handleNext = () => {
    if (currentCardIndex < currentDeck.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
    } else {
      // All cards completed, return to home
      setCurrentView('home')
    }
  }

  /**
   * Renders the current view based on currentView state.
   */
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <div className="home-view">
            <h1>Spanish Flashcard App</h1>
            <p>Welcome to your Spanish learning journey!</p>
            <div className="menu-buttons">
              <button onClick={() => setCurrentView('study')} className="btn-primary">
                Study Mode
              </button>
              {wrongCards.length > 0 && (
                <button onClick={() => setCurrentView('review')} className="btn-secondary">
                  Review Hard Cards ({wrongCards.length})
                </button>
              )}
              <button onClick={() => setCurrentView('quiz')} className="btn-primary">
                Quiz Mode
              </button>
              <button onClick={() => setCurrentView('stats')} className="btn-secondary">
                Statistics
              </button>
            </div>
          </div>
        )

      case 'study':
      case 'review':
        if (currentDeck.length === 0) {
          return (
            <div className="empty-deck">
              <h2>No cards to study</h2>
              <p>Great job! You've mastered all the cards in this deck.</p>
              <button onClick={() => setCurrentView('home')} className="btn-primary">
                Back to Home
              </button>
            </div>
          )
        }
        return (
          <div className="study-view">
            <div className="study-header">
              <button onClick={() => setCurrentView('home')} className="btn-back">
                ← Back
              </button>
              <span className="card-counter">
                Card {currentCardIndex + 1} of {currentDeck.length}
              </span>
            </div>
            <Flashcard
              card={currentDeck[currentCardIndex]}
              onNext={handleNext}
              onAnswer={handleAnswer}
            />
          </div>
        )

      case 'quiz':
        return (
          <div className="quiz-view">
            <div className="study-header">
              <button onClick={() => setCurrentView('home')} className="btn-back">
                ← Back
              </button>
            </div>
            <QuizView
              cards={currentDeck}
              onAnswer={handleAnswer}
            />
          </div>
        )

      case 'stats':
        return (
          <div className="stats-view">
            <div className="study-header">
              <button onClick={() => setCurrentView('home')} className="btn-back">
                ← Back
              </button>
            </div>
            <StatsDashboard progress={progress} wrongCards={wrongCards} />
          </div>
        )

      default:
        return null
    }
  }

  return <div className="app">{renderView()}</div>
}

export default App
