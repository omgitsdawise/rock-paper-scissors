// query fields and images
const playerImg = document.querySelector("#player-choice");
const computerImg = document.querySelector("#computer-choice");
const vsText = document.querySelector("#vs");
const resultText = document.querySelector("#result-text");
const playerScoreText = document.querySelector("#player-score");
const computerScoreText = document.querySelector("#computer-score");


// globals
const choices = ['rock', 'paper', 'scissors'];
const winTexts = ['You won!', 'Keep it up!', "That's how it's done"]
const loseTexts = ['You lost', 'Try again', "This is random, so..."]

let playerScore = 0;
let computerScore = 0;
let lastPlay = 'rock'; // default value;

// contains win conditions for player, see function choose
const wins = ['rs', 'pr', 'sp'];



const updateSrc = (what, src) =>
    what.src = "assets/" + src + ".png";


Array.prototype.random = function () {
        return this[Math.floor((Math.random()*this.length))];
}

function showUI(){
    playerImg.style.visibility = "visible";
    computerImg.style.visibility = "visible";
    vsText.style.visibility = "visible";
    resultText.style.visibility = "visible";
}

/*
    The Computer plays by three styles:
    1. randomly
    2. repeats what the player plays in last match;
    3. rotates last choice by one; if last was rock, they play paper;
*/
const randomPlay = () => choices.random();
const repeatLastPlay = () => lastPlay;
const rotateLastPlay = () => choices[(choices.indexOf(lastPlay) + 1) % choices.length];


function ComputerPlay(){
    const play = Math.floor((Math.random() * 3));
    if (play === 0)
        return randomPlay();
    else if (play == 1) return repeatLastPlay();
    else return rotateLastPlay();

}


function updateUI(){
    playerScoreText.innerHTML = 'Your Score: ' + playerScore.toString();
    computerScoreText.innerHTML =  'Computer Score: ' + computerScore.toString();
}


function win(){
    resultText.innerHTML = winTexts.random();
    resultText.classList.add('win-text');
    resultText.classList.remove('lose-text');
    playerScore++;

}

function lose(){
    resultText.innerHTML = loseTexts.random();
    resultText.classList.add('lose-text');
    resultText.classList.remove('win-text');
    computerScore++;
}
function draw(){
    resultText.innerHTML = "Draw!";
    resultText.classList.remove('lose-text');
    resultText.classList.remove('win-text');

}

/*
    Rock Paper Scissors => RS, RP, PR, PS, SR, SP
    RS => Player wins if they choose Rock, and computer chooses Scissors
*/

function choose(playerChoice){
    showUI();

    const computerChoice = ComputerPlay();
    updateSrc(computerImg, computerChoice);
    updateSrc(playerImg, playerChoice);

    lastPlay = playerChoice;
    const choiceLetters = playerChoice[0] + computerChoice[0];

    // draw
    if (playerChoice === computerChoice) draw();
    else if (wins.includes(choiceLetters)) win();
    else lose();
    updateUI();

}