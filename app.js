const p1Button = document.querySelector("#p1-button");
const p2Button = document.querySelector("#p2-button");
const p1Display = document.querySelector("#p1-display");
const p2Display = document.querySelector("#p2-display");
const resetButton = document.querySelector("#reset");
const winPointOption = document.querySelector("#winpoin");
const winnerModal = document.querySelector("#winnerModal");
const winnerText = document.querySelector("#winnerText");
const player1Card = document.querySelector("#player1Card");
const player2Card = document.querySelector("#player2Card");

let p1Score = 0;
let p2Score = 0;
let winPoint = 5;
let isGameOver = false;

// Background Particles Animation
function createParticles() {
  const particlesContainer = document.getElementById("particles");

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.width = Math.random() * 6 + 2 + "px";
    particle.style.height = particle.style.width;
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 4 + 4 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Score Animation
function animateScore(display) {
  display.classList.add("score-update");
  setTimeout(() => {
    display.classList.remove("score-update");
  }, 600);
}

// Show Winner Modal
function showWinner(player) {
  winnerText.textContent = `🎉 ${player} Wins! 🎉`;
  winnerModal.classList.add("show");

  if (player === "Player 1") {
    player1Card.classList.add("winner");
  } else {
    player2Card.classList.add("winner");
  }
}

// Close Winner Modal
function closeWinnerModal() {
  winnerModal.classList.remove("show");
  reset();
}

// Reset Game
function reset() {
  isGameOver = false;
  p1Score = 0;
  p2Score = 0;
  p1Display.textContent = "0";
  p2Display.textContent = "0";
  player1Card.classList.remove("winner");
  player2Card.classList.remove("winner");
}

// Player 1 Score
p1Button.addEventListener("click", function () {
  if (!isGameOver) {
    p1Score += 1;
    p1Display.textContent = p1Score;
    animateScore(p1Display);

    if (p1Score === winPoint) {
      isGameOver = true;
      setTimeout(() => showWinner("Player 1"), 300);
    }
  }
});

// Player 2 Score
p2Button.addEventListener("click", function () {
  if (!isGameOver) {
    p2Score += 1;
    p2Display.textContent = p2Score;
    animateScore(p2Display);

    if (p2Score === winPoint) {
      isGameOver = true;
      setTimeout(() => showWinner("Player 2"), 300);
    }
  }
});

// Reset Button
resetButton.addEventListener("click", reset);

// Win Point Change
winPointOption.addEventListener("change", function () {
  winPoint = parseInt(this.value);
  reset();
});

// Keyboard Support
document.addEventListener("keydown", function (e) {
  if (e.key === "1" && !isGameOver) {
    p1Button.click();
  } else if (e.key === "2" && !isGameOver) {
    p2Button.click();
  } else if (e.key === "r" || e.key === "R") {
    reset();
  }
});

// Initialize
createParticles();

// Mobile touch feedback
[p1Button, p2Button].forEach((button) => {
  button.addEventListener("touchstart", function () {
    this.style.transform = "scale(0.95)";
  });

  button.addEventListener("touchend", function () {
    this.style.transform = "";
  });
});
