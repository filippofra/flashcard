import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Flashcard from '../components/Flashcard'
import { Flashcard as FlashcardType } from '../dictionary'

/**
 * Tests for Flashcard component
 * Verifies Feature 2: Basic Card UI & Flip Logic
 * Verifies Feature 3: Assessment Buttons (Right/Wrong)
 */

const mockCard: FlashcardType = {
  id: 'test-1',
  spanish: 'La manzana',
  english: 'Apple',
  category: 'Food'
}

describe('Flashcard Component', () => {
  it('should display Spanish word initially', () => {
    const { container } = render(<Flashcard card={mockCard} onNext={vi.fn()} onAnswer={vi.fn()} />)
    expect(screen.getByText('La manzana')).toBeInTheDocument()
    expect(screen.getByText('Apple')).toBeInTheDocument() // Both sides exist in DOM
    // Check that the card is not flipped initially (flipped class should not be present)
    const flashcard = container.querySelector('.flashcard')
    expect(flashcard).not.toBeNull()
    expect(flashcard?.className).not.toContain('flipped')
  })

  it('should toggle to English when clicked', () => {
    render(<Flashcard card={mockCard} onNext={vi.fn()} onAnswer={vi.fn()} />)
    const card = screen.getByText('La manzana').closest('.flashcard')
    
    if (card) {
      fireEvent.click(card)
      expect(screen.getByText('Apple')).toBeVisible()
    }
  })

  it('should show assessment buttons after flip', () => {
    const onAnswer = vi.fn()
    render(<Flashcard card={mockCard} onNext={vi.fn()} onAnswer={onAnswer} />)
    
    const card = screen.getByText('La manzana').closest('.flashcard')
    if (card) {
      fireEvent.click(card)
      expect(screen.getByText('Got it Right')).toBeInTheDocument()
      expect(screen.getByText('Got it Wrong')).toBeInTheDocument()
    }
  })

  it('should hide assessment buttons before flip', () => {
    render(<Flashcard card={mockCard} onNext={vi.fn()} onAnswer={vi.fn()} />)
    expect(screen.queryByText('Got it Right')).not.toBeInTheDocument()
    expect(screen.queryByText('Got it Wrong')).not.toBeInTheDocument()
  })

  it('should call onAnswer with correct value when button clicked', () => {
    const onAnswer = vi.fn()
    const onNext = vi.fn()
    render(<Flashcard card={mockCard} onNext={onNext} onAnswer={onAnswer} />)
    
    const card = screen.getByText('La manzana').closest('.flashcard')
    if (card) {
      fireEvent.click(card)
      const correctButton = screen.getByText('Got it Right')
      fireEvent.click(correctButton)
      expect(onAnswer).toHaveBeenCalledWith(true)
    }
  })

  it('should call onNext after answering', () => {
    const onNext = vi.fn()
    render(<Flashcard card={mockCard} onNext={onNext} onAnswer={vi.fn()} />)
    
    const card = screen.getByText('La manzana').closest('.flashcard')
    if (card) {
      fireEvent.click(card)
      const wrongButton = screen.getByText('Got it Wrong')
      fireEvent.click(wrongButton)
      expect(onNext).toHaveBeenCalled()
    }
  })
})
