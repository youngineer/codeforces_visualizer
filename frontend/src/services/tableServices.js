import axios from "axios";
const BASE_URL = "http://localhost:7777/profile/"


const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'handle', headerName: 'CF Handle', width: 120, editable: true },
    { 
      field: 'currentRating', 
      headerName: 'Current Rating', 
      width: 120, 
      editable: true,
      type: 'number'
    },
    { 
      field: 'maxRating', 
      headerName: 'Max Rating', 
      width: 120, 
      editable: true,
      type: 'number'
    },
    { 
      field: 'emailId', 
      headerName: 'E-mail', 
      width: 180, 
      editable: true,
      type: 'email'
    },
    { field: 'phoneNumber', headerName: 'Contact Number', width: 160, editable: true },
    { 
      field: 'updatedAt', 
      headerName: 'Updated At', 
      width: 120, 
      editable: true,
      type: 'date'
    }];

export const saveUserToDatabase = async (user) => {
  try {
    console.log("Form data to be sent:", user);
    const saveUserApiUrl = `${BASE_URL}saveToDatabase`;
    const saveUserApiResponse = await axios.post(saveUserApiUrl, user);

    const allUsers = saveUserApiResponse.data.allUsers;

    // DEBUG
    console.log("Updated users from backend:", allUsers);

    return allUsers;
  } catch (err) {
    console.error("Error in saveUserToDatabase:", err);
  }
};



export const updateUserInDatabase = async(dataToUpdate) => {
    console.log("tableservices: ", dataToUpdate)
    try {
        const updateUserApiUrl = `${BASE_URL}update`;
        const allUsersJson = await axios.patch(updateUserApiUrl, dataToUpdate);

        console.log(allUsersJson.data)
        return allUsersJson.data
    } catch(err) {
        console.error(err);
    }
};


export const deleteUserFromDatabase = async(handle) => {
    try {
        const deleteUserApiUrl = `${BASE_URL}delete`;
        const allUsersJson = await axios.patch(deleteUserApiUrl, handle);

        console.log(allUsersJson.data)
    } catch(err) {
        console.error(err);
    }
};


export const fetchAllUsersFromDatabase = async() => {
    try {
        const fetchAllUsersApiUrl = `${BASE_URL}fetchAll`
        const allUsersJson = await axios.get(fetchAllUsersApiUrl);

        console.log(allUsersJson.data)
    } catch(err) {
        console.error(err);
    }
};

