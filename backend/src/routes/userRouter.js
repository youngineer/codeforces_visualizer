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


userRouter.post("/profile/save", fetchProfileInformation, saveUserToDatabase, async(req, resp) => {
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


// Fetch Codeforces profile by handle
userRouter.get("/profile/:handle", fetchOneUserFromDatabase, async(req, resp) => {
  resp.status(200).json({
    message: `User retrieved successfully`,
    data: req.userDetails
  });
});

// userRouter.get("/profile/:handle", fetchCodeforcesUserProfile, async(req, resp) => {
//   resp.status(200).json({
//     message: `User ${req.codeforcesUser.handle} retrieved successfully`,
//     data: req.userDetails
//   });
// });


// Fetch Codeforces contest history by handle
userRouter.get("/profile/userContestData/:handle", fetchCodeforcesUserContestHistory, async(req, resp) => {
    resp.status(200).json({
        message: `Contest history of ${req.params.handle} fetched successfully`,
        data: req.codeforcesUserContestHistory
    });
});


userRouter.get("/profile/userStatus/:handle", fetchCodeforcesUserStatus, async(req, resp) => {
  resp.status(200).json({
    message: `User details of ${req.params.handle} fetched successfully`,
    data: req.codeforcesUserStatus
  })
});


/* -------------------------------------------------------------------------------------------------------- */
userRouter.post("/profile/saveToDatabase", fetchCodeforcesUserProfile, saveUserToDatabase, async(req, resp) => {
  resp.status(201).json({
    message: `User detail added successfully to database`,
    allUsers: req.allUsers
  })
});


userRouter.patch("/profile/update", editUserinDatabase, async(req, resp) => {
  resp.status(201).json({
    message: `User detail edited successfully in the database`,
    allUsers: req.allUsers
  });
});


userRouter.delete("/profile/delete", deleteUserFromDatabase, async(req, resp) => {
  resp.status(201).json({
    message: `User deleted successfully from the database`,
    allUsers: req.allUsers
  });
});


module.exports = { userRouter };
