import { useState, useEffect, useMemo } from 'react'
import { Flashcard as FlashcardType, dictionary } from '../dictionary'
import './QuizView.css'

interface QuizViewProps {
  cards: FlashcardType[]
  onAnswer: (isCorrect: boolean) => void
}

/**
 * QuizView component that displays multiple choice questions.
 * Generates distractors from the same category as the correct answer.
 */
export default function QuizView({ cards, onAnswer }: QuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)

  // Generate quiz question with distractors from same category
  const currentQuestion = useMemo(() => {
    if (currentIndex >= cards.length) return null
    
    const currentCard = cards[currentIndex]
    
    // Get all cards from the same category (excluding current card)
    const sameCategoryCards = dictionary.filter(
      card => card.category === currentCard.category && card.id !== currentCard.id
    )
    
    // Select 3 random distractors from the same category
    const distractors: string[] = []
    const availableCards = [...sameCategoryCards]
    
    for (let i = 0; i < 3 && availableCards.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableCards.length)
      distractors.push(availableCards[randomIndex].english)
      availableCards.splice(randomIndex, 1)
    }
    
    // Combine correct answer with distractors and shuffle
    const allOptions = [currentCard.english, ...distractors]
    const shuffledOptions = allOptions.sort(() => Math.random() - 0.5)
    
    return {
      card: currentCard,
      options: shuffledOptions,
      correctAnswer: currentCard.english
    }
  }, [currentIndex, cards])

  /**
   * Handles answer selection and checks correctness.
   */
  const handleAnswerSelect = (answer: string) => {
    if (showFeedback) return // Prevent multiple selections
    
    setSelectedAnswer(answer)
    setShowFeedback(true)
    
    const isCorrect = answer === currentQuestion?.correctAnswer
    if (isCorrect) {
      setScore(score + 1)
    }
    
    onAnswer(isCorrect)
    
    // Move to next question after 2 seconds
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setSelectedAnswer(null)
        setShowFeedback(false)
      } else {
        // Quiz completed
        setShowFeedback(false)
      }
    }, 2000)
  }

  // Reset quiz when cards change
  useEffect(() => {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setScore(0)
  }, [cards])

  if (!currentQuestion || currentIndex >= cards.length) {
    return (
      <div className="quiz-completed">
        <h2>Quiz Completed!</h2>
        <p className="quiz-score">
          Score: {score} / {cards.length}
        </p>
        <p className="quiz-percentage">
          {((score / cards.length) * 100).toFixed(1)}% Correct
        </p>
        <button 
          onClick={() => {
            setCurrentIndex(0)
            setScore(0)
            setSelectedAnswer(null)
            setShowFeedback(false)
          }}
          className="btn-primary"
        >
          Restart Quiz
        </button>
      </div>
    )
  }

  return (
    <div className="quiz-view">
      <div className="quiz-header">
        <h2>Quiz Mode</h2>
        <div className="quiz-progress">
          Question {currentIndex + 1} of {cards.length}
        </div>
        <div className="quiz-score-display">
          Score: {score} / {currentIndex + 1}
        </div>
      </div>

      <div className="quiz-question">
        <h3 className="question-text">{currentQuestion.card.spanish}</h3>
        <p className="question-subtitle">Select the correct English translation:</p>
      </div>

      <div className="quiz-options">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === option
          const isCorrect = option === currentQuestion.correctAnswer
          const showCorrect = showFeedback && isCorrect
          const showIncorrect = showFeedback && isSelected && !isCorrect

          return (
            <button
              key={index}
              className={`quiz-option ${
                showCorrect ? 'correct' : ''
              } ${
                showIncorrect ? 'incorrect' : ''
              } ${
                isSelected && !showFeedback ? 'selected' : ''
              }`}
              onClick={() => handleAnswerSelect(option)}
              disabled={showFeedback}
            >
              {option}
              {showCorrect && <span className="feedback-icon">✓</span>}
              {showIncorrect && <span className="feedback-icon">✗</span>}
            </button>
          )
        })}
      </div>

      {showFeedback && (
        <div className={`quiz-feedback ${selectedAnswer === currentQuestion.correctAnswer ? 'correct' : 'incorrect'}`}>
          {selectedAnswer === currentQuestion.correctAnswer ? (
            <p>Correct! ✓</p>
          ) : (
            <p>Incorrect. The correct answer is: {currentQuestion.correctAnswer}</p>
          )}
        </div>
      )}
    </div>
  )
}
