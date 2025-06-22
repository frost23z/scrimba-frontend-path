# Capstone Project 1: Tenzies

A React-based dice rolling game where players try to get all dice showing the same number. Built as the first capstone project for the React basics module.

## Features

- **Dice Rolling Game**: Roll 10 dice to try and get all the same number
- **Interactive Dice**: Click individual dice to hold their values
- **Victory Celebration**: Confetti animation when the game is won
- **New Game Functionality**: Reset and start a new game at any time
- **Real-time Feedback**: Visual indication of held vs. rollable dice
- **Responsive Design**: Works on desktop and mobile devices
- **Game State Management**: Track held dice and win conditions

## How It Works

1. Game starts with 10 dice showing random numbers (1-6)
2. Players click on dice to "hold" them (preventing them from rolling)
3. Click "Roll" to roll all unheld dice
4. Goal is to get all 10 dice showing the same number
5. When achieved, confetti celebrates the victory
6. Players can start a new game to play again

## Credits

- Part of the Scrimba Frontend Developer Career Path
- Uses nanoid for unique IDs and react-confetti for celebrations