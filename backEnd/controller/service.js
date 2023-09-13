import { UserFormModel, User, Mentor, Internship } from "../models/schema.js";
import bcrypt from "bcryptjs";

export const mentorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const mentorData = await Mentor.find({ email, password });

    console.log(mentorData);

    if (mentorData.length > 0) {
      res.status(200).json({
        status: "success",
        data: { mentorData },
        type: "mentor",
      });
    } else {
      res.status(400).json({
        status: "Mentor doesn't exist.",
      });
    }
  } catch (err) {
    console.log("Invail Credentials");
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

export const createinternship = async (req, res) => {
  try {
    const { image, title, descriptions, duration, skills } = req.body;
    const data = await Internship.find({ title });

    if (data.length > 0) {
      res.status(400).json({
        status: "Inernship already exist.",
      });
    } else {
      console.log("insert data", req.body);
      const createData = await Internship.create(req.body);
      res.status(200).json({
        status: "success",
        data: {
          createData,
        },
      });
    }
  } catch (err) {
    console.log("Invail Internship");
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

export const getinternship = async (req, res) => {
  try {
    const data = await Internship.find();

    if (data.length > 0) {
      res.status(200).json({
        status: "success",
        data,
      });
    } else {
      res.status(400).json({
        status: "success",
        data: {
          message: "Internship not available",
        },
      });
    }
  } catch (err) {
    console.log("Somthig went wrong");
    res.status(404).json({
      status: "Somthig went wrong",
      message: err,
    });
  }
};

export const getCandidateDetails = async (req, res) => {
  try {
    const { email, internshipId } = req.params;
    const usersData = await UserFormModel.find(
      { email, internshipId },
      { _id: 0, __v: 0 }
    );

    if (usersData.length > 0) {
      res.status(200).json({
        status: "success",
        data: { usersData },
      });
    } else {
      res.send(400).json({
        status: "Candidates not available!",
      });
    }
  } catch (err) {
    console.log("User not found");
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

export const updateCandidateStatus = async (req, res) => {
  try {
    const { internshipId } = req.params;
    const { oldValue, newValue } = req.body;

    const { status, email } = newValue;

    const updatedUserStatus = await UserFormModel.findOneAndUpdate(
      { email, internshipId },
      { status },
      { new: true }
    );
    // console.log(userData)

    const updatedInternshipStatus = await Internship.findOneAndUpdate(
      { _id: internshipId, ["applied"]: oldValue },
      { $set: { ["applied"]: newValue } },
      { new: true }
    );
    //console.log("prindata", updateInternshipStatus);
    if (updatedUserStatus && updatedInternshipStatus) {
      res.status(200).json({
        status: "Success",
        data: {  updatedUserStatus, updatedInternshipStatus },
      });
    } else {
      res.status(400).json({
        status: "Failed",
        data: { message: "User not found when update" },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

export const loginuser = async (req, res) => {
  try {
    let { email } = req.body;

    const userData = await User.find({ email }, { _id: 0, __v: 0 });

    if (userData.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      userData[0].password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Wrong username or password",
      });
    }
    const UserData = userData[0];

    const { password, ...data } = UserData["_doc"];
    console.log(data);
    res.status(200).json({
      status: "Login Successfull",
      data: { data },
      type: "candidate",
    });
  } catch (err) {
    console.log("Somthing went wrong");
    res.status(404).json({
      status: "Somthing went wrong",
      message: err,
    });
  }
};

export const registeruser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userrData = await User.find({ email });

    console.log(userrData, userrData.length);

    if (userrData.length > 0) {
      res.status(400).json({
        status: "success",
        data: {
          message: "User already registerd",
        },
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const createData = await User.create({ name, email, password: hash });
      res.status(200).json({
        status: "success",
        data: {
          createData,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "Somthing went wrong",
      message: err,
    });
  }
};

export const userapplyform = async (req, res) => {
  try {
    const { internshipId, name, email, status } = req.body;
    // console.log("insert data", req.body);
    const createData = await UserFormModel.create(req.body);

    const updateAppliedUser = await Internship.findOneAndUpdate(
      { _id: internshipId },
      { $push: { applied: { name, email, status } } },
      { new: true }
    );
    console.log(updateAppliedUser);
    console.log(createData);

    if (updateAppliedUser && createData) {
      console.log("success", updateAppliedUser);
      res.status(200).json({
        status: "success",
        data: {
          createData,
        },
      });
    } else {
      res.status(400).json({
        status: "Faild",
        message: "Invalid User",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "Somthing went wrong",
      message: err,
    });
  }
};
