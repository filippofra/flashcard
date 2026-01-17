To help you build this app iteratively, I have ranked the features from **easiest to hardest** and broken them down into manageable TODOs. This plan follows a "crawl-walk-run" approach, ensuring each step builds a functional layer on top of the last.

### Implementation Plan: Spanish Flashcard App

---

#### 1. Project Setup & Data Shell (Topic Library) ✅

**Difficulty:** Very Easy

**Description:** Initialize the environment and create the data structure for your Spanish vocabulary.

* [x] **TODO:** Scaffold project using `npm create vite@latest -- --template react-ts`.
* [x] **TODO:** Create a `dictionary.ts` file containing your pre-defined words grouped by topics (Food, Animals, Verbs).
* **Acceptance Criteria:**
* ✅ The app compiles and displays a "Hello World" or title.
* ✅ A TypeScript interface exists for a `Flashcard` object (e.g., `id`, `spanish`, `english`, `category`).
* ✅ You can log the list of words from the library to the console.



#### 2. Basic Card UI & Flip Logic ✅

**Difficulty:** Easy

**Description:** Build the visual card and the toggle state to reveal the English translation.

* [x] **TODO:** Create a `Card` component that takes a Spanish word and its translation as props.
* [x] **TODO:** Implement a `boolean` state (`isFlipped`) to toggle between the Spanish side and English side on click.
* **Acceptance Criteria:**
* ✅ Clicking the card toggles the text from Spanish to English.
* ✅ The card has a distinct visual style for "Front" vs. "Back".
* ✅ No English is visible while the card is in the "Spanish" state.



#### 3. Assessment Buttons (Right/Wrong) ✅

**Difficulty:** Easy

**Description:** Add interactivity below the card to allow the user to self-assess.

* [x] **TODO:** Add "Got it Right" and "Got it Wrong" buttons that only appear *after* the card is flipped.
* [x] **TODO:** Create a state variable to track which cards the user has interacted with in the current session.
* **Acceptance Criteria:**
* ✅ Assessment buttons are hidden until `isFlipped` is true.
* ✅ Clicking a button logs the result and automatically advances to the next card in the deck.



#### 4. Persistence (LocalStorage "Memory") ✅

**Difficulty:** Medium

**Description:** Ensure the app remembers which cards were missed even after a page refresh.

* [x] **TODO:** Write a helper function to save "Wrong" card IDs into `localStorage`.
* [x] **TODO:** Implement a `useEffect` hook to load this data when the app starts.
* **Acceptance Criteria:**
* ✅ Refreshing the browser does not wipe the record of cards marked as "Wrong".
* ✅ The app can identify which specific cards in the library are currently in the "needs review" state.



#### 5. "Review Session" Mode (Redo Wrong Cards) ✅

**Difficulty:** Medium

**Description:** Add a filter to study only the cards saved in the "Wrong" pile.

* [x] **TODO:** Add a "Review Hard Cards" button to the main menu.
* [x] **TODO:** Implement logic to filter the `dictionary` to show only cards whose IDs exist in the "Wrong" LocalStorage list.
* **Acceptance Criteria:**
* ✅ Entering "Review Mode" only displays cards previously marked as "Wrong".
* ✅ Successfully marking a card as "Right" in this mode removes it from the "Wrong" list in LocalStorage.



#### 6. Statistics Dashboard ✅

**Difficulty:** Medium

**Description:** Create a page to visualize progress.

* [x] **TODO:** Create a `Stats` component/page.
* [x] **TODO:** Calculate "Total Studied", "Mastery %" (Right vs. Total), and "Current Weak Topics" based on category.
* **Acceptance Criteria:**
* ✅ The user can see a count of total cards studied.
* ✅ A percentage or progress bar shows how much of the library has been mastered.
* ✅ Stats are accurate relative to the data stored in LocalStorage.



#### 7. Quiz Mode (Multiple Choice + Similar Distractors) ✅

**Difficulty:** Hardest

**Description:** The most complex logic—generating plausible wrong answers.

* [x] **TODO:** Create a `QuizView` that displays 1 Spanish word and 4 English options.
* [x] **TODO:** **Distractor Logic:** For the 3 wrong options, pull random English words *from the same category* (e.g., if the word is "Perro" [Dog], ensure distractors are other animals like "Gato" or "Pájaro").
* [ ] **TODO:** Implement "Fill-in-the-blank" by checking user input against the `english` string (case-insensitive).
* **Acceptance Criteria:**
* ✅ Quiz options are randomized (the correct answer isn't always button #1).
* ✅ Distractors are always from the same category as the correct answer.
* ✅ Feedback (Correct/Incorrect) is shown immediately after selecting an option.