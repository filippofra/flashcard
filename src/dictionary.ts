// Flashcard interface definition
export interface Flashcard {
  id: string;
  spanish: string;
  english: string;
  category: string;
  difficulty?: string; // Optional metadata for linguistically similar distractors
}

// Pre-defined Spanish vocabulary library grouped by topics
export const dictionary: Flashcard[] = [
  // Food category
  { id: 'food-1', spanish: 'La manzana', english: 'Apple', category: 'Food' },
  { id: 'food-2', spanish: 'El plátano', english: 'Banana', category: 'Food' },
  { id: 'food-3', spanish: 'La naranja', english: 'Orange', category: 'Food' },
  { id: 'food-4', spanish: 'El pan', english: 'Bread', category: 'Food' },
  { id: 'food-5', spanish: 'La leche', english: 'Milk', category: 'Food' },
  { id: 'food-6', spanish: 'El queso', english: 'Cheese', category: 'Food' },
  { id: 'food-7', spanish: 'El arroz', english: 'Rice', category: 'Food' },
  { id: 'food-8', spanish: 'La carne', english: 'Meat', category: 'Food' },
  { id: 'food-9', spanish: 'El pescado', english: 'Fish', category: 'Food' },
  { id: 'food-10', spanish: 'El agua', english: 'Water', category: 'Food' },

  // Animals category
  { id: 'animal-1', spanish: 'El perro', english: 'Dog', category: 'Animals' },
  { id: 'animal-2', spanish: 'El gato', english: 'Cat', category: 'Animals' },
  { id: 'animal-3', spanish: 'El pájaro', english: 'Bird', category: 'Animals' },
  { id: 'animal-4', spanish: 'El caballo', english: 'Horse', category: 'Animals' },
  { id: 'animal-5', spanish: 'La vaca', english: 'Cow', category: 'Animals' },
  { id: 'animal-6', spanish: 'El cerdo', english: 'Pig', category: 'Animals' },
  { id: 'animal-7', spanish: 'El conejo', english: 'Rabbit', category: 'Animals' },
  { id: 'animal-8', spanish: 'El elefante', english: 'Elephant', category: 'Animals' },
  { id: 'animal-9', spanish: 'El león', english: 'Lion', category: 'Animals' },
  { id: 'animal-10', spanish: 'El tigre', english: 'Tiger', category: 'Animals' },

  // Verbs category
  { id: 'verb-1', spanish: 'Correr', english: 'To run', category: 'Verbs' },
  { id: 'verb-2', spanish: 'Caminar', english: 'To walk', category: 'Verbs' },
  { id: 'verb-3', spanish: 'Comer', english: 'To eat', category: 'Verbs' },
  { id: 'verb-4', spanish: 'Beber', english: 'To drink', category: 'Verbs' },
  { id: 'verb-5', spanish: 'Dormir', english: 'To sleep', category: 'Verbs' },
  { id: 'verb-6', spanish: 'Leer', english: 'To read', category: 'Verbs' },
  { id: 'verb-7', spanish: 'Escribir', english: 'To write', category: 'Verbs' },
  { id: 'verb-8', spanish: 'Hablar', english: 'To speak', category: 'Verbs' },
  { id: 'verb-9', spanish: 'Escuchar', english: 'To listen', category: 'Verbs' },
  { id: 'verb-10', spanish: 'Estudiar', english: 'To study', category: 'Verbs' },
];
