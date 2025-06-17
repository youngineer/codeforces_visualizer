const mongoose = require("mongoose");

const connectDb = async() => {
    await  mongoose.connect(
    "mongodb+srv://youngineer:Luj25663@namastenode.4ctgdzt.mongodb.net/tle_assignment")
    .then(() => {
        console.log("DB connected successfully");
    }).catch(err => console.error(`${err} occured`));
};


module.exports = {
    connectDb
}


