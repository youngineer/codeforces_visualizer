const { Student } = require("../models/student");
const { filterUserStatus, filterContests, filterValidEntries } = require("../utils/helper");

const saveUserToDatabase = async(req, resp, next) => {
  try {
    const maxRating  = req.maxRating;
    const currentRating = req.currentRating;
    const { name, emailId, phoneNumber, handle } = req.body;
    const dataToUpdate = { name, emailId, phoneNumber, handle };
    const userStatusData = req.userStatusData;
    const userContestData = req.userContestData;

    const handleInDb = await Student.findOne({handle: handle});
    if(handleInDb) { 

      const updatedStudent = await Student.findOneAndUpdate(
        { handle: handle },
        dataToUpdate,{
        returnDocument:'after'
    });
    } else {
      const student = new Student({
      name: name, 
      emailId: emailId,
      phoneNumber: phoneNumber,
      handle: handle,
      currentRating: currentRating,
      maxRating: maxRating,
      userStatus: userStatusData,
      contestHistory: userContestData
    });

    await student.save()
      .then(async() => {
        
      }).catch(err => {
        resp.status(400).json({message: `Error saving the user: + ${err.message}`, data: null});
      });
    }


    const allUsers = await Student.find({});
    req.allUsers = allUsers;

    next();
  } catch(err) {
    resp.status(400).json({message: `Error saving the user: + ${err.message}`, data: null});
  }
};


const deleteUserFromDatabase = async(req, resp, next) => {
    try {
        const handle = req.body.handle;
        await Student.findOneAndDelete({handle: handle});
        
        const allUsers = await Student.find({});
        req.allUsers = allUsers;
        next();
    } catch(err) {
        resp.status(400).json({message: `Error saving the user: + ${err.message}`, data: null});
    }
};


const editUserinDatabase = async (req, resp, next) => {
  try {
    const dataToUpdate = req.body.dataToUpdate; 
    const handle = dataToUpdate.handle;

    const updatedStudent = await Student.findOneAndUpdate(
      { handle: handle },
      dataToUpdate,{
      returnDocument:'after'
    });

    if (!updatedStudent) {
      return resp.status(404).json({ message: `User with handle ${handle} not found.` });
    }

    const allUsers = await Student.find({});
    req.allUsers = allUsers;
    next();
  } catch (err) {
    resp.status(400).json({ message: `Error saving the user: ${err.message}`, data: null });
  }
};


const fetchAllUsersFromDatabase = async(req, resp, next) => {
    try {
      console.log("inside fetchAllUsersFromDatabase")
        const allUsers = await Student.find({});
        req.allUsers = allUsers;
        console.log(allUsers);
        next();
    } catch (err) {
    resp.status(400).json({ message: `Error fetching the users: ${err.message}`, data: null });
  }
};


const fetchOneUserFromDatabase = async(req, resp, next) => {
  const handle = req.params.handle;
  const contestLimit = parseInt(req.body.contestLimit) || 365;
  const problemsLimit = parseInt(req.body.problemsLimit) || 90;
  try {
    const userDetails = await Student.findOne({handle: handle});
    console.log(userDetails.userStatus, userDetails.contestHistory)
    const filteredHeatMapData = filterValidEntries(userDetails.userStatus, problemsLimit);
    userDetails.userStatus.heatMapData = filteredHeatMapData;
    const filteredContests = filterValidEntries(userDetails.contestHistory, contestLimit);

    req.id = userDetails._id;
    req.name = userDetails.name;
    req.emailId = userDetails.emailId;
    req.phoneNumber = userDetails.phoneNumber;
    req.currentRating = userDetails.currentRating;
    req.maxRating = userDetails.maxRating;
    req.userStatus = userDetails.userStatus;
    req.contestHistory = filteredContests;
    req.updatedAt = userDetails.updatedAt;
    next();
  } catch (err) {
    resp.status(400).json({ message: `Error fetching the user: ${err.message}`, data: null });
  }
}



module.exports = {
    saveUserToDatabase,
    deleteUserFromDatabase, 
    editUserinDatabase,
    fetchAllUsersFromDatabase,
    fetchOneUserFromDatabase
}