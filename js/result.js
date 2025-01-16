// Declare score outside the playGame function to retain values across game rounds
let score = {
  won: 0,
  lost: 0,
  draw: 0,
};

function playGame(userChoice) {
  let randomNumber = Math.random() * 3;
  let computerChoice;

  // Determine computer choice
  if (randomNumber > 0 && randomNumber <= 1) {
    computerChoice = "Bat";
  } else if (randomNumber > 1 && randomNumber <= 2) {
    computerChoice = "Ball";
  } else {
    computerChoice = "Stump";
  }

  // Determine result
  let result;
  let videoSrc;
  if (userChoice === computerChoice) {
    score.draw++;
    result =
      `<span style='color: #ffd700;'>Upps! This Match Is Tie. Try Again.</span> <br> Won - ${score.won} Lost - ${score.lost} Tie - ${score.draw}`;
    videoSrc = "video/draw.mp4"; // Video for draw
  } else if (
    (userChoice === "Bat" && computerChoice === "Ball") ||
    (userChoice === "Ball" && computerChoice === "Stump") ||
    (userChoice === "Stump" && computerChoice === "Bat")
  ) {
    score.won++;
    result =
      `<span style='color: #228b22;'>Hurray! You Won This Match.</span> <br> Won - ${score.won} Lost - ${score.lost} Tie - ${score.draw}`;
    videoSrc = "video/won.mp4"; // Video for win
  } else {
    score.lost++;
    result =
      `<span style='color: red;'>Ohooo! You Lost This Match. Better Luck Next Time.</span> <br> Won - ${score.won} Lost - ${score.lost} Tie - ${score.draw}`;
    videoSrc = "video/lost.mp4"; // Video for loss
  }

  // Show modal with result and set text color to #000
  document.getElementById(
    "modalTitle"
  ).innerHTML = `<span style="color: #000;">You Chose - ${userChoice}</span>`;
  document.getElementById(
    "modalMessage"
  ).innerHTML = `<span style="color: #000;">Computer Chose - ${computerChoice}.<br>${result}</span>`;

  const videoElement = document.getElementById("modalVideo");
  videoElement.src = videoSrc;
  videoElement.load();
  videoElement.play(); // Auto-play the video
  openModal();
}

function openModal() {
  document.getElementById("resultModal").style.display = "flex";
}

function closeModal() {
  const videoElement = document.getElementById("modalVideo");
  videoElement.pause(); // Pause the video
  videoElement.currentTime = 0; // Reset the video to the beginning
  document.getElementById("resultModal").style.display = "none";
}
