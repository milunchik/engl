const fromText = document.querySelector('.from-text'),
toText = document.querySelector('.to-text');
selectTag = document.querySelectorAll('select'),
exchangeBtn = document.querySelector('.exchange'),
translateBtn = document.querySelector('.translate-button');
icons = document.querySelectorAll(".row i"),
words = document.getElementById('wordsList'),
startBtn = document.querySelector('.start'),
writeWords = document.querySelector('.randomWords'),
gameUserTranslation = document.querySelector('.user-translation'),
checkBtn = document.querySelector('.check-button'),
againBtn = document.querySelector('.again-button');

wordsArrayTranslation = [];
wordsArrayTranslate = [];
let userTranslation = gameUserTranslation.value;


selectTag.forEach((tag, id) =>{
    for(const country_code in countries){
        let selected = '';
        if ((id === 0 && country_code === "en") || (id === 1 && country_code === "uk")) {
            selected = 'selected';
        }
        let option = `<option value=${country_code}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML('beforeend', option);
    }
});

exchangeBtn.addEventListener('click', ()=>{
    let tempText = fromText.value;
    let tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
});

translateBtn.addEventListener('click', async () => {
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

            let newWordResponse = await fetch('/words', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    word: text,
                    translation: toText.value
                })

            });
            
            if (newWordResponse.ok) {
                let newWordData = await newWordResponse.json();
                
                let newWord = document.createElement('li');
                newWord.textContent = `${text} - ${toText.value} `;
                words.appendChild(newWord);
                wordsArrayTranslation.push(toText.value);
                wordsArrayTranslate.push(text);
                
                fetch('/allwords')
                .then(response => response.json())
                .then(data => {
                    const wordsList = document.getElementById('wordsList');
                    //wordsList.innerHTML = '';

                    data.words.forEach(word => {
                        const li = document.createElement('li');
                        li.textContent = `${word.word}: ${word.translation}`;
                        wordsList.appendChild(li);
                    });
                })
                .catch(error => console.error('Error fetching words:', error));


                const deleteButton = document.createElement('button');
                //deleteButton.setAttribute('data-id', 123);
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('deleteButton');

                deleteButton.addEventListener('click', async () => {
                    const listItem = deleteButton.parentElement;
                    const wordToRemove = listItem.textContent.split(' - ')[0];
                    console.log(wordToRemove);
                    const indexToRemove = wordsArrayTranslate.indexOf(wordToRemove);
                    if (indexToRemove !== -1) {
                        wordsArrayTranslate.splice(indexToRemove, 1);
                        wordsArrayTranslation.splice(indexToRemove, 1);
                    }
                    try {
                        const response = await fetch(`/words/${wordToRemove}`, {
                            method: 'DELETE'
                        });
                        if (response.ok) {
                            console.log('Word deleted from the database');
                            listItem.remove();
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('Failed to delete word from the database');
                    }
                });

                newWord.appendChild(deleteButton);
            }
        } else {
            console.error(data.responseData.translatedText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to translate and add word');
    }
});

words.addEventListener('click', async (event) => {
    if (event.target.classList.contains('deleteButton')) {
        const listItem = event.target.parentElement;
        const wordToRemove = listItem.textContent.split(' - ')[0];
        const indexToRemove = wordsArrayTranslate.indexOf(wordToRemove);
        if (indexToRemove !== -1) {
            wordsArrayTranslate.splice(indexToRemove, 1);
            wordsArrayTranslation.splice(indexToRemove, 1);
        }

        try {
            const response = await fetch(`/words/${wordToRemove}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                console.log('Word deleted from the database');
                words.removeChild(listItem);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to delete word from the database');
        }

        
    }
});

let currentIndex = 0;

startBtn.addEventListener('click', ()=>{
    if (wordsArrayTranslation.length > 0) {
        if (wordsArrayTranslation.length <= currentIndex) {
            currentIndex = 0;
            alert("You've completed all the words!");
            return;
        }
                let randomWord = wordsArrayTranslation[currentIndex];
                let newWord = document.createElement('li');
                newWord.textContent = randomWord;
                writeWords.appendChild(newWord);
                currentIndex++;               
        }
        else{
                alert("There aren`t words to learn")
            }

            checkBtn.addEventListener('click', ()=>{
                
                if (currentIndex > 0) {
                    userTranslation = gameUserTranslation.value.trim().toLowerCase();
                    const correctTranslationTrimmed = wordsArrayTranslate[currentIndex - 1].trim().toLowerCase();
                    if (userTranslation === correctTranslationTrimmed) {
                        alert("Correct");
                        gameUserTranslation.value = "";
                        writeWords.removeChild(writeWords.lastChild);
                        
                    } else if(userTranslation != correctTranslationTrimmed){
                        alert("Try again");
                        gameUserTranslation.value = "";
                    }
                }
                
            });

    });

icons.forEach(icon =>{
    icon.addEventListener('click', ({target})=>{
        if(target.classList.contains('fa-copy')){
            if(target.id =="from"){
                navigator.clipboard.writeText(fromText.value);
            }else{
                navigator.clipboard.writeText(toText.value);
            }
        }else{
            let speech;
            if(target.id =="from"){
                speech = new SpeechSynthesisUtterance(fromText.value);
                speech.lang = selectTag[0].value;
            }else{
                speech = new SpeechSynthesisUtterance(toText.value);
                speech.lang = selectTag[1].value;
            }
            speechSynthesis.speak(speech);
        }
    })
});

