const express = require('express');
const { signup, login, checkAuth } = require('../controllers/authController.js');
const router = express.Router();
const {verifyToken} = require('../middlewares/verifyToken.js');
const { getUsers, addTofav, addTodis, getFromfav } = require('../controllers/userControllers.js');

//authentication routes
router.post("/signup", signup)
router.post("/login", login)
router.get("/checkAuth",verifyToken, checkAuth)

//users routes
router.get("/getUsers", getUsers)
router.put("/addTofav/:id",verifyToken, addTofav)
router.put("/addTodis/:id",verifyToken, addTodis )
router.get("/getFromfav",verifyToken, getFromfav )

module.exports = router;