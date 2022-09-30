const mongoose = require('mongoose');
const {config} = require("../config/config")

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(`mongodb+srv://${config.userDb}:${config.passDb}@cluster0.23hnhet.mongodb.net/Node_Project`);
    console.log("Mongo Work")
}