import { describe, it, expect } from 'vitest'
import { dictionary } from '../dictionary'

/**
 * Tests for the dictionary data structure
 * Verifies Feature 1: Project Setup & Data Shell
 */
describe('Dictionary Tests', () => {
  it('should have 30 flashcards', () => {
    expect(dictionary.length).toBe(30)
  })

  it('should have flashcards with required properties', () => {
    dictionary.forEach(card => {
      expect(card).toHaveProperty('id')
      expect(card).toHaveProperty('spanish')
      expect(card).toHaveProperty('english')
      expect(card).toHaveProperty('category')
      expect(typeof card.id).toBe('string')
      expect(typeof card.spanish).toBe('string')
      expect(typeof card.english).toBe('string')
      expect(typeof card.category).toBe('string')
    })
  })

  it('should have 10 Food cards', () => {
    const foodCards = dictionary.filter(card => card.category === 'Food')
    expect(foodCards.length).toBe(10)
  })

  it('should have 10 Animals cards', () => {
    const animalCards = dictionary.filter(card => card.category === 'Animals')
    expect(animalCards.length).toBe(10)
  })

  it('should have 10 Verbs cards', () => {
    const verbCards = dictionary.filter(card => card.category === 'Verbs')
    expect(verbCards.length).toBe(10)
  })

  it('should have unique IDs for all cards', () => {
    const ids = dictionary.map(card => card.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(dictionary.length)
  })
})
