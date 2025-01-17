// Initialize score from localStorage or default values
const initializeScore = () => {
  const savedScore = localStorage.getItem("Score");
  return savedScore ? JSON.parse(savedScore) : { won: 0, lost: 0, draw: 0 };
};

let score = initializeScore();
updateScoreDisplay();

// Play the game with the user's choice
function playGame(userChoice) {
  const computerChoice = getComputerChoice();
  const { resultMessage, videoSrc } = determineResult(
    userChoice,
    computerChoice
  );

  // Update the modal content with the game result (without showing score)
  updateModalContent(userChoice, computerChoice, resultMessage, videoSrc);

  // Save updated score to localStorage
  localStorage.setItem("Score", JSON.stringify(score));

  // Update score display
  updateScoreDisplay();

  // Open the modal to display the result
  openModal();
}

// Update the score display
function updateScoreDisplay() {
  const scoreDisplay = document.getElementById("scoreDisplay");
  scoreDisplay.value = `Current Score - Won: ${score.won} | Lost: ${score.lost} | Tie: ${score.draw}`;
}

// Generate computer's choice randomly
function getComputerChoice() {
  const randomNumber = Math.floor(Math.random() * 3); // Generates 0, 1, or 2
  return ["Bat", "Ball", "Stump"][randomNumber]; // This will return "Bat", "Ball", or "Stump"
}

// Determine the result of the game
function determineResult(userChoice, computerChoice) {
  let resultMessage, videoSrc;

  if (userChoice === computerChoice) {
    score.draw++;
    resultMessage = generateResultMessage(
      "Tie",
      `Upps! This Match Is Tie. Try Again.`
    );
    videoSrc = "video/draw.mp4";
  } else if (
    (userChoice === "Bat" && computerChoice === "Ball") ||
    (userChoice === "Ball" && computerChoice === "Stump") ||
    (userChoice === "Stump" && computerChoice === "Bat")
  ) {
    score.won++;
    resultMessage = generateResultMessage("Win", `Hurray! You Won This Match.`);
    videoSrc = "video/won.mp4";
  } else {
    score.lost++;
    resultMessage = generateResultMessage(
      "Loss",
      `Ohooo! You Lost This Match. Better Luck Next Time.`
    );
    videoSrc = "video/lost.mp4";
  }

  return { resultMessage, videoSrc };
}

// Generate a styled result message (without score in modal)
function generateResultMessage(outcome, message) {
  const colorMap = { Win: "#228b22", Loss: "red", Tie: "#ffd700" };
  return `<span style='color: ${colorMap[outcome]};'>${message}</span>`;
}

// Update modal content with the result and play the video
function updateModalContent(
  userChoice,
  computerChoice,
  resultMessage,
  videoSrc
) {
  document.getElementById(
    "modalTitle"
  ).innerHTML = `<span style="color: #000;">You Chose - ${userChoice}</span>`;
  document.getElementById(
    "modalMessage"
  ).innerHTML = `<span style="color: #000;">Computer Chose - ${computerChoice}.<br>${resultMessage}</span>`;

  const videoElement = document.getElementById("modalVideo");
  videoElement.src = videoSrc;
  videoElement.load();
  videoElement.play();
}

// Reset the score and clear localStorage
function resetGame() {
  localStorage.clear(); // Clear all localStorage data
  score = { won: 0, lost: 0, draw: 0 }; // Reset score object
  alert("Your scores have been reset!");

  // Update the score display after reset
  updateScoreDisplay();
}

// Display the modal
function openModal() {
  document.getElementById("resultModal").style.display = "flex";
}

// Close the modal and reset the video
function closeModal() {
  const videoElement = document.getElementById("modalVideo");
  videoElement.pause();
  videoElement.currentTime = 0;
  document.getElementById("resultModal").style.display = "none";
}
