This game was created by following the tutorial at: https://www.freecodecamp.org/news/how-to-build-a-snake-game-in-javascript/

I followed this tutorial as a warm up to The Odin Project JavaScript Course: Knights Travails Project. It's been several months since I've made a "gameboard" type of project with JavaScript and I want to re-familiarize myself with the layout and process before tackling my assignment.

11/8/24

Today I revisited this project with the goal to make it look cleaner and have more functionality.
I added some CSS, added arrow key functionality, and fixed some errors within the grid element. 
Image sources:
- Background image src: https://www.freepik.com/premium-vector/ground-seamless-pattern-soil-background-with-bones-skull-game-design_21427298.htm
- Frog img: https://art.pixilart.com/6fb79cf28f19cdb.png

TO-DO:
- Add additional "enemies" to catch: mouse, small bird, egg
- Add enemies to AVOID: bigger birds, owl, mongoose, cats
- Add a screen before each new "level" telling player whether they should collect/avoid new elements
- Increase speed after every few levels
- Increase grid size after 15 levels
- Add moving enemies that will chase the player (after 20ish levels)

11/9/24
I've worked out the basic bugs and have the game functioning smoothly! The frog disappears after the snake "eats" it, a new frog is placed, the score increments for each frog eaten, and the arrow keys all make the snake move as expected. 
The only real issue left is that sometimes the frog will spawn in the same spot 3 times before being spawned in a new random square. That still needs more troubleshooting.