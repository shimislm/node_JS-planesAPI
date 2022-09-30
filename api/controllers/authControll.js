
const { UserModel } = require("../models/userModel");
const bycrpt = require("bcrypt");
const { validateUser  ,validateLoginUser} = require("../validation/userValidation");
const { createToken } = require("../helpers/userHelper");

exports.authCtrl ={
    /**User first sign up, required: full name(firstname, lastname), email, password */
    signUp: async(req ,res)=>{
        let validate = validateUser(req.body);
        if (validate.error) {
            return res.status(400).json(validate.error);
        }
        try {
            let user = new UserModel(req.body);
            user.password = await bycrpt.hash(user.password, 10);
            await user.save();
    
            user.password = "********";
            return res.status(201).json(user);
    
        } catch (err) {
            if (err.code == 11000) {
                return res.status(401).json({ msg: "Email is already exist...", err });
            }
            return res.status(500).json(err);
        }
    },
    /**User sign in, required: email, password */
    login: async(req ,res)=>{
        
        let validate = validateLoginUser(req.body);
        
        if (validate.error) {
            return res.status(403).json(validate.error)
        }
        try {
            let user = await UserModel.findOne({ email: req.body.email })
            if (!user) {
                return res.status(401).json({ msg: "Password or email wrong!!!" })
            }
            let password = await bycrpt.compare(req.body.password, user.password);
            if (!password) {
                return res.status(403).json({ msg: "Password or email wrong!!!" })
            }
            // return res.json({ msg: "You Logged in !!!" })
            let newToken= createToken(user._id, user.role);
            return res.json({token:newToken});
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}