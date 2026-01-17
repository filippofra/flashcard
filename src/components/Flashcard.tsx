import { useState } from 'react'
import { Flashcard as FlashcardType } from '../dictionary'
import './Flashcard.css'

interface FlashcardProps {
  card: FlashcardType
  onNext: () => void
  onAnswer: (isCorrect: boolean) => void
}

/**
 * Flashcard component that displays a Spanish word and flips to show English translation.
 * Handles flip animation and assessment button logic.
 */
export default function Flashcard({ card, onNext, onAnswer }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  /**
   * Handles card click to flip between Spanish and English sides.
   */
  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
  }

  /**
   * Handles assessment button clicks.
   * Calls onAnswer callback and advances to next card.
   */
  const handleAnswer = (isCorrect: boolean) => {
    onAnswer(isCorrect)
    setIsFlipped(false)
    onNext()
  }

  return (
    <div className="flashcard-container">
      <div 
        className={`flashcard ${isFlipped ? 'flipped' : ''}`}
        onClick={handleCardClick}
      >
        <div className="flashcard-front">
          <h2>{card.spanish}</h2>
        </div>
        <div className="flashcard-back">
          <h2>{card.english}</h2>
        </div>
      </div>
      
      {isFlipped && (
        <div className="assessment-buttons">
          <button 
            className="btn-correct"
            onClick={(e) => {
              e.stopPropagation()
              handleAnswer(true)
            }}
          >
            Got it Right
          </button>
          <button 
            className="btn-wrong"
            onClick={(e) => {
              e.stopPropagation()
              handleAnswer(false)
            }}
          >
            Got it Wrong
          </button>
        </div>
      )}
    </div>
  )
}
