const player = "p";
const egg = "e";
const goal = "g";
const bones = "o";
const shrubs = "s";
const dirt = "d";

const stomp = tune`
500: A4^500,
15500`;
const roar = tune`
75.56675062972292: G4^75.56675062972292 + C4^75.56675062972292,
75.56675062972292: C4^75.56675062972292 + A4^75.56675062972292 + B4^75.56675062972292 + D4/75.56675062972292,
75.56675062972292: C4^75.56675062972292 + E4^75.56675062972292 + C5^75.56675062972292 + D4/75.56675062972292 + G4-75.56675062972292,
75.56675062972292: C4^75.56675062972292 + A4/75.56675062972292 + D4/75.56675062972292 + G4-75.56675062972292,
75.56675062972292: C4^75.56675062972292 + D4/75.56675062972292 + G4-75.56675062972292 + G5-75.56675062972292,
75.56675062972292: C4^75.56675062972292 + C5^75.56675062972292 + D4/75.56675062972292,
75.56675062972292: C4~75.56675062972292,
1889.168765743073`;
const success = tune`
120: A4^120,
120: B4^120,
120: C5^120,
120: D5^120,
3360`;
const victory = tune`
141.50943396226415: A4^141.50943396226415,
141.50943396226415: B4^141.50943396226415,
141.50943396226415: C5^141.50943396226415,
141.50943396226415: D5^141.50943396226415,
141.50943396226415: E5^141.50943396226415,
141.50943396226415: F5^141.50943396226415,
141.50943396226415: G5^141.50943396226415,
141.50943396226415: A5^141.50943396226415,
3396.2264150943397`;
const restart = tune`
125.52301255230125: D5^125.52301255230125,
125.52301255230125: C5^125.52301255230125,
3765.6903765690377`;

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
  [ egg, bitmap`
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
  [ bones, bitmap`
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
CCCCCCCCCCCCCCCC`],
  [ shrubs, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCC4CC
CCCCCCCC4C4C44CC
CCCCCCCCC44C444C
CCCCCCC444444444
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
C4CCCCCCCCCCCCCC
C4C4C4CCCCCCCCCC
44C4444CCCCCCCC4
44444444CCCCCC44
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [ dirt, bitmap`
CCCCCCCCCCCCCCCC
CCCLLCCCCCCCCCCC
CCCCCLLCCCCCCCLC
CCCCCCCCCCLLCCCC
CCCCCCCCCCLCCCCC
CCCLLCCCCCCCCCCC
CCCCCLCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCLLCCCCCCLCCCCC
CCCCLLCCCCCLLCCC
CCCCCCCCCCCCLCCC
CCCCCCLCCCCCCLCC
CCCCLLCCCCCCCLCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`]
);

let level = 0;
const levels = [
  map`
...
peg
...`,
  map`
..p.
.e.g
....`,
  map`
p..
.e.
..g`,
  map`
p...
.o.d
.e..
s..g`,
  map`
g.e.
.p..
sss.
ge.p`,
  map`
p....
..e.g
.doss
p..eg`
];

const currentLevel = levels[level];
addText("Dinokoban!", {y:3,  color:color`6`});
setMap(currentLevel);

setSolids([ player, egg, bones, shrubs, dirt ]);

setPushables({
  [player]: [egg],
  [egg]: [egg]
});

onInput("s", () => {
  getAll(player).forEach((sprite) => {sprite.y += 1});
  playTune(stomp);
});

onInput("d", () => {
  getAll(player).forEach((sprite) => {sprite.x += 1});
  playTune(stomp);
});

onInput("w", () => {
  getAll(player).forEach((sprite) => {sprite.y -= 1});
  playTune(stomp);
});

onInput("a", () => {
  getAll(player).forEach((sprite) => {sprite.x -= 1});
  playTune(stomp);
});
onInput("j", () => {
  let currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

onInput("k", () => {
  playTune(roar);
});
onInput("l", () => {
  setMap(homeScreen);
});


afterInput(() => {
  const targetNumber = tilesWith(goal).length;
  
  const numberCovered = tilesWith(goal, egg).length;

  if (currentLevel === levels[0]) {
    addText("Dinokoban!", {y:3,  color:color`6`});
  }
  if (currentLevel !== levels[0] && currentLevel !== undefined) {
    clearText();
  }
  
  if (numberCovered === targetNumber) {
    
    level = level + 1;
    
    if (level !== levels.length) playTune(success);
    const currentLevel = levels[level];

    
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
        addText("you win!", {color: color`6` });
        addText("\nPress i to restart", {color: color`6` });
        playTune(victory);
        onInput("i", () => {
          playTune(restart);
          clearText();
          level = 0;
          const currentLevel = levels[level];
          setMap(currentLevel);
        });
    }
  }
});
