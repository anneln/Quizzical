# Quizzical 🎯

A quiz app made with React. You can answer quiz questions and get your score.
[Test your knowledge by doing the quiz](https://quizzbyanneln.netlify.app/) 🧠

## About This Project

This is a **solo project**. [Scrimba's](https://scrimba.com) React course provided a **Figma** design and I coded the whole app from scratch using React.

## What I Built

Quizzical is a quiz app where you can:

- Click "Start quiz" to begin
- Answer multiple choice questions
- See if your answer is right (green) or wrong (red)
- See your final score
- Play again with new questions

## Features

- [x] Quiz questions from API
- [x] Level choices
- [x] Questions and answers are mixed up randomly
- [x] Your score is counted automatically
- [x] Green for correct, red for wrong
- [x] You can play again
- [x] Error handling if the internet is slow

## Tech Stack

- **React** - The main library
- **JavaScript** - The programming language
- **HTML & CSS** - For the page design
- **Figma** - I designed it here first
- **Open Trivia Database API** - Where the questions come from
- **Libraries used**:
  - `html-entities` - To show special characters
  - `clsx` - To add classes easily
  - `react-confetti` - For celebration animation when you win

## What I Learned

- [x] State Management - Use useState to save information and pass data with props
- [x] useEffect Hook - Fetch data from internet with fetch() and clean up with AbortController
- [x] API Integration - Get questions from external API and handle errors (like 429 errors)
- [x] Fisher-Yates Algorithm - Shuffle question answers randomly so the correct answer is not always in the same place
- [x] JavaScript - Use map() and forEach() to work with arrays
- [x] Styling Radio Inputs - Style radio inputs in nice buttons with CSS
- [x] Conditional Rendering - Show or hide things based on state and give feedback with colors
