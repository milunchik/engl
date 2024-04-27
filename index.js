const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Word = require('./src/model.js');
const wordRoutes = require('./src/routes.js');

mongoose.connect('mongodb+srv://emili:a8SG5P8Ri1cpIpuu@backenddb.86q6xxs.mongodb.net/Node?retryWrites=true&w=majority&appName=BackendDB')
.then(()=>{
    console.log("Connected to db")
})
.catch((error)=>{
    console.log('Connection falied',error)
})
/*
app.get('/words',(req, res)=>{
    res.send('Write the translation of the word')
})

app.get('/flashcard',(req,res)=>{
    res.send('Learn new words by flashcards')
});
*/


//app.use('view engine', 'ejs')
//app.set('views',__dirname +'/views' )
app.use(express.static( 'public'))
app.use(express.json())
app.use(wordRoutes)

const PORT = 3000

app.listen(PORT, ()=>{
    console.log(`Server started: http://localhost:${PORT}`)
})

