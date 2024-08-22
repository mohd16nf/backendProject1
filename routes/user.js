const express = require('express')

const router = express.Router();

//imports 
const {homeRoute,handleAllUsers, getUserById, updateUserById, deleteUserById, createUser} = require('../controllers/user')

router.use(express.urlencoded({ extended: false }));


router.get('/home', homeRoute)

router.route('/')
.get(handleAllUsers)
.post(createUser)

router.route('/:id')
.get(getUserById)
.patch(updateUserById)
.delete(deleteUserById)


module.exports = router;