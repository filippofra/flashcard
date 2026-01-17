import { useMemo } from 'react'
import { dictionary } from '../dictionary'
import { type UserProgress } from '../utils/storage'
import './StatsDashboard.css'

interface StatsDashboardProps {
  progress: UserProgress
  wrongCards: string[]
}

/**
 * StatsDashboard component that visualizes user progress and statistics.
 * Displays total studied, mastery percentage, and weak topics.
 */
export default function StatsDashboard({ progress, wrongCards }: StatsDashboardProps) {
  // Calculate statistics from progress data
  const stats = useMemo(() => {
    const totalCards = dictionary.length
    const studiedCards = Object.keys(progress).length
    const totalAttempts = Object.values(progress).reduce((sum, card) => sum + card.attempts, 0)
    const totalCorrect = Object.values(progress).reduce((sum, card) => sum + card.correct, 0)
    const masteredCards = Object.values(progress).filter(card => card.isMastered).length
    const accuracy = totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0
    const masteryPercentage = (masteredCards / totalCards) * 100

    // Calculate stats by category
    const categoryStats = dictionary.reduce((acc, card) => {
      const cardProgress = progress[card.id]
      if (!acc[card.category]) {
        acc[card.category] = { total: 0, studied: 0, mastered: 0, attempts: 0, correct: 0 }
      }
      acc[card.category].total++
      if (cardProgress) {
        acc[card.category].studied++
        acc[card.category].attempts += cardProgress.attempts
        acc[card.category].correct += cardProgress.correct
        if (cardProgress.isMastered) {
          acc[card.category].mastered++
        }
      }
      return acc
    }, {} as Record<string, { total: number; studied: number; mastered: number; attempts: number; correct: number }>)

    return {
      totalCards,
      studiedCards,
      masteredCards,
      totalAttempts,
      totalCorrect,
      accuracy,
      masteryPercentage,
      categoryStats
    }
  }, [progress])

  return (
    <div className="stats-dashboard">
      <h1>Statistics Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h2>Total Cards</h2>
          <p className="stat-value">{stats.totalCards}</p>
        </div>
        
        <div className="stat-card">
          <h2>Cards Studied</h2>
          <p className="stat-value">{stats.studiedCards}</p>
          <p className="stat-percentage">{((stats.studiedCards / stats.totalCards) * 100).toFixed(1)}%</p>
        </div>
        
        <div className="stat-card">
          <h2>Cards Mastered</h2>
          <p className="stat-value">{stats.masteredCards}</p>
          <p className="stat-percentage">{stats.masteryPercentage.toFixed(1)}%</p>
        </div>
        
        <div className="stat-card">
          <h2>Total Attempts</h2>
          <p className="stat-value">{stats.totalAttempts}</p>
        </div>
        
        <div className="stat-card">
          <h2>Accuracy</h2>
          <p className="stat-value">{stats.accuracy.toFixed(1)}%</p>
        </div>
        
        <div className="stat-card">
          <h2>Wrong Cards</h2>
          <p className="stat-value">{wrongCards.length}</p>
        </div>
      </div>

      <div className="mastery-progress">
        <h2>Overall Mastery</h2>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${stats.masteryPercentage}%` }}
          >
            {stats.masteryPercentage.toFixed(1)}%
          </div>
        </div>
      </div>

      <div className="category-stats">
        <h2>Progress by Category</h2>
        <div className="category-grid">
          {Object.entries(stats.categoryStats).map(([category, catStats]) => {
            const categoryMastery = (catStats.mastered / catStats.total) * 100
            const categoryAccuracy = catStats.attempts > 0 
              ? (catStats.correct / catStats.attempts) * 100 
              : 0
            
            return (
              <div key={category} className="category-card">
                <h3>{category}</h3>
                <div className="category-info">
                  <p>Total: {catStats.total}</p>
                  <p>Studied: {catStats.studied}</p>
                  <p>Mastered: {catStats.mastered}</p>
                  <p>Accuracy: {categoryAccuracy.toFixed(1)}%</p>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar category-progress" 
                    style={{ width: `${categoryMastery}%` }}
                  >
                    {categoryMastery.toFixed(1)}%
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
