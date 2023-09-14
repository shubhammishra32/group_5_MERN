import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  }
});

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  
});

const userFormSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  position: {
    type: String,
    require: true,
  },
  experience: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  skills: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  internshipId: {
    type: String
  },
});

const internshipSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  descriptions: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  mentorName: {
    type: String,
    required: true,
  },
  applied:{
    type: Array
  }
});

// { name: "shubham", email: "abc@gmail.com" },
//     { name: "mishra", email: "abuyc@gmail.com" },
//     { name: "shubsatyamham", email: "ahnbc@gmail.com" }

export const UserFormModel = mongoose.model("UserFormData", userFormSchema);

export const User = mongoose.model("users", userSchema);

export const Mentor = mongoose.model("mentorDetails", mentorSchema);

export const Internship = mongoose.model(
  "internshipCardDetails",
  internshipSchema
);

// module.exports = {UserFormModel, User};
