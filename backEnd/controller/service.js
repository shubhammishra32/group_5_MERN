import { UserFormModel, User, Mentor, Internship } from "../models/schema.js";
import bcrypt from "bcryptjs";
import { logger } from "../config/logger.js";
export const mentorLogin = async (req, res) => {
  try {
    logger.debug("Start of the mentor login");
    const { email, password } = req.body;

    const mentorData = await Mentor.find({ email, password });

    if (mentorData.length > 0) {
      logger.info(`response ${mentorData}`);
      res.status(200).json({
        status: "success",
        data: { mentorData },
        type: "mentor",
      });
    } else {
      logger.error("Auth Error: Mentor doesn't exist.");
      res.status(400).json({
        status: "Mentor doesn't exist.",
      });
    }
  } catch (err) {
    logger.error("Somthing went wrong", err);
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

export const createinternship = async (req, res) => {
  try {
    logger.debug("Start of the create internship");
    const { image, title, descriptions, duration, skills } = req.body;
    const data = await Internship.find({ title });

    if (data.length > 0) {
      logger.debug("Inernship already exist.");
      res.status(400).json({
        status: "Inernship already exist.",
      });
    } else {
      const createData = await Internship.create(req.body);
      logger.info(`response ${createData}`);
      res.status(200).json({
        status: "success",
        data: {
          createData,
        },
      });
    }
  } catch (err) {
    logger.error("Somthing went wrong", err);
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

export const getinternship = async (req, res) => {
  try {
    logger.debug("Start of the get internship data");
    const data = await Internship.find();

    if (data.length > 0) {
      logger.info(`response ${data}`);
      res.status(200).json({
        status: "success",
        data,
      });
    } else {
      logger.debug("Internship not available");
      res.status(400).json({
        status: "success",
        data: {
          message: "Internship not available",
        },
      });
    }
  } catch (err) {
    logger.error("Somthing went wrong", err);
    res.status(404).json({
      status: "Somthig went wrong",
      message: err,
    });
  }
};

export const getCandidateDetails = async (req, res) => {
  try {
    logger.debug("Start of the get getCandidateDetail");

    const { email, internshipId } = req.params;
    const usersData = await UserFormModel.find(
      { email, internshipId },
      { _id: 0, __v: 0 }
    );

    if (usersData.length > 0) {
      logger.info(`response ${usersData}`);
      res.status(200).json({
        status: "success",
        data: { usersData },
      });
    } else {
      logger.debug("User not found!");
      res.send(400).json({
        status: "User not found!",
      });
    }
  } catch (err) {
    logger.error("Somthing went wrong", err);
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

export const updateCandidateStatus = async (req, res) => {
  try {
    logger.debug("Start of the get updateCandidateStatus");

    const { internshipId } = req.params;

    const { status, email } = req.body;

    const updatedUserStatus = await UserFormModel.findOneAndUpdate(
      { email, internshipId },
      { status },
      { new: true }
    );

    const updatedInternshipStatus = await Internship.findOneAndUpdate(
      { _id: internshipId, applied: { $elemMatch: { email } } },
      { $set: { "applied.$.status": status } },
      { new: true }
    );
    logger.debug(`updateInternshipStatus ${updatedInternshipStatus}`);
    if (updatedUserStatus && updatedInternshipStatus) {
      logger.info("Updated successfuly user and internship status");
      res.status(200).json({
        status: "Success",
        data: { updatedUserStatus, updatedInternshipStatus },
      });
    } else {
      logger.debug("User not found when update");

      res.status(400).json({
        status: "Failed",
        data: { message: "User not found when update" },
      });
    }
  } catch (err) {
    logger.error("Somthing went wrong", err);
    res.status(404).json({
      status: "Faild",
      message: err,
    });
  }
};

export const loginuser = async (req, res) => {
  try {
    logger.debug("Start of the loginuser");

    let { email } = req.body;

    const userData = await User.find({ email }, { _id: 0, __v: 0 });

    if (userData.length === 0) {
      logger.error("Auth Error: User doesn't exist.");
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      userData[0].password
    );

    if (!isPasswordCorrect) {
      logger.error("Wrong username or password");
      return res.status(400).json({
        message: "Wrong username or password",
      });
    }
    const UserData = userData[0];

    const { password, ...data } = UserData["_doc"];

    logger.info(`response ${data}`);

    res.status(200).json({
      status: "Login Successfull",
      data: { data },
      type: "candidate",
    });
  } catch (err) {
    logger.error("Somthing went wrong");
    res.status(404).json({
      status: "Somthing went wrong",
      message: err,
    });
  }
};

export const registeruser = async (req, res) => {
  try {
    logger.debug("Start of the user register");

    const { name, email, password } = req.body;

    const userrData = await User.find({ email });

    console.log(userrData, userrData.length);

    if (userrData.length > 0) {
      logger.debug("User already registerd");
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
      logger.info(`response ${createData}`);

      res.status(200).json({
        status: "success",
        data: {
          createData,
        },
      });
    }
  } catch (err) {
    logger.error("Somthing went wrong");
    res.status(404).json({
      status: "Somthing went wrong",
      message: err,
    });
  }
};

export const userapplyform = async (req, res) => {
  try {
    logger.debug("Start of the user applyform");

    const { internshipId, name, email, status } = req.body;

    const createData = await UserFormModel.create(req.body);

    const updateAppliedUser = await Internship.findOneAndUpdate(
      { _id: internshipId },
      { $push: { applied: { name, email, status } } },
      { new: true }
    );
    logger.debug(`update [Applied] User internship ${updateAppliedUser}`);

    if (updateAppliedUser && createData) {
      logger.info(`response ${createData}`);
      res.status(200).json({
        status: "success",
        data: {
          createData,
        },
      });
    } else {
      logger.error("Invalid User");
      res.status(400).json({
        status: "Faild",
        message: "Invalid User",
      });
    }
  } catch (err) {
    logger.error("Somthing went wrong");
    res.status(404).json({
      status: "Somthing went wrong",
      message: err,
    });
  }
};

export const deleteInternship = async (req, res) => {
  try {
    logger.debug("Start of the deleteOne");
    const internshipId = req.params.internshipId;

    const internshipDetails = await Internship.findOneAndDelete({
      _id: internshipId,
    });

    if (internshipDetails) {
      logger.info(`response ${internshipDetails}`);
      return res.status(200).json({
        status: "Success",
        message: `Internship ${internshipDetails.title} deleted successfully by ${internshipDetails.mentorName}`,
      });
    } else {
      logger.debug("Internship not available");
      return res.status(400).json({
        status: "Success",
        message: "Internship not available",
      });
    }
  } catch (err) {
    logger.error("Something Went Wrong");
    res.status(404).json({
      status: "Somthing went wrong",
      message: err,
    });
  }
};

export const invalid = async (req, res) => {
  logger.error("Invalid path");
  res.status(404).json({
    status: "fail",
    message: "Invalid path",
  });
};
