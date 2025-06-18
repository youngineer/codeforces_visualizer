
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

export const saveUserToDatabase = async(user) => {
    try {
        console.log("Form data to be sent:", user);
        const saveUserApiUrl = `${BASE_URL}saveToDatabase`;
        const saveUserApiResponse = await axios.post(saveUserApiUrl, user);
        const allUsers = saveUserApiResponse.data.allUsers;
        console.log(allUsers);
        console.log(saveUserApiResponse)

        return allUsers;
    } catch(err) {
        console.error(err);
    }
};


export const updateUserInDatabase = async(dataToUpdate) => {
    try {
        const updateUserApiUrl = `${BASE_URL}update`;
        const allUsersJson = await axios.patch(updateUserApiUrl);
    } catch(err) {
        console.error(err);
    }
};


export const deleteUserFromDatabase = async(dataToUpdate) => {
    try {
        const deleteUserApiUrl = `${BASE_URL}delete`;
        const allUsersJson = await axios.patch(deleteUserApiUrl);
    } catch(err) {
        console.error(err);
    }
};


export const fetchAllUsersFromDatabase = async() => {
    try {
        const fetchAllUsersApiUrl = `${BASE_URL}fetchAll`
        const allUsersJson = await axios.get(fetchAllUsersApiUrl);

    } catch(err) {
        console.error(err);
    }
};


const getAll = () => {
  //real axios
  // return axios.get('/seller', {});

  //virtual axios
  return new Promise((resolve, reject) => {
    const res = { data: rows };
    resolve(res);
  });
};

const saveRow = (row) => {
  //real axios
  // return axios.patch('/seller', row);

  //virtual axios
  return new Promise((resolve, reject) => {
    if (row.isNew) rows.push(row);
    else rows = rows.map((r) => (r.id === row.id ? row : r));
    resolve({ data: row });
  });
};

const deleteRow = (rowId) => {
  //real axios
  // return axios.delete(`/seller/${rowId}`);

  //virtual axios
  return new Promise((resolve, reject) => {
    const deletedRow = rows.find((r) => r.id === rowId);
    rows = rows.filter((r) => r.id !== rowId);
    resolve({ data: deletedRow });
  });
};

export default {
  getAll,
  saveRow,
  deleteRow
};