const displayedWord = document.getElementById("display");
const randomBtn = document.getElementById("random-btn");
const resetBtn = document.getElementById("reset-btn");

const mistakes = document.getElementById("mistakes");
const tries = document.getElementById("tries");

const inputContainer = document.querySelector(".input-container");

const starContainer = document.getElementById("star-container");
const stars = Array.from(starContainer.querySelectorAll(".fa-regular"));

const words = ["flower", "apple", "candle", "manager"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let correctLetters = [];
let wrongLetters = [];
let triesAmt = 0;

function shuffleWord() {
  let shuffledWord = selectedWord
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return shuffledWord;
}

function displayWord() {
  let currentWord = shuffleWord();
  displayedWord.textContent = currentWord;

  inputContainer.innerHTML = "";

  for (let i = 0; i < currentWord.length; i++) {
    const letter = currentWord[i];
    const letterInput = document.createElement("input");
    letterInput.classList.add("letter");
    letterInput.setAttribute("type", "text");
    letterInput.setAttribute("maxLength", "1");
    letterInput.setAttribute("data-id", letter);
    inputContainer.appendChild(letterInput);
    letterInput.addEventListener("keyup", validateInput);
  }
}

function focusNextElement() {
  const inputEls = Array.from(document.querySelectorAll("input"));
  const currInput = document.activeElement;
  const currInputIndex = inputEls.indexOf(currInput);
  const nextInputIndex = (currInputIndex + 1) % inputEls.length;
  const input = inputEls[nextInputIndex];
  input.focus();
}

function validateInput(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        if (correctLetters.length === selectedWord.length) {
          alert("🎉 You win! 🎉");
          startNewGame();
        }
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        if (wrongLetters.length === 6) {
          alert("😭 You Lose! 😖");
          startNewGame();
        }
        mistakes.textContent = wrongLetters.join(", ");
        stars[triesAmt].className = "fa-solid fa-star";
        triesAmt++;
        tries.textContent = `${triesAmt}/5:`;
      }
    }
    focusNextElement();
  }
}

displayWord();

randomBtn.addEventListener("click", startNewGame);

function startNewGame() {
  correctLetters = [];
  wrongLetters = [];
  triesAmt = 0;
  mistakes.innerHTML = "";
  inputContainer.innerHTML = "";
  stars.forEach((star) => (star.className = "fa-regular fa-star"));
  tries.textContent = "";
  displayWord();
}

resetBtn.addEventListener("click", resetCurrentGame);

function resetCurrentGame() {
  const inputEls = Array.from(document.querySelectorAll("input"));
  inputEls.forEach((input) => (input.value = ""));
  correctLetters = [];
  wrongLetters = [];
  triesAmt = 0;
  tries.textContent = "";
  mistakes.innerHTML = "";
  stars.forEach((star) => (star.className = "fa-regular fa-star"));
}
