import {UserFormModel, User, Mentor} from '../models/schema.js';

export const mentorLogin = async (req, res) => {
    try {
        // const {email, password} = req.body;

        // console.log(req.body);

        const mentorData = await User.find();

        console.log(mentorData);

        if (mentorData.length > 0) {
            res.status(200).json({
                status: "success",
                data: {mentorData}
            })
        } else {
            res.status(400).json({
                status: "Mentor doesn't exist."
            })
        }
    } catch (err) {
        console.log("Invail Credentials");
        res.status(404).json({
            status: "Faild",
            message: err
        })
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password} = req.body
        await User.findOne({ email: email}, (err, user) => {
        if(user){
            if(password === user.password ) {
                res.send({message: "Login Successfull", user: user})
            } else {
                res.send({ message: "Password didn't match"})
            }
        } else {
            res.send({message: "User not registered"})
        }
    })
    } 
    catch (err) {
        console.log("User not found");
        res.status(404).json({
            message: err
        })
    }
}

export const registerController = async (req, res) => {
    try {
        const { name, email, password} = req.body
        await User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registerd"})
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered, Please login now." })
                }
            })
        }
    })
    }
    catch (err) {
        console.log("User not found");
        res.status(404).json({
            message: err
        })
    }
}

export const getAllCandidateDetails = async (req, res) => {
    try {
        const usersData = await UserFormModel.find({}, {_id: 0, __v:0})

        if (usersData.length > 0) {
            res.status(200).json({
                status: "success",
                data: {usersData}
            })
        } else {
            res.send(400).json({
                status: "Candidates not available!"
            })
        }
    } catch (err) {
        console.log("User not found");
        res.status(404).json({
            status: "Faild",
            message: err
        })
    }
}

export const updateCandidateStatus = async (req, res) => {
    try {

        const {email, status} = req.params;

        const userData = await UserFormModel.findOneAndUpdate({email}, {status}, {new: true});

        if (userData != null) {
            res.status(200).json({
                status: success,
                data: {userData}
            })
        } else {
            res.status(400).json({
                status: failed,
                data: {message: "User not found when update"}
            })
        }

    } catch (err) {
        console.log("Something went wrong");
        res.status(404).json({
            status: "Faild",
            message: err
        })
    }
}
/*
module.exports = {getAllCandidateDetails, 
                  updateCandidateStatus, 
                  loginController, 
                  registerController};
                  */