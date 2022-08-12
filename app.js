//All variables/DOM navigation used for this application.

let rng;
let gameResult;
let winStreak = 0;
let scoreBoard = 0;
let difficulty = 0;
let alertAmount = 0;
let alertArea = document.querySelector(".alert-area");
let cupArea = document.querySelector(".game-app");
let winCounter = 0;
let loseCounter = 0;

//Array for messages for when the person wins or loses.
let winMessage = [
  "Nice! First luck of the draw.",
  "2 in a row! Start of something good.",
  "3 in a row? Maybe go out or something; might find 5 dollars somewhere.",
  "4... clovers around the corner?",
  "Time to start going to the lottery; why are you still here!",
];

let loseMessage = [
  "Don't let it get to you; it'll something good will happen someday!",
  "Only a second time! You'll have thousands of chances later.",
  "Third times not always the charm, but that's no big deal.",
  "Huh, you sure you're not possessed or the difficulty is not too high?",
  "If you're playing at difficulty 3 or 4, I feel bad for you.",
];

document.querySelector("#winStreak").innerHTML =
  "<b>Current Win Streak:</b> " + winStreak;
document.querySelector("#scoreBoard").innerHTML =
  "<b>Max Win Streak:</b> " + scoreBoard;

// Change the difficulty by taking the value of the input
const difficultyChange = () => {
  difficulty = document.querySelector("#difficulty").value;
  console.log(difficulty);
};

//First, check if the input itself has any childs first to avoid adding buttons from the previous value.
// Next, create the buttons based on the difficuty value pulled from difficultyChange()
const cupAmount = () => {
  if (difficulty > 12) {
    document.querySelector(".results").innerText =
      "Input number 12 and under please.";
  } else if (isNaN(difficulty) == true) {
    document.querySelector(".results").innerText = "Input a number please.";
  } else {
    document.querySelector(".results").innerText = "Guess the number!";
    while (cupArea.hasChildNodes()) {
      cupArea.removeChild(cupArea.firstChild);
    }

    for (let i = 0; i < difficulty; i++) {
      let cupButton = document.createElement("button");
      let cupNumber = document.createTextNode(i + 1);
      cupButton.appendChild(cupNumber);
      cupButton.setAttribute("class", "game-cup");
      cupButton.setAttribute("onclick", "chooseCup(" + (i + 1) + ")");
      cupArea.appendChild(cupButton);
    }
  }
};

//To fix the counter going over the number 5 and creating undefined, let it stop counting after a specific amount.
const winMessageFix = () => {
  if (winCounter == 5) {
    winCounter == winCounter;
  } else {
    winCounter++;
  }
};

const loseMessageFix = () => {
  if (loseCounter == 5) {
    loseCounter == loseCounter;
  } else {
    loseCounter++;
  }
};

const clearAlert = () =>{
  while (alertArea.hasChildNodes()) {
    alertAmount = 0;
    alertArea.removeChild(alertArea.firstChild);
  }
}

//This creates the alert boxes. If it exceeds 3, then remove one and go back to 2. This prevents it from overadding the alerts.
const alertBox = () => {
  if (alertAmount === 3) {
    alertArea.removeChild(alertArea.childNodes[2]);
    alertAmount--;
  }

  if (winStreak > scoreBoard) {
    scoreBoard = winStreak;
    document.querySelector("#scoreBoard").innerHTML =
      "<b>Max Win Streak:</b> " + scoreBoard;
  }

  if (gameResult == true) {
    winMessageFix();
    let winBox = document.createElement("div");
    let winPara1 = document.createElement("p");
    let winPara2 = document.createElement("p");
    let winMessageDisplay = document.createTextNode(winMessage[winCounter - 1]);
    let alertNumbers = document.createTextNode(
      "Win! You got lucky " + winStreak + " times."
    );
    winBox.setAttribute("class", "win-alert");
    alertArea.insertBefore(winBox, alertArea.childNodes[0]);
    winBox.appendChild(winPara1);
    winBox.appendChild(winPara2);
    winPara1.appendChild(alertNumbers);
    winPara2.appendChild(winMessageDisplay);
    alertAmount++;
  }
  if (gameResult == false) {
    loseMessageFix();
    let loseBox = document.createElement("div");
    let losePara1 = document.createElement("p");
    let losePara2 = document.createElement("p");
    let loseMessageDisplay = document.createTextNode(
      loseMessage[loseCounter - 1]
    );
    let alertNumbers = document.createTextNode(
      "Lose! The lucky number was " +
        rng +
        ". You were lucky " +
        winStreak +
        " times."
    );
    loseBox.setAttribute("class", "lost-alert");
    alertArea.insertBefore(loseBox, alertArea.childNodes[0]);
    loseBox.appendChild(losePara1);
    loseBox.appendChild(losePara2);
    losePara1.appendChild(alertNumbers);
    losePara2.appendChild(loseMessageDisplay);
    alertAmount++;
  }
};

//Using math.random, we can randomize the number that allows the user to win. Then, with if else statements we can define what classifies as a win or not.
//Afterwards, we can start overwriting numbers so that scoreboard and winstreak is updated.
const chooseCup = (choice) => {
  rng = Math.floor(Math.random() * difficulty) + 1;
  console.log(rng);
  if (choice == rng) {
    loseCounter = 0;
    console.log(choice);
    document.querySelector(".results").innerText = "Lucky Day!";
    gameResult = true;
    winStreak++;
    alertBox();
    gameResult = undefined;
    document.querySelector("#winStreak").innerHTML =
      "<b>Current Win Streak:</b> " + winStreak;
  } else if (choice != rng) {
    winCounter = 0;
    console.log(choice);
    document.querySelector(".results").innerText = "Always next time.";
    gameResult = false;
    alertBox();
    winStreak = 0;
    document.querySelector("#winStreak").innerHTML =
      "<b>Current Win Streak:</b> " + winStreak;
    gameResult = undefined;
  } else {
    document.querySelector(".results").innerText = "Choose a selection.";
  }
};
