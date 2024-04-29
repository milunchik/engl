const startBtn = document.querySelector('.start'),
writeWords = document.querySelector('.randomWords'),
gameUserTranslation = document.querySelector('.user-translation'),
checkBtn = document.querySelector('.check-button')

let wordsArray = []
let wordsTranslation = []
let randomNumber = 0

function displayWords(){
     randomNumber = Math.floor(Math.random() * wordsArray.length)
    const li = document.createElement('li');
    li.textContent = wordsTranslation[randomNumber]
    writeWords.innerHTML = '';
    writeWords.appendChild(li);
}

startBtn.addEventListener('click', ()=>
    {
        fetch('/allwords')
            .then(response => response.json())
            .then(data => {
            writeWords.innerHTML = '';
            data.words.forEach(word => {
            wordsArray.push(`${word.word.toLowerCase()}`)
            wordsTranslation.push(`${word.translation.toLowerCase()}`)
        })
        displayWords()
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    })

checkBtn.addEventListener('click', ()=>
    {
        if (gameUserTranslation.value.trim().toLowerCase() === wordsArray[randomNumber]) {
            alert("Correct!");
            writeWords.innerHTML = ''
        } else {
            alert('Try again!');
            const li = document.createElement('li');
            li.textContent = wordsTranslation[randomNumber]
            writeWords.appendChild(li)
            writeWords.innerHTML = ''  
        }
        gameUserTranslation.value = ''
    })