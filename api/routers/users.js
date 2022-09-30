const express = require("express");
const {auth, authAdmin} = require("../middlewares/auth")
const router = express.Router();
const { userCtrl } = require("../controllers/userControll");
const { authCtrl } = require("../controllers/authControll");


router.get("/userList",authAdmin,userCtrl.getList)

router.get('/info', auth ,userCtrl.info)

router.post('/login', authCtrl.login)

router.post('/', authCtrl.signUp)

router.delete("/:idDel", auth, userCtrl.delete)

module.exports = router;