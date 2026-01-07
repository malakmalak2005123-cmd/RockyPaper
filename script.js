"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
var choices = ["rock", "paper", "scissors"];
var userScore = 0;
var computerScore = 0;
var wins = Number(localStorage.getItem("rpsWins")) || 0;
var losses = Number(localStorage.getItem("rpsLosses")) || 0;
var draws = Number(localStorage.getItem("rpsDraws")) || 0;
var bestScore = Number(localStorage.getItem("bestScore")) || 0;

// Visual Elements Variables
var resultArea = document.getElementById("result-area");
var userIcon = document.getElementById("user-icon");
var computerIcon = document.getElementById("computer-icon");
var roundStatus = document.getElementById("round-status");
var userCard = userIcon.parentElement;
var computerCard = computerIcon.parentElement;

var emojis = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
};

function getComputerChoice() {
    var randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}
function showLoadingState() {
    resultArea.classList.remove("hidden");

    // Set to Rock & Shake
    userIcon.textContent = "✊";
    computerIcon.textContent = "✊";

    userCard.classList.add("shuffle");
    computerCard.classList.add("shuffle");

    // Reset other classes
    userCard.classList.remove("winner", "loser", "draw");
    computerCard.classList.remove("winner", "loser", "draw");

    roundStatus.textContent = "Wait... ⏳";
    roundStatus.style.color = "#94a3b8";
}

function updateBattlefield(userChoice, computerChoice, result) {
    resultArea.classList.remove("hidden");

    // Remove Shake
    userCard.classList.remove("shuffle");
    computerCard.classList.remove("shuffle");

    // Update Icons
    userIcon.textContent = emojis[userChoice];
    computerIcon.textContent = emojis[computerChoice];

    // Reset Classes
    userCard.classList.remove("winner", "loser", "draw");
    computerCard.classList.remove("winner", "loser", "draw");

    // Apply Effects & Message
    if (result === "win") {
        userCard.classList.add("winner");
        computerCard.classList.add("loser");
        roundStatus.textContent = "YOU WIN! 🎉";
        roundStatus.style.color = "#a855f7";
    } else if (result === "lose") {
        userCard.classList.add("loser");
        computerCard.classList.add("winner");
        roundStatus.textContent = "YOU LOSE 😢";
        roundStatus.style.color = "#ef4444";
    } else {
        userCard.classList.add("draw");
        computerCard.classList.add("draw");
        roundStatus.textContent = "DRAW 🤝";
        roundStatus.style.color = "#94a3b8";
    }
}

function playRound(userChoice) {
    showLoadingState(); // Start Animation

    var computerChoice = getComputerChoice();
    var result = ""; // Fixed: result instead of message

    if (userChoice === computerChoice) {
        result = "draw";
        draws++;
        localStorage.setItem("rpsDraws", draws.toString());
    }
    else if ((userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")) {
        result = "win";
        wins++;
        userScore++;
        localStorage.setItem("rpsWins", wins.toString());
        if (userScore > bestScore) {
            bestScore = userScore;
            localStorage.setItem("bestScore", bestScore.toString());
        }
    }
    else {
        result = "lose";
        losses++;
        computerScore++;
        localStorage.setItem("rpsLosses", losses.toString());
    }

    setTimeout(function () {
        updateBattlefield(userChoice, computerChoice, result);
        updateScoreDisplay();
    }, 1000); // 1-second delay
}

var rockBtn = document.getElementById("rock");
var paperBtn = document.getElementById("paper");
var scissorsBtn = document.getElementById("scissors");
var resetBtn = document.getElementById("reset");
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
    playRound("rock");
});
paperBtn.addEventListener("click", function () {
    playRound("paper");
});
scissorsBtn.addEventListener("click", function () {
    playRound("scissors");
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
    localStorage.removeItem("bestScore");

    resultArea.classList.add("hidden");
    updateScoreDisplay();
});
