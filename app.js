const displayedWord = document.getElementById("display");
const randomBtn = document.getElementById("random-btn");
const resetBtn = document.getElementById("reset-btn");

const mistakes = document.getElementById("mistakes");
const tries = document.getElementById("tries");

const inputContainer = document.querySelector(".input-container");

const words = ["flower", "apple", "candle", "manager"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let correctLetters = [];
let wrongLetters = [];
let triesAmt = 1;

// inputEls.forEach((input) => {
//   input.addEventListener("click", focusEmptyElement);
// });

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
    letterInput.addEventListener("click", focusEmptyElement);
    letterInput.addEventListener("keyup", validateInput);
  }
}

function validateInput(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        focusNextElement();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        mistakes.textContent = wrongLetters.join(", ");
        tries.textContent = triesAmt;
        triesAmt++;
        focusNextElement();
      }
    }
  }
}

function focusEmptyElement() {
  const inputEls = Array.from(document.querySelectorAll("input"));
  const emptyInput = inputEls.find((input) => input.value === "");
  if (emptyInput) {
    emptyInput.focus();
  } else {
    inputEls[0].focus();
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

displayWord();
