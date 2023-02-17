const mongoose = require("mongoose")
const Translation = require('../models/translationModel')
const Schema = mongoose.Schema

const courseSchema = new Schema({
    courseName:{
        type: String,
        required: true,
    },
    userID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    language: {
        type: String,
        required: true,  
    },
    topic: {
        type: String,
        required: true,
    },
    translation_sets: {
        type: Number,
        required: true
    }
}, {timestamps: true })

courseSchema.statics.countTranslations = async function(courses_count, trls){    
    
    courses_count.map( async (a,index)=>{  
        const t=[]    
        trls.map((b, index2)=>{
            if( JSON.stringify(a._id) == JSON.stringify(b.courseID)  ){
                t.push(b)
            }
        })

        const course = await this.findOneAndUpdate(
            {_id: a._id},
            {translation_sets: t.length}
        )
        
    })    
}

module.exports = mongoose.model("Course", courseSchema)