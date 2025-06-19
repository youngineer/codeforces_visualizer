const { Student } = require("../models/student");

const saveUserToDatabase = async (req, resp, next) => {
  try {
    const { name, emailId, phoneNumber, handle } = req.body;
    const { currentRating, maxRating, userStatusData, userContestData } = req;
    // console.log({ currentRating, maxRating, userStatusData, userContestData })

    const existingUser = await Student.findOne({ handle });

    if (existingUser) {
      // Update if user already exists
      await Student.findOneAndUpdate(
        { handle },
        {
          name,
          emailId,
          phoneNumber,
          currentRating,
          maxRating,
          userStatus: userStatusData,
          contestHistory: userContestData
        },
        { new: true }
      );
    } else {
      // Create a new user if not exists
      const newStudent = new Student({
        name,
        emailId,
        phoneNumber,
        handle,
        currentRating,
        maxRating,
        userStatus: userStatusData,
        contestHistory: userContestData
      });

      await newStudent.save();
    }

    // Fetch all users after update/create
    const allUsers = await Student.find({});
    req.allUsers = allUsers;

    next();

  } catch (err) {
    resp.status(400).json({
      message: `Error saving the user: ${err.message}`,
      data: null
    });
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


const fetchOneUserFromDatabase = async (req, resp, next) => {
  const handle = req.params.handle;

  try {
    const userDetails = await Student.findOne({ handle: handle });

    if (!userDetails) {
      return resp.status(404).json({ message: `User with handle ${handle} not found`, data: null });
    }

    const heatMap = userDetails.userStatus?.heatMapData || {};
    const ratingBucketss = userDetails.userStatus?.ratingBuckets || {};
    const filteredHeatMap = {};
    const filteredratingBuckets = {};

    // Convert Map or Object into plain { dateString: count }
    if (heatMap instanceof Map) {
      heatMap.forEach((value, key) => {
        filteredHeatMap[key] = value.count;
      });
    } else {
      Object.entries(heatMap).forEach(([key, val]) => {
        filteredHeatMap[key] = val.count;
      });
    }


    if (ratingBucketss instanceof Map) {
      ratingBucketss.forEach((value, key) => {
        filteredratingBuckets[key] = value.count;
      });
    } else {
      Object.entries(ratingBucketss).forEach(([key, val]) => {
        filteredratingBuckets[key] = val.count;
      });
    }

    // Replace original heatMapData with filteredHeatMap
    const modifiedUserStatus = {
      ...userDetails.userStatus,
      heatMapData: filteredHeatMap,
      ratingBuckets: filteredratingBuckets,
    };

    // Final object sent in req.userDetails
    req.userDetails = {
      id: userDetails._id,
      name: userDetails.name,
      emailId: userDetails.emailId,
      phoneNumber: userDetails.phoneNumber,
      currentRating: userDetails.currentRating,
      maxRating: userDetails.maxRating,
      userStatus: modifiedUserStatus,
      contestHistory: userDetails.contestHistory,
      updatedAt: userDetails.updatedAt,
    };

    next();
  } catch (err) {
    resp.status(500).json({
      message: `Error fetching the user: ${err.message}`,
      data: null
    });
  }
};


module.exports = {
    saveUserToDatabase,
    deleteUserFromDatabase, 
    editUserinDatabase,
    fetchAllUsersFromDatabase,
    fetchOneUserFromDatabase
}