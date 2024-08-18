const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".to-text"),
  selectTag = document.querySelectorAll("select"),
  exchangeBtn = document.querySelector(".exchange"),
  translateBtn = document.querySelector(".translate-button"),
  icons = document.querySelectorAll(".row i"),
  words = document.getElementById("wordsList");

if (!("speechSynthesis" in window)) {
  console.log("Speech synthesis not supported");
  alert("Speech synthesis not supported in this browser.");
}

window.speechSynthesis.onvoiceschanged = () => {
  const voices = speechSynthesis.getVoices();
  console.log("Available voices:", voices);
};

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    let selected = "";
    if (
      (id === 0 && country_code === "en") ||
      (id === 1 && country_code === "uk")
    ) {
      selected = "selected";
    }
    let option = `<option value=${country_code}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
});

exchangeBtn.addEventListener("click", () => {
  let tempText = fromText.value;
  let tempLang = selectTag[0].value;
  fromText.value = toText.value;
  selectTag[0].value = selectTag[1].value;
  toText.value = tempText;
  selectTag[1].value = tempLang;
});

translateBtn.addEventListener("click", async () => {
  let text = fromText.value.trim();
  let translateFrom = selectTag[0].value;
  let translateTo = selectTag[1].value;

  if (!text) return;

  try {
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (data.responseStatus === 200) {
      toText.value = data.responseData.translatedText;

      let newWordResponse = await fetch("/words", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          word: text,
          translation: toText.value,
        }),
      });

      if (newWordResponse.ok) {
        let newWordData = await newWordResponse.json();

        fetch("/allwords")
          .then((response) => response.json())
          .then((data) => {
            const wordsList = document.getElementById("wordsList");
            wordsList.innerHTML = "";
            data.words.forEach((word) => {
              const li = document.createElement("li");
              li.textContent = `${word.word} - ${word.translation}`;
              li.dataset.id = word._id;
              wordsList.appendChild(li);

              const deleteButton = document.createElement("button");
              deleteButton.textContent = "Delete";
              deleteButton.classList.add("deleteButton");

              deleteButton.addEventListener("click", async () => {
                const id = li.dataset.id;
                try {
                  const response = await fetch(`/words/${id}`, {
                    method: "DELETE",
                  });

                  if (response.ok) {
                    wordsList.removeChild(li);
                  }
                } catch (error) {
                  console.log(error);
                  alert("Failed to delete from database");
                }
              });

              li.appendChild(deleteButton);
            });
          })
          .catch((error) => console.error("Error fetching words:", error));
      }
    }
  } catch (error) {
    console.log(error);
  }
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(fromText.value);
      } else {
        navigator.clipboard.writeText(toText.value);
      }
    } else {
      setTimeout(() => {
        let speech = new SpeechSynthesisUtterance();
        if (target.id == "from") {
          speech.text = fromText.value || "No text available";
          speech.lang = selectTag[0].value || "en-US";
        } else {
          speech.text = toText.value || "No text available";
          speech.lang = selectTag[1].value || "en-US";
        }
        console.log(
          `Speaking text: "${speech.text}" with language: ${speech.lang}`
        );
        speechSynthesis.speak(speech);
      }, 1000);
    }
  });
});
