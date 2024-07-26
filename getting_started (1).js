/*
@title: getting_started
@tags: ['beginner', 'tutorial']
@addedOn: 2022-07-26
@author: leo, edits: samliu, belle, kara

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

const myTune = tune`
500: B4~500,
15500`;

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
....0000000.....
...033333330....
...033033000....
...033333330....
....0000000.....
....03330.......
....0333000.....
....03330.0.....
....03330.......
...003330.......
..0000000.......
....0..0........
....00.00.......
................
................
................`],
  [ box, bitmap`
................
.......00.......
......0220......
.....022220.....
.....022220.....
....02222220....
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
....02222220....
.....022220.....
......0000......
................`],
  [ goal, bitmap`
................
................
......00000.....
.....0666660....
....066FFF660...
...066FFFFF660..
..066FFFFFFF60..
..0666FFFFF660..
...0666666660...
....00666660....
......00000.....
................
................
................
................
................`],
  [ wall, bitmap`
CCCCCCCCCCCCCCCC
CCC22222CCCCCCCC
CC2222222CCCC2CC
CC2002002CCC2CCC
CC2002002CCCCCCC
CC2222222CCCCCCC
CC2220222CCCCCCC
CCCC222CCCCCCCCC
CCCC000CCCCCCCCC
CCCC222CCCCCCCCC
CCCCCCCCCCC2CCCC
CCCCCCCCCCC22CCC
CCCCCCCCCC22CCCC
CCCCCCCCC22CCCCC
CCCCCCCCCC2CCCCC
CCCCCCCCCCCCCCCC`]
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
..p.
.b.g
....`,
  map`
p..
.b.
..g`,
  map`
p..g
.bw.
..w.
..w.`,
  map`
p...
...b
...b
.bbg`,
  map`
...
.p.
...`,
  map`
p.w.
.bwg
....
..bg`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box],
  [box]: [box]
});

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
  playTune(myTune);
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(myTune);
});

onInput("w", () => {
  getFirst(player).y -= 1;
  playTune(myTune);
});

onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(myTune);
});
// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// these get run after every input
afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
