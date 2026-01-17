/**
 * UserProgress interface for tracking user's learning progress.
 * Stored in localStorage to persist across sessions.
 */
export interface UserProgress {
  [cardId: string]: {
    attempts: number
    correct: number
    lastStudied: string // ISO Date
    isMastered: boolean
  }
}

const STORAGE_KEY = 'flashcard-user-progress'
const WRONG_CARDS_KEY = 'flashcard-wrong-cards'

/**
 * Loads user progress from localStorage.
 * Returns empty object if no progress exists.
 */
export function loadUserProgress(): UserProgress {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return {}
  
  try {
    return JSON.parse(stored)
  } catch (error) {
    console.error('Error loading user progress:', error)
    return {}
  }
}

/**
 * Saves user progress to localStorage.
 */
export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (error) {
    console.error('Error saving user progress:', error)
  }
}

/**
 * Updates progress for a specific card.
 * Tracks attempts, correct answers, and mastery status.
 */
export function updateCardProgress(
  cardId: string,
  isCorrect: boolean,
  progress: UserProgress
): UserProgress {
  const current = progress[cardId] || {
    attempts: 0,
    correct: 0,
    lastStudied: new Date().toISOString(),
    isMastered: false
  }

  const updated = {
    ...progress,
    [cardId]: {
      attempts: current.attempts + 1,
      correct: current.correct + (isCorrect ? 1 : 0),
      lastStudied: new Date().toISOString(),
      isMastered: current.correct + (isCorrect ? 1 : 0) >= 3 // Mastered after 3 correct answers
    }
  }

  saveUserProgress(updated)
  return updated
}

/**
 * Loads list of wrong card IDs from localStorage.
 * Returns empty array if no wrong cards exist.
 */
export function loadWrongCards(): string[] {
  const stored = localStorage.getItem(WRONG_CARDS_KEY)
  if (!stored) return []
  
  try {
    return JSON.parse(stored)
  } catch (error) {
    console.error('Error loading wrong cards:', error)
    return []
  }
}

/**
 * Adds a card ID to the wrong cards list.
 */
export function addWrongCard(cardId: string): void {
  const wrongCards = loadWrongCards()
  if (!wrongCards.includes(cardId)) {
    wrongCards.push(cardId)
    localStorage.setItem(WRONG_CARDS_KEY, JSON.stringify(wrongCards))
  }
}

/**
 * Removes a card ID from the wrong cards list.
 */
export function removeWrongCard(cardId: string): void {
  const wrongCards = loadWrongCards()
  const filtered = wrongCards.filter(id => id !== cardId)
  localStorage.setItem(WRONG_CARDS_KEY, JSON.stringify(filtered))
}

/**
 * Clears all wrong cards from localStorage.
 */
export function clearWrongCards(): void {
  localStorage.removeItem(WRONG_CARDS_KEY)
}
