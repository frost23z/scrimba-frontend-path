# Blackjack Game

A classic Blackjack card game implemented in vanilla JavaScript with an authentic casino table design.

## Features

- **Classic Blackjack Gameplay**: Traditional card game rules with proper scoring
- **Player Profile**: Track your name and chip count
- **Card Drawing System**: Start with two cards and draw additional cards as needed
- **Intelligent Card Logic**: 
  - Face cards (J, Q, K) count as 10
  - Aces count as 11
  - Number cards count as their face value
- **Game State Management**: Proper handling of win/lose conditions
- **Authentic Casino Design**: 
  - Casino table background image
  - Goldenrod color scheme
  - Trebuchet MS font for classic look
- **Interactive Controls**: 
  - START GAME button to begin a new round
  - NEW CARD button to draw additional cards
- **Real-time Feedback**: Dynamic messages based on game state

## Live Demo

[View Live Demo](https://blackjack-game-23.netlify.app/)

## Preview

![Blackjack Game Preview](/images/demo.png)

## How to Play

1. **Start the Game**: Click the "START GAME" button to deal your initial two cards
2. **Check Your Hand**: View your cards and current sum
3. **Make Decisions**: 
   - If sum ≤ 20: You can draw a new card or stay
   - If sum = 21: Blackjack! You win!
   - If sum > 21: Bust! You're out of the game
4. **Draw Cards**: Click "NEW CARD" to add another card to your hand
5. **Win Conditions**:
   - Get exactly 21 for Blackjack
   - Stay under 21 and closer to 21 than the dealer would be

## Game Rules

- **Objective**: Get as close to 21 as possible without going over
- **Card Values**:
  - Number cards (2-10): Face value
  - Face cards (J, Q, K): 10 points
  - Ace: 11 points
- **Blackjack**: Exactly 21 points
- **Bust**: Over 21 points (automatic loss)

## 🚀 How to Run

1. Clone or download the project files
2. Open `index.html` in your web browser
3. The game will load with the casino table background
4. Click "START GAME" to begin playing

No build process or dependencies required - it's a pure HTML/CSS/JavaScript project!