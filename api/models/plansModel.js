const mongoose = require("mongoose");


const planeSchema = new mongoose.Schema({
    name: String,
    manufacturer:String,
    info: String,
    year: Number,
    category: String,
    img_url: String,
    date_created: {
        type: Date,
        default: Date.now()
    },
    user_id:String,
})

exports.PlaneModel = mongoose.model("planes", planeSchema);

