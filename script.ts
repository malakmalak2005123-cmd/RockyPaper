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

// ---------------- HTML Elements ----------------
const rockBtn = document.getElementById("rock") as HTMLButtonElement;
const paperBtn = document.getElementById("paper") as HTMLButtonElement;
const scissorsBtn = document.getElementById("scissors") as HTMLButtonElement;
const resetBtn = document.getElementById("reset") as HTMLButtonElement;

// Visual Elements
const resultArea = document.getElementById("result-area") as HTMLDivElement;
const userIcon = document.getElementById("user-icon") as HTMLDivElement;
const computerIcon = document.getElementById("computer-icon") as HTMLDivElement;
const roundStatus = document.getElementById("round-status") as HTMLHeadingElement;
const userCard = userIcon.parentElement as HTMLDivElement;
const computerCard = computerIcon.parentElement as HTMLDivElement;

const winsP = document.getElementById("wins") as HTMLSpanElement;
const lossesP = document.getElementById("losses") as HTMLSpanElement;
const drawsP = document.getElementById("draws") as HTMLSpanElement;
const bestP = document.getElementById("bestScore") as HTMLSpanElement;

const emojis: Record<Choice, string> = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️",
};

// ---------------- Update Display ----------------
function updateScoreDisplay() {
  winsP.textContent = wins.toString();
  lossesP.textContent = losses.toString();
  drawsP.textContent = draws.toString();
  bestP.textContent = bestScore.toString();
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

function updateBattlefield(userChoice: Choice, computerChoice: Choice, result: "win" | "lose" | "draw") {
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
    roundStatus.style.color = "#a855f7"; // Secondary
  } else if (result === "lose") {
    userCard.classList.add("loser");
    computerCard.classList.add("winner");
    roundStatus.textContent = "YOU LOSE 😢";
    roundStatus.style.color = "#ef4444"; // Red
  } else {
    userCard.classList.add("draw");
    computerCard.classList.add("draw");
    roundStatus.textContent = "DRAW 🤝";
    roundStatus.style.color = "#94a3b8"; // Muted
  }
}

const playRound = (userChoice: Choice): void => {
  showLoadingState(); // Start Animation

  const computerChoice = getComputerChoice();
  let result: "win" | "lose" | "draw";

  if (userChoice === computerChoice) {
    result = "draw";
    draws++;
    localStorage.setItem("rpsDraws", draws.toString());
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "win";
    wins++;
    userScore++;
    localStorage.setItem("rpsWins", wins.toString());
    if (userScore > bestScore) {
      bestScore = userScore;
      localStorage.setItem("bestScore", bestScore.toString());
    }
  } else {
    result = "lose";
    losses++;
    computerScore++;
    localStorage.setItem("rpsLosses", losses.toString());
  }

  setTimeout(() => {
    updateBattlefield(userChoice, computerChoice, result);
    updateScoreDisplay();
  }, 1000);
};

updateScoreDisplay();

rockBtn.addEventListener("click", () => playRound("rock"));
paperBtn.addEventListener("click", () => playRound("paper"));
scissorsBtn.addEventListener("click", () => playRound("scissors"));

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

  resultArea.classList.add("hidden");
  updateScoreDisplay();
});
