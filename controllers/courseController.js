const Course = require('../models/courseModel')
const Translation = require('../models/translationModel')

const mongoose= require("mongoose")

const createCourse = async (req, res)=>{
    const {courseName, userID, language, topic} = req.body    
    let result = null

    if(!courseName || !userID || !language || !topic){
        result={
            message: "All fields are required",
            status: "error2"
        }
    }
    
    const existing_courses = await Course.findOne({userID, language, topic})    
    console.log(existing_courses)
    console.log(req.body)
    
    if( existing_courses !== null ){
        result={
            message: "Language and topic are already in use. Use another one.",
            status: "error2"
        }
    }
        
    try{        
        if(result==null){
            const course = await Course.create({ courseName, userID, language, topic, translation_sets: 0 })
            result={
                    message:"Course created. Go to My Courses and click translate to make translations for the course.",
                    status: "success",
                    course
            }
        }
        res.status(200).json({
            result
        })
    } catch(error){
        res.json({
            message: error.message,
            status: "error2"
        })
    }
}

//single user
const getCourses= async(req,res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id) ) {
        return res.status(404).json({error: "No such account"})
    }
    const courses_count = await Course.find({userID: id})
    const trls = await Translation.find({userID: id})
    
    const count = await Course.countTranslations(courses_count, trls)
    
    const courses = await Course.find({userID: id}).sort({createdAt: -1})
    
    
    if (!courses){
        return res.status(404).json({error: "You have no courses."})
    }
    //console.log(courses)
    res.status(200).json(courses)
}

const getCourse= async(req,res) => {
    const { courseID } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(courseID) ) {
        return res.status(404).json({error: "No such account"})
    }
    
    const trls = await Translation.find({courseID: courseID})
    

    const updateCourse = await Course.findOneAndUpdate({_id: courseID},{translation_sets: trls.length})
    
    const course = await Course.findOne({_id: courseID})
    
    if (!course){
        return res.status(404).json({error: "You have no course."})
    }

    console.log(course)
    res.status(200).json(course)
}

module.exports= { 
    createCourse,
    getCourses,
    getCourse
}