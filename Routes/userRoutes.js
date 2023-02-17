const express = require("express")
const {
    getUsers,
    getUser,
    signIn,
    createUser,
    deleteUser,
    updateUser
} = require("../controllers/userController")

const router = express.Router()

router.get('/', getUsers)

router.get('/:id', getUser)

// This is in the Server.js file app.use("/accounts", userRoutes)
router.post("/", signIn)

router.post('/create', createUser)

router.delete('/:id', deleteUser)

router.patch('/:id', updateUser)

module.exports = router