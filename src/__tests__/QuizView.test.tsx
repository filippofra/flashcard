import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import QuizView from '../components/QuizView'
import { Flashcard } from '../dictionary'

/**
 * Tests for QuizView component
 * Verifies Feature 7: Quiz Mode (Multiple Choice + Similar Distractors)
 */

const mockCards: Flashcard[] = [
  { id: 'animal-1', spanish: 'El perro', english: 'Dog', category: 'Animals' },
  { id: 'animal-2', spanish: 'El gato', english: 'Cat', category: 'Animals' },
  { id: 'animal-3', spanish: 'El pájaro', english: 'Bird', category: 'Animals' },
  { id: 'animal-4', spanish: 'El caballo', english: 'Horse', category: 'Animals' },
  { id: 'food-1', spanish: 'La manzana', english: 'Apple', category: 'Food' },
  { id: 'food-2', spanish: 'El plátano', english: 'Banana', category: 'Food' },
]

describe('QuizView Component', () => {
  it('should display Spanish word', () => {
    render(<QuizView cards={mockCards} onAnswer={vi.fn()} />)
    expect(screen.getByText(mockCards[0].spanish)).toBeInTheDocument()
  })

  it('should display 4 options for multiple choice', () => {
    render(<QuizView cards={mockCards} onAnswer={vi.fn()} />)
    const options = screen.getAllByRole('button').filter(btn => 
      btn.textContent !== '← Back'
    )
    expect(options.length).toBe(4)
  })

  it('should include correct answer in options', () => {
    render(<QuizView cards={mockCards} onAnswer={vi.fn()} />)
    expect(screen.getByText('Dog')).toBeInTheDocument()
  })

  it('should show feedback immediately after selection', async () => {
    const onAnswer = vi.fn()
    render(<QuizView cards={mockCards} onAnswer={onAnswer} />)
    
    const correctOption = screen.getByText('Dog')
    fireEvent.click(correctOption)
    
    await waitFor(() => {
      expect(screen.getByText(/Correct/)).toBeInTheDocument()
    })
  })

  it('should randomize option order', () => {
    // Run multiple times to check randomization
    const optionPositions: number[] = []
    for (let i = 0; i < 5; i++) {
      const { unmount } = render(<QuizView cards={mockCards} onAnswer={vi.fn()} />)
      const options = screen.getAllByRole('button').filter(btn => 
        btn.textContent !== '← Back'
      )
      const dogIndex = options.findIndex(btn => btn.textContent === 'Dog')
      optionPositions.push(dogIndex)
      unmount()
    }
    
    // At least one should be different (randomization works)
    const uniquePositions = new Set(optionPositions)
    expect(uniquePositions.size).toBeGreaterThan(1)
  })
})
