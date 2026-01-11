import { useEffect } from 'react'
import { dictionary } from './dictionary'
import './App.css'

function App() {
  useEffect(() => {
    // Log the list of words from the library to the console
    console.log('Spanish Flashcard Dictionary:', dictionary)
    console.log(`Total cards: ${dictionary.length}`)
    console.log('Cards by category:')
    const byCategory = dictionary.reduce((acc, card) => {
      acc[card.category] = (acc[card.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    console.log(byCategory)
  }, [])

  return (
    <div className="app">
      <h1>Spanish Flashcard App</h1>
      <p>Welcome to your Spanish learning journey!</p>
      <p>Check the console to see the dictionary loaded.</p>
    </div>
  )
}

export default App
