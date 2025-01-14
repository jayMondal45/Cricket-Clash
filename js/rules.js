// Get the modal, button, and close elements
const modal = document.getElementById("rulesModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementsByClassName("close")[0];

// Open the modal when the "Click Here" button is clicked
openModalBtn.onclick = function () {
  modal.style.display = "block";
};

// Close the modal when the "X" is clicked
closeModalBtn.onclick = function () {
  modal.style.display = "none";
};

// Close the modal if the user clicks outside of it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
