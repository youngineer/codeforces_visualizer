import axios from "axios";
const BASE_URL = "http://localhost:7777/profile/"

export const fetchUserRating = async(handle) => {
    const fetchRatingsUrl = `localhost:7777/profile/${handle}?fetchRatings=true`;
    try {
        const ratings = await axios.get(fetchRatingsUrl);
        return ratings
    } catch(err) {
        return (`error: ${err} occured while fetching`);
    }
};


export const fetchUserDetails = async(handle) => {
    const fetchUserDetailsUrl = `${BASE_URL}${handle}`;
    const fetchUserContestDetailsUrl = `${BASE_URL}userContestData/${handle}`;
    const fetchUserStatusDetailsUrl = `${BASE_URL}userStatus/${handle}`;
    // const userDetails = {};
    try {
        const userDetailsResponse = await axios.get(fetchUserDetailsUrl);
        const userContestDetailsResponse = await axios.get(fetchUserContestDetailsUrl);
        const userStatusDetailsResponse = await axios.get(fetchUserStatusDetailsUrl);
        
        const userDetails = userDetailsResponse.data.data;
        const userContestDetails = userContestDetailsResponse.data.data;
        const userStatusDetails = userStatusDetailsResponse.data.data;
        console.log(userDetails, userContestDetails, userStatusDetails)
        
        return { userDetails, userContestDetails, userStatusDetails }
    } catch(err) {
        return (`error: ${err} occured while fetching`);
    }
};

export const saveUserToDatabase = async(user) => {
    try {
        const saveUserApiUrl = `${BASE_URL}saveToDatabase`;
        const saveUserApiResponse = await axios.post(saveUserApiUrl, user);
        const allUsers = saveUserApiResponse.data.allUsers;

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


