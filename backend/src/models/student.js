const { Schema, default: mongoose } = require("mongoose");
const validator = require("validator");


const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        // validate(value) {
        //     const regex = /^[a-zA-Z]{4,}$/;
        //     if(!regex.test(value)) {
        //         throw new Error("Invalid name. It must be at least 4 characters long and can only contain letters.")
        //     }
        // }
    },
    emailId: {
        type: String,
        trim: true,
        required: true,
        // validate(value) {
        //     if(!validator.isEmail(value)) {
        //         throw new Error("Invalid email");
        //     }
        // }
    },
    phoneNumber: {
        type: String,
        required: true,
        // validate(value) {
        //     if(!validator.isMobilePhone(value)) {
        //         throw new Error("Invalid phone number");
        //     }
        // }
    },
    handle: {
        type: String,
        required: true,
        trim: true,
    },
    currentRating: {
        type: Number,
        required: true
    },
    maxRating: {
        type: Number,
        required: true
    }
}, { timestamps: true });


const Student = mongoose.model('Student', studentSchema);
module.exports = {
    Student
};