// Create an audio element for background music
const audio = new Audio("audio/back.mp3");
audio.loop = true; // Enable looping for continuous playback

// Reference to the sound control button
const musicControls = document.getElementById("music-controls");

// Variable to track whether music is playing
let isPlaying = false;

// Try to autoplay audio when the page loads
window.onload = () => {
  audio
    .play()
    .then(() => {
      console.log("Music autoplayed successfully.");
      isPlaying = true;
      musicControls.textContent = "🔊"; // Update button to show sound off
    })
    .catch((error) => {
      console.warn(
        "Autoplay failed. User interaction required to start playback.",
        error
      );
      musicControls.textContent = "🔇";
    });
};

// Toggle sound on/off when the button is clicked
musicControls.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    musicControls.textContent = "🔇"; // Update button to show sound on
  } else {
    audio
      .play()
      .then(() => {
        console.log("Music started.");
        musicControls.textContent = "🔊"; // Update button to show sound off
      })
      .catch((error) => {
        console.warn("Playback failed:", error);
      });
  }
  isPlaying = !isPlaying; // Toggle the playing state
});
