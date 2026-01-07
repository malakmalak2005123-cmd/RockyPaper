export { };

type Choice = "rock" | "paper" | "scissors";
const choices: Choice[] = ["rock", "paper", "scissors"];

let userScore = 0;
let computerScore = 0;

let wins: number = Number(localStorage.getItem("rpsWins")) || 0;
let losses: number = Number(localStorage.getItem("rpsLosses")) || 0;
let draws: number = Number(localStorage.getItem("rpsDraws")) || 0;

let bestScore: number = Number(localStorage.getItem("bestScore")) || 0;

function getComputerChoice(): Choice {
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function playRound(userChoice: Choice): string {
  const computerChoice = getComputerChoice();
  let message: string = "";

  if (userChoice === computerChoice) {
    message = "It's a Draw! 🤝";
    draws++;
    localStorage.setItem("rpsDraws", draws.toString());
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    message = "You Win! 🎉";
    wins++;
    userScore++;
    localStorage.setItem("rpsWins", wins.toString());

    if (userScore > bestScore) {
      bestScore = userScore;
      localStorage.setItem("bestScore", bestScore.toString());
    }
  } else {
    message = "Computer Wins! 😢";
    losses++;
    computerScore++;
    localStorage.setItem("rpsLosses", losses.toString());
  }

  return `You: ${userChoice.toUpperCase()}  VS  Computer: ${computerChoice.toUpperCase()}
\n${message}`;
}

const rockBtn = document.getElementById("rock") as HTMLButtonElement;
const paperBtn = document.getElementById("paper") as HTMLButtonElement;
const scissorsBtn = document.getElementById("scissors") as HTMLButtonElement;
const resetBtn = document.getElementById("reset") as HTMLButtonElement;

const resultEl = document.getElementById("result") as HTMLPreElement;
const winsP = document.getElementById("wins") as HTMLSpanElement;
const lossesP = document.getElementById("losses") as HTMLSpanElement;
const drawsP = document.getElementById("draws") as HTMLSpanElement;
const bestP = document.getElementById("bestScore") as HTMLSpanElement;

function updateScoreDisplay() {
  winsP.textContent = wins.toString();
  lossesP.textContent = losses.toString();
  drawsP.textContent = draws.toString();
  bestP.textContent = bestScore.toString();
}

updateScoreDisplay();

rockBtn.addEventListener("click", () => {
  resultEl.textContent = playRound("rock");
  updateScoreDisplay();
});

paperBtn.addEventListener("click", () => {
  resultEl.textContent = playRound("paper");
  updateScoreDisplay();
});

scissorsBtn.addEventListener("click", () => {
  resultEl.textContent = playRound("scissors");
  updateScoreDisplay();
});


resetBtn.addEventListener("click", () => {
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
