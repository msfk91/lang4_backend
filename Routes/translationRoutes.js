const express = require("express")

const {
    getTranslations,
    getAllTranslations,
    postTranslation
} = require("../controllers/translationController")


const router = express.Router()

router.get('/:courseID', getTranslations)

router.get('/all/:userID', getAllTranslations)

router.post('/', postTranslation)

module.exports = router