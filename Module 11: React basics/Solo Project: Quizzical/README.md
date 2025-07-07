# Quizzical

A React-based trivia quiz application that fetches questions from the Open Trivia Database API, featuring customizable quiz options and interactive gameplay.

## Features

- **Customizable Quiz Options**: Choose from different categories, difficulty levels, question types, and number of questions
- **Dynamic Question Loading**: Fetches questions from the Open Trivia Database API based on user preferences
- **Interactive Interface**: Two main screens - intro/setup and quiz questions
- **Answer Selection**: Click-based answer selection with visual feedback
- **Score Tracking**: Shows correct answers after quiz completion
- **HTML Entity Decoding**: Properly displays special characters in questions and answers
- **Play Again Feature**: Restart with new questions easily
- **Responsive Design**: Works on desktop and mobile devices
- **HTML Entities**: Special characters are automatically decoded using the html-entities library

## How It Works

1. Users select quiz preferences on the intro screen (number of questions, category, difficulty, question type)
2. App fetches the specified number of questions from the Open Trivia Database API based on selections
3. Questions are displayed one at a time with multiple choice or true/false answers
4. Users click to select answers, with visual feedback for selected options
5. After answering all questions, users can check their score and see correct answers
6. Play again functionality allows users to start a new quiz with different questions

## Live Demo

[View Live Demo](https://quizzical-23.netlify.app/)

## Credits

- Part of the Scrimba Frontend Developer Career Path
- Uses [Open Trivia Database API](https://opentdb.com/) for quiz questions
- Uses html-entities library for proper character decoding
