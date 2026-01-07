"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var choices = ["rock", "paper", "scissors"];
var userScore = 0;
var computerScore = 0;
var wins = Number(localStorage.getItem("rpsWins")) || 0;
var losses = Number(localStorage.getItem("rpsLosses")) || 0;
var draws = Number(localStorage.getItem("rpsDraws")) || 0;
var bestScore = Number(localStorage.getItem("bestScore")) || 0;
function getComputerChoice() {
    var randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}
function playRound(userChoice) {
    var computerChoice = getComputerChoice();
    var message = "";
    if (userChoice === computerChoice) {
        message = "It's a Draw! 🤝";
        draws++;
        localStorage.setItem("rpsDraws", draws.toString());
    }
    else if ((userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")) {
        message = "You Win! 🎉";
        wins++;
        userScore++;
        localStorage.setItem("rpsWins", wins.toString());
        if (userScore > bestScore) {
            bestScore = userScore;
            localStorage.setItem("bestScore", bestScore.toString());
        }
    }
    else {
        message = "Computer Wins! 😢";
        losses++;
        computerScore++;
        localStorage.setItem("rpsLosses", losses.toString());
    }
    return "You: ".concat(userChoice.toUpperCase(), "  VS  Computer: ").concat(computerChoice.toUpperCase(), "\n\n").concat(message);
}
var rockBtn = document.getElementById("rock");
var paperBtn = document.getElementById("paper");
var scissorsBtn = document.getElementById("scissors");
var resetBtn = document.getElementById("reset");
var resultEl = document.getElementById("result");
var winsP = document.getElementById("wins");
var lossesP = document.getElementById("losses");
var drawsP = document.getElementById("draws");
var bestP = document.getElementById("bestScore");
function updateScoreDisplay() {
    winsP.textContent = wins.toString();
    lossesP.textContent = losses.toString();
    drawsP.textContent = draws.toString();
    bestP.textContent = bestScore.toString();
}
updateScoreDisplay();
rockBtn.addEventListener("click", function () {
    resultEl.textContent = playRound("rock");
    updateScoreDisplay();
});
paperBtn.addEventListener("click", function () {
    resultEl.textContent = playRound("paper");
    updateScoreDisplay();
});
scissorsBtn.addEventListener("click", function () {
    resultEl.textContent = playRound("scissors");
    updateScoreDisplay();
});
resetBtn.addEventListener("click", function () {
    userScore = 0;
    computerScore = 0;
    wins = 0;
    losses = 0;
    draws = 0;
    bestScore = 0;
    localStorage.removeItem("rpsWins");
    localStorage.removeItem("rpsLosses");
    localStorage.removeItem("rpsDraws");
    localStorage.removeItem("bestScore");
    resultEl.textContent = "Game reset! 🆕";
    updateScoreDisplay();
});
