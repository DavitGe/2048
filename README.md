# 2048 Game

A modern implementation of the classic 2048 sliding puzzle game built with React, TypeScript, and Vite. This project features responsive design that works well on both desktop and mobile devices.

## 🎮 How to Play

### Desktop

- Use the **arrow keys** (Up, Down, Left, Right) to move all tiles on the board
- When two tiles with the same number touch, they merge into one with their sum
- Create a tile with the number 2048 to win!

### Mobile

- **Swipe** Up, Down, Left, or Right to move tiles
- The same merging mechanics apply as on desktop

## ✨ Features

- Responsive design for both desktop and mobile
- Touch controls for mobile devices
- Keyboard controls for desktop
- Score tracking
- Game over detection
- New game functionality
- Smooth animations

## 🛠️ Technologies Used

- **React**: For building the user interface
- **TypeScript**: For type safety
- **Vite**: As the build tool and development server
- **Styled Components**: For styling
- **Context API**: For state management

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/DavitGe/2048.git
   cd 2048
   ```

2. Install dependencies:

   ```
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## 📝 Game Logic

The game maintains a 4x4 grid of numbers. When a move is made:

1. All tiles slide as far as possible in the chosen direction
2. Tiles with the same value merge when they collide
3. A new tile (either 2 or 4) appears in a random empty cell
4. If no valid moves are possible, the game ends

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
