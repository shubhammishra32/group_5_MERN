import mongoose from "mongoose";

/*
mongoose.connect("mongodb+srv://pradumn2999:wOIEFwtph9746jkp@cluster0.wwg30ja.mongodb.net/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})
*/

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    //formData: {type: mongoose.Types.ObjectId, required: true, ref: "UserFormData"}
});

const userFormSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: "pending"
    },
    //creator: {type: mongoose.Types.ObjectId, required: true, ref: "User"},
    skills: []
})

export const UserFormModel = new mongoose.model("UserFormData", userFormSchema);

export const User = mongoose.model("User", userSchema);

export const Mentor = new mongoose.model("MentorDetails", userFormSchema);

// module.exports = {UserFormModel, User};