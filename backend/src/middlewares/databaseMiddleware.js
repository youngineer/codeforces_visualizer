const { Student } = require("../models/student");

const saveUserToDatabase = async(req, resp, next) => {
  try {
    const maxRating  = req.maxRating;
    const currentRating = req.currentRating;
    const { name, emailId, phoneNumber, handle } = req.body;

    const handleInDb = await Student.findOne({handle: handle});
    if(handleInDb) {
      const updatedStudent = await Student.findOneAndUpdate({ handle: handle },
      dataToUpdate,{
      returnDocument:'after'});
    } else {
      const student = new Student({
      name: name, 
      emailId: emailId,
      phoneNumber: phoneNumber,
      handle: handle,
      currentRating: currentRating,
      maxRating: maxRating
    });

    await student.save()
      .then(async() => {
        const allUsers = await Student.find({});
        req.allUsers = allUsers;
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
        updatedStudent = await Student.findOneAndDelete({handle: handle});
        
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
}



module.exports = {
    saveUserToDatabase,
    deleteUserFromDatabase, 
    editUserinDatabase,
    fetchAllUsersFromDatabase
}