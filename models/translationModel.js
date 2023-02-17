const mongoose = require("mongoose")

const Schema = mongoose.Schema

const translationSchema = new Schema({
    courseID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    userID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    EnglishArr: {
        type: [String],
        required: true,
    },
    TranslationArr: {
        type: [String],
        required: true,  
    },
    NounEnglish:{
        type: String,
        required: true,
    },
    NounTranslation:{
        type: String,
        required: true,
    },
    TranslationCategory:{
        type: String,
        required: true,
    },
    TranslationType:{
        type: String,
        required: true,
    },
    TranslationNotes:{
        type: String
    }
}, {timestamps: true })

module.exports = mongoose.model("Translation", translationSchema)