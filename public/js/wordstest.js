const startBtn = document.querySelector(".start"),
  writeWords = document.querySelector(".randomWords"),
  gameUserTranslation = document.querySelector(".user-translation"),
  checkBtn = document.querySelector(".check-button");

let wordsArray = [];
let wordsTranslation = [];
let randomNumber = 0;

function displayWords() {
  randomNumber = Math.floor(Math.random() * wordsArray.length);
  const li = document.createElement("li");
  li.textContent = wordsTranslation[randomNumber];
  writeWords.innerHTML = "";
  writeWords.appendChild(li);
}

startBtn.addEventListener("click", () => {
  fetch("/allwords")
    .then((response) => response.json())
    .then((data) => {
      writeWords.innerHTML = "";
      wordsArray = [];
      wordsTranslation = [];
      data.words.forEach((word) => {
        wordsArray.push(`${word.word.toLowerCase()}`);
        wordsTranslation.push(`${word.translation.toLowerCase()}`);
      });
      displayWords();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
});

checkBtn.addEventListener("click", () => {
  const userInput = gameUserTranslation.value.trim().toLowerCase();

  if (userInput === wordsArray[randomNumber]) {
    alert("Correct!");
    displayWords();
  } else {
    alert("Try again!");
    const li = document.createElement("li");
    li.textContent = wordsTranslation[randomNumber];
    writeWords.innerHTML = "";
    gameUserTranslation.value = "";
    writeWords.appendChild(li);
  }
  gameUserTranslation.value = "";
});
