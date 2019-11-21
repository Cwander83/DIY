// pull data from json
let ohioScores = [];
let michScores = [];
let ohioWins = 0;
let michWins = 0;
let atOhio = 0;
let atMich = 0;

fetchJson = () => {
  fetch("ohioStateVsMichigan.json")
    .then(response => {
      return response.json();
    })
    .then(data => {
      let game = data.results;
      modifyJson(game);
    })
    .catch(err => {
      console.log(err);
    });
};

// pulls data from json and fills global arrays and new values
modifyJson = game => {
  for (var i = 0; i < game.length; i++) {
    ohioScores.push(parseInt(game[i].ohioStateScore));

    michScores.push(parseInt(game[i].michiganScore));

    if (!game[i].ohioStateWin == "") {
      ohioWins++;
    } else {
      michWins++;
    }

    if (game[i].location === "Columbus,  OH") {
      atOhio++;
    } else {
      atMich++;
    }
  }

  // finds sum of scores
  let ohioTotal = ohioScores.reduce((a, b) => a + b, 0);
  let michTotal = michScores.reduce((a, b) => a + b, 0);

  // call funciton to find avg of points by each team
  let ohioAvg = avgerageOfPoints(ohioTotal, ohioScores);
  let michAvg = avgerageOfPoints(michTotal, michScores);

  //
  draw(
    atMich,
    atOhio,
    ohioWins,
    michWins,
    ohioAvg,
    michAvg,
    ohioScores,
    michScores
  );
};

// function for  average points
const avgerageOfPoints = (total, scores) => {
  return total / scores.length;
};

// creates graph bars
const drawHbar = (w, y, x, h, label, color) => {
  rect(x, y, w, h);

  let labelX = x + w + 5;
  fill(color);
  text(label, labelX, y + 20);
};

// creates the title for graph
const drawWords = (x, y) => {
  fill(0);
  text("History Stats Ohio State vs Michigan Game 1897-2018", x, y);
};

// p5js create canvas start
function setup() {
  createCanvas(800, 400);
  background("white");
}

// function for each graph bar
const draw = (
  atMich,
  atOhio,
  ohioWins,
  michWins,
  ohioAvg,
  michAvg,
  ohioScores,
  michScores
) => {
  textSize(24);
  drawWords(40, 30);

  // text size for graph
  textSize(16);
  //
  fill("red");
  drawHbar(atOhio * 7, 45, 30, 40, `At the horseshoe: ${atOhio}`, "red");
  fill("blue");
  drawHbar(atMich * 7, 85, 30, 40, `At the big house: ${atMich}`, "blue");

  fill("red");
  drawHbar(ohioWins * 7, 160, 30, 40, `Total of OSU wins: ${ohioWins}`, "red");
  fill("blue");
  drawHbar(michWins * 7, 200, 30, 40, `Total of UM wins: ${michWins}`, "blue");

  fill("red");
  drawHbar(
    ohioAvg * 7,
    270,
    30,
    40,
    `OSU average points per game: ${ohioAvg.toFixed(2)}`,
    "red"
  );
  fill("blue");
  drawHbar(
    michAvg * 7,
    310,
    30,
    40,
    `UM average points per game ${michAvg.toFixed(2)}`,
    "blue"
  );

  
};

// starts data transfer from json
fetchJson();
