const startBtn = document.querySelector('.start'),
writeWords = document.querySelector('.randomWords'),
gameUserTranslation = document.querySelector('.user-translation'),
checkBtn = document.querySelector('.check-button')

wordsArrayTranslation = [];
wordsArrayTranslate = [];

async function displayWords(){    
    try{
        const response = await fetch('/')
    }catch(error){
        
    }
}
//word/:id


startBtn.addEventListener('click', ()=>{
    console.log('start')
    displayWords()
})

checkBtn.addEventListener('click', ()=>{
    console.log('check')
    console.log(gameUserTranslation.value)
})


/*let currentIndex = 0;
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

    });*/