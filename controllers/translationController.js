const Translation = require('../models/translationModel')
const mongoose= require("mongoose")
//EnglishArr, TranslationArr, NounEnglish, NounTranslation,TranslationCategory,

const getTranslations = async (req, res) =>{
    const { courseID } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(courseID) ) {
        return res.status(404).json({error: "No such course"})
    }
    const translations = await Translation.find({courseID: courseID})
    res.json(translations)
}
const getAllTranslations = async (req, res) =>{
    const { userID } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(userID) ) {
        return res.status(404).json({error: "No such user"})
    }
    const all_translations = await Translation.find({userID})
    const all_translations2 = await Translation.find({})
    res.json(all_translations2)
}
const postTranslation = async (req, res) =>{
    const {
        courseID, userID,
        NounEnglish, 
        TranslationType,
    } = req.body
    let result = null
    let translation = await Translation.findOneAndUpdate({
        courseID,
        userID,
        NounEnglish,
        TranslationType,
    }, 
    {
        ...req.body
    })

    if (!translation){
        translation = await Translation.create({ ...req.body })
        if (translation){
            result = {
                message: "Translation created",
                status: "success",
                translation
            }
        }else{
            result = {
                message:"Translation NOT created",
                status: "error"
            }
        }
    }else{
        result = {
            message: "Translation saved",
            status: "success",
            ...req.body
        }
    }
    console.log(req.body)
    console.log(translation)    
    res.json({
        ...result
    })
}

module.exports= { 
    getTranslations,
    getAllTranslations,
    postTranslation
}