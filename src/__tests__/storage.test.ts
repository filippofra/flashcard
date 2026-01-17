import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  loadUserProgress,
  saveUserProgress,
  updateCardProgress,
  loadWrongCards,
  addWrongCard,
  removeWrongCard,
  clearWrongCards,
  type UserProgress
} from '../utils/storage'

/**
 * Tests for LocalStorage utilities
 * Verifies Feature 4: Persistence (LocalStorage "Memory")
 */

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('Storage Utilities', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should load empty progress when nothing is stored', () => {
    const progress = loadUserProgress()
    expect(progress).toEqual({})
  })

  it('should save and load user progress', () => {
    const progress: UserProgress = {
      'card-1': {
        attempts: 2,
        correct: 1,
        lastStudied: new Date().toISOString(),
        isMastered: false
      }
    }
    saveUserProgress(progress)
    const loaded = loadUserProgress()
    expect(loaded).toEqual(progress)
  })

  it('should update card progress correctly', () => {
    const initialProgress: UserProgress = {}
    const updated = updateCardProgress('card-1', true, initialProgress)
    
    expect(updated['card-1']).toBeDefined()
    expect(updated['card-1'].attempts).toBe(1)
    expect(updated['card-1'].correct).toBe(1)
  })

  it('should mark card as mastered after 3 correct answers', () => {
    let progress: UserProgress = {}
    
    // First correct answer
    progress = updateCardProgress('card-1', true, progress)
    expect(progress['card-1'].isMastered).toBe(false)
    
    // Second correct answer
    progress = updateCardProgress('card-1', true, progress)
    expect(progress['card-1'].isMastered).toBe(false)
    
    // Third correct answer - should be mastered
    progress = updateCardProgress('card-1', true, progress)
    expect(progress['card-1'].isMastered).toBe(true)
  })

  it('should load empty wrong cards list when nothing is stored', () => {
    const wrongCards = loadWrongCards()
    expect(wrongCards).toEqual([])
  })

  it('should add and load wrong cards', () => {
    addWrongCard('card-1')
    addWrongCard('card-2')
    const wrongCards = loadWrongCards()
    expect(wrongCards).toContain('card-1')
    expect(wrongCards).toContain('card-2')
  })

  it('should not add duplicate wrong cards', () => {
    addWrongCard('card-1')
    addWrongCard('card-1')
    const wrongCards = loadWrongCards()
    expect(wrongCards.filter(id => id === 'card-1').length).toBe(1)
  })

  it('should remove wrong card', () => {
    addWrongCard('card-1')
    addWrongCard('card-2')
    removeWrongCard('card-1')
    const wrongCards = loadWrongCards()
    expect(wrongCards).not.toContain('card-1')
    expect(wrongCards).toContain('card-2')
  })

  it('should clear all wrong cards', () => {
    addWrongCard('card-1')
    addWrongCard('card-2')
    clearWrongCards()
    const wrongCards = loadWrongCards()
    expect(wrongCards).toEqual([])
  })
})
