const express = require("express")

const {
    createCourse,
    getCourses,
    getCourse
} = require("../controllers/courseController")


const router = express.Router()

router.get('/', (req, res)=> {
    res.json({messg: "Get all courses"})
})

router.get('/:id', getCourses)

router.get('/one/:courseID', getCourse)

router.post('/create', createCourse)

router.delete('/:id', (req, res)=> {
    res.json({messg: "Delete a course"})
})

router.patch('/', (req, res)=> {
    res.json({messg: "Update a course"})
})

module.exports = router