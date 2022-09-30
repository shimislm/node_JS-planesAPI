const { UserModel } = require("../models/userModel");

exports.userCtrl={
    /**get user info, required: user token */
    info: async(req ,res)=>{
        try {
            let user = await UserModel.findOne({_id:req.tokenData._id}, {password:0})
            res.json(user);
        } 
        catch (err) {
            console.log(err);
            return res.status(401).json({msg:"Token not valid or expired"})
        }
    },
    /**get all users info , required: admin token */
    getList: async(req ,res)=>{
        let perPage = Math.min(req.query.perPage, 20) || 10;
        let page = req.query.page || 1;
        let sort = req.query.sort || "_id";
        let reverse = req.query.reverse == "yes" ? -1 : 1;
        try {
            let users = await UserModel
                .find({}, {password:0 })
                .limit(perPage)
                .skip((page - 1) * perPage)
                .sort({ [sort]: reverse })
            res.json(users);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ err: err });
        }
    },
    /**delete user, required: user token or admin token , user id */
    delete: async(req ,res)=>{
        try {
            let idDel = req.params.idDel;
            let data;
            if(req.tokenData.role== "admin"){
                data = await UserModel.deleteOne({_id:idDel})
            }
            else{
                data = await UserModel.deleteOne({_id:idDel, user_id:req.tokenData._id})
            }
            res.status(200).json({ msg: data})
        }
        catch(err) {
            res.status(500).json({msg:"err", err})
        }
    }
}