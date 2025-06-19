const express = require("express");
const {
  fetchCodeforcesUserProfile,
  fetchCodeforcesUserContestHistory,
  fetchCodeforcesUserStatus,
  fetchProfileInformation
} = require("../middlewares/codeforcesMiddleware");
const { saveUserToDatabase, editUserinDatabase, deleteUserFromDatabase, fetchAllUsersFromDatabase, fetchOneUserFromDatabase } = require("../middlewares/databaseMiddleware");
const { Student } = require("../models/student");

const userRouter = express.Router();



userRouter.get("/profile/fetchAll", fetchAllUsersFromDatabase, async(req, resp) => {
  resp.status(200).json({
    message: `Users fetched successfully from the database`,
    data: req.allUsers
  });
});


userRouter.post("/profile/save", fetchCodeforcesUserProfile, fetchProfileInformation, saveUserToDatabase, async(req, resp) => {
  resp.status(200).json({
    message: `Users saved successfully in the database`,
    data: req.allUsers
  });
});


userRouter.patch("/profile/edit", fetchProfileInformation, editUserinDatabase, async(req, resp) => {
  resp.status(200).json({
    message: `Users saved successfully in the database`,
    data: req.allUsers
  });
});


userRouter.delete("/profile/delete", deleteUserFromDatabase, async(req, resp) => {
  resp.status(201).json({
    message: `User deleted successfully from the database`,
    allUsers: req.allUsers
  });
});


// Fetch profile by handle
userRouter.get("/profile/:handle", fetchOneUserFromDatabase, async(req, resp) => {
  resp.status(200).json({
    message: `User retrieved successfully`,
    data: req.userDetails
  });
});



module.exports = { userRouter };
