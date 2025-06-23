# 🐍 Snake Mania Game

This project is an enhanced version of the classic Snake Game, developed using **HTML**, **CSS**, and **JavaScript**. The game runs entirely in the browser without any external libraries or frameworks and introduces multiple interactive and challenging features to make the gameplay more dynamic and engaging.

### 🎯 **Objective**

The main objective of this project is to recreate the traditional snake game with **modern features**, **user engagement enhancements**, and **increased complexity**, providing a more interactive gaming experience for users.

### 🔧 **Core Functionalities**

1. **Snake Movement & Growth**

   * The snake moves using the arrow keys (Up, Down, Left, Right).
   * Eating food causes the snake to grow in length.
   * Movement is smooth and updates are rendered on each animation frame.

2. **Food Generation**

   * Food appears at random positions on the grid.
   * It avoids spawning on the snake's body or on obstacles.
   * Every time food is eaten, score increases and new food is generated.

3. **Obstacles**

   * Obstacles are generated in random patterns (like lines, squares, L-shapes).
   * They appear at safe positions (not on the snake or food).
   * **Dynamic feature**: Obstacles **change positions every time food is eaten**, increasing the game’s complexity and requiring player adaptability.

4. **Collision Detection**

   * The game ends if the snake collides with:

     * Itself
     * The wall boundaries
     * Any obstacle

5. **Speed Increase**

   * As the player's score increases, the snake's speed increases automatically, providing a progressively harder challenge.

6. **Start & Game Over Screens**

   * A welcome screen allows the player to start the game.
   * On game over, the screen displays:

     * Final score
     * High score
     * Options to play again or exit

7. **High Score Storage**

   * High scores are saved locally using the browser’s `localStorage`.
   * It persists across sessions, making the game competitive for repeat play.

8. **Audio Effects**

   * Background music plays during gameplay.
   * Separate sound effects are triggered for food consumption, movement, and game over, enhancing user feedback and immersion.

### 💻 **Technical Stack**

* **HTML**: Defines the game structure and interface layout.
* **CSS**: Uses **CSS Grid** to lay out the game board and style the snake, food, and obstacles.
* **JavaScript**:

  * Implements game logic (movement, scoring, collision).
  * Handles real-time DOM updates for rendering.
  * Manages user input and sound effects.
  * Maintains game state, speed, and score tracking.

### 🧠 **Challenges Solved**

* Ensuring **food and obstacles never overlap** with the snake.
* Dynamically generating **safe and varied obstacle shapes**.
* Implementing **real-time movement logic** using requestAnimationFrame.
* Maintaining clean and reusable code without any third-party libraries.

### 🌟 **Unique Enhancements Over Classic Snake**

* Dynamic obstacle repositioning on every food collection.
* Game over UI with score summary and high score tracking.
* Progressive difficulty via automatic speed increase.
* Visually styled and responsive layout with clear color-coded elements.
