const express= require("express");
const {auth} = require("../middlewares/auth");
const { planeCtrl } = require("../controllers/planesControll");
const router = express.Router();


router.get("/" , planeCtrl.allPlanes)

router.get("/year",planeCtrl.getByYear)

router.get("/search",planeCtrl.search)

router.get("/category/:catName",planeCtrl.getByCat)

router.post("/",auth, planeCtrl.newPlane)

router.delete("/:delId",auth, planeCtrl.deletePlane)

router.put("/:idEdit", auth ,planeCtrl.modifyPlane)

module.exports = router;

