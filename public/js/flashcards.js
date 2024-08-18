const wordsList = document.querySelector(".listWords"),
  frontCard = document.querySelector(".front"),
  backCard = document.querySelector(".back"),
  nextBtn = document.querySelector(".next-button"),
  prevBtn = document.querySelector(".prev-button");

let wordsArray = [];
let wordsTranslation = [];
let currentIndex = 0;

function setCardText(frontText, backText) {
  frontCard.textContent = frontText;
  backCard.querySelector("h1").textContent = backText;
}

fetch("/allwords")
  .then((response) => response.json())
  .then((data) => {
    data.words.forEach((word) => {
      wordsArray.push(word.word);
      wordsTranslation.push(word.translation);

      frontCard.textContent = `${wordsArray[0]}`;
      backCard.textContent = `${wordsTranslation[0]}`;
    });
  })
  .catch((error) => {
    console.error(error);
  });

nextBtn.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex >= wordsArray.length) {
    currentIndex = 0;
  }
  frontCard.textContent = `${wordsArray[currentIndex]}`;
  backCard.textContent = `${wordsTranslation[currentIndex]}`;
});

prevBtn.addEventListener("click", () => {
  if (currentIndex !== 0) {
    currentIndex--;
    frontCard.textContent = `${wordsArray[currentIndex]}`;
    backCard.textContent = `${wordsTranslation[currentIndex]}`;
  } else {
    alert("There is no previous word");
  }
});
