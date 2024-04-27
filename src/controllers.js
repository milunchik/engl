const WordModel = require('./model.js');

const getWord = async(req, res) =>{
    try{
        const word = await WordModel.find();
        res.status(200).json(word);
    }catch(error){
        res.status(400).send(error);
    }
};

const getOne = async(req, res)=>{
    try{
        const {id} = req.params;
        const word = await WordModel.findOne({_id: id});
        res.status(200).json(word);
    }catch(error){
        res.status(400).send(error)
    }
}

const getAllWords = async(req, res) =>{

    try{
        const words = await WordModel.find();
        res.json({words})
    }catch(error){
        res.status(400).send(error)
    }
}

const postWord = async(req, res) =>{
    try{
        const {word, translation} = req.body; 
        const newWord = await WordModel.create({word, translation});
        res.status(200).json(newWord);
    }catch(error){
        res.status(400).send(error);
    }
};

const updateWord = async(req, res)=>{
    try{
        const {id} = req.params;
        const{word, translation, status} = req.body;
        const updateWord = await WordModel.findByIdAndUpdate(id, {word, translation, status});
        res.status(200).json(updateWord);
    }
    catch(error){
        res.status(400).send(error);
    }
};

const deleteWord = async(req, res)=>{
    try{
    const {id} = req.params;
    const deleteWord = await WordModel.findByIdAndDelete(id);
    if(!deleteWord){
        return res.status(404).json({message: "Word not found"});
    }
    res.status(200).json({message: "Deleted"});
}catch(error){
    res.status(400).json({error: error.message});    
}
};

module.exports = {
    getWord,
    getOne,
    getAllWords,
    postWord,
    updateWord,
    deleteWord
};