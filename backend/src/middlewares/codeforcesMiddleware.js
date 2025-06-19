require('dotenv').config();
const { createHash } = require('crypto');
const axios = require('axios');
const { filterContestsByDate, filterUserDetailsByDate, fetchRatingsFromApiResponse, filterOneYearUserDetails, filterOneYearContests } = require('../utils/helper');

const { API_KEY, API_SECRET } = process.env;
const BASE_URL = 'https://codeforces.com/api/';

const fetchCodeforcesUserProfile = async (req, resp, next) => {
  const handle = req.params.handle || req.body.handle;
  // const handle = req.body.handle;
  const fetchRatings = req.query.fetchRatings === 'true';

  try {
    const currentTime = Math.floor(Date.now() / 1000);
    const signaturePrefix = "Kartik";
    const method = 'user.info';
    const params = `apiKey=${API_KEY}&handles=${handle}&time=${currentTime}`;
    const hashString = `${signaturePrefix}/${method}?${params}#${API_SECRET}`;
    const apiSig = `${signaturePrefix}${createHash('sha512').update(hashString).digest('hex')}`;

    const apiUrl = `${BASE_URL}${method}?${params}&apiSig=${apiSig}`;
    const apiResponse = await axios.get(apiUrl);
    const codeforcesUserDetails = apiResponse.data.result[0]; 

    req.userDetails = codeforcesUserDetails;
    req.currentRating = codeforcesUserDetails.rating;
    req.maxRating = codeforcesUserDetails.maxRating;
    next();

  } catch (err) {
    resp.status(400).json({
      message: "Failed to fetch Codeforces profile: " + err.message,
      data: null
    });
  }
};


const fetchCodeforcesUserContestHistory = async (req, resp, next) => {
    const { handle } = req.params;
    const days = parseInt(req.body.filterDays) || 365;

    try {
        const contestsAttendedByHandleApi = `${BASE_URL}user.rating?handle=${handle}`;
        const contestsAttendedByHandleApiResponse = await axios.get(contestsAttendedByHandleApi);

        const filteredData = await filterContestsByDate(contestsAttendedByHandleApiResponse.data.result, handle, days);
        req.codeforcesUserContestHistory = filteredData;
        next();
    } catch (err) {
        resp.status(400).json({
        message: "Failed to fetch contest history: " + err.message,
        data: null
        });
    }
};


const fetchCodeforcesUserStatus = async(req, resp, next) => {
  const handle = req.params.handle;

  const userStatusDays = req.body.filterDays || 365;
  const userStatusApi = `${BASE_URL}user.status?handle=${handle}`;

  const userContestDays = parseInt(req.body.filterDays) || 365;
  
  try {
    const userStatusApiResponse = await axios.get(userStatusApi);
    const filteredData = await filterUserDetailsByDate(userStatusApiResponse.data.result, userStatusDays);
    req.codeforcesUserStatus = filteredData;
    next();

  } catch (err) {
        resp.status(400).json({
        message: "Failed to fetch contest history: " + err.message,
        data: null
        });
  }
};


const fetchProfileInformation = async(req, resp, next) => {
  try {
    const handle = req.body.handle;
    const userStatusDays = req.body.filterDays || 365;
    const userStatusApi = `${BASE_URL}user.status?handle=${handle}`;
    const userStatusApiResponse = await axios.get(userStatusApi);
    const filteredUserStatusData = await filterOneYearUserDetails(userStatusApiResponse.data.result);

    const contestsAttendedApi = `${BASE_URL}user.rating?handle=${handle}`;
    const contestsAttendedApiResponse = await axios.get(contestsAttendedApi);
    const filteredUserContestData = await filterOneYearContests(contestsAttendedApiResponse.data.result, handle);


    const userInformationApi = `${BASE_URL}user.info?handles=${handle}`;
    const userInformationResponse = await axios.get(userInformationApi);
    const { currentRating, maxRating } = fetchRatingsFromApiResponse(userInformationResponse);

    req.handle = handle
    req.userStatusData = filteredUserStatusData;
    req.userContestData = filteredUserContestData;
    req.maxRating = maxRating;
    req.currentRating = currentRating;

    next();

  } catch (err) {
        resp.status(400).json({
        message: "Failed to fetch Profile Information: " + err.message,
        data: null
      });
  }
};



/* -------------------------------------------------------------------------------------------------------- */


module.exports = {
  fetchCodeforcesUserProfile,
  fetchCodeforcesUserContestHistory,
  fetchCodeforcesUserStatus,
  fetchProfileInformation
};
