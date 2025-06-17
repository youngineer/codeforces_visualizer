const { createHash } = require('crypto');
const axios = require('axios');
const { filterContestsByDate, filterUserDetailsByDate } = require('../utils/helper');

require('dotenv').config();
const { API_KEY, API_SECRET } = process.env;
const BASE_URL = 'https://codeforces.com/api/';

const fetchCodeforcesUserProfile = async (req, resp, next) => {
  const { handle } = req.params;

  try {
    const currentTime = Math.floor(Date.now() / 1000);
    const signaturePrefix = "Kartik";
    const method = 'user.info';
    const params = `apiKey=${API_KEY}&handles=${handle}&time=${currentTime}`;
    const hashString = `${signaturePrefix}/${method}?${params}#${API_SECRET}`;
    const apiSig = `${signaturePrefix}${createHash('sha512').update(hashString).digest('hex')}`;

    const apiUrl = `${BASE_URL}${method}?${params}&apiSig=${apiSig}`;
    const apiResponse = await axios.get(apiUrl);

    req.codeforcesUser = apiResponse.data.result[0]; 
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
    const days = parseInt(req.query.filterDays) || 30;

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
  const days = req.params.filterDays || 365;
  const userStatusApi = `${BASE_URL}user.status?handle=${handle}`;
  
  try {
    const userStatusApiResponse = await axios.get(userStatusApi);
    const filteredData = await filterUserDetailsByDate(userStatusApiResponse.data.result, days);
    req.codeforcesUserStatus = filteredData;
    console.log(filteredData);
    next();

  } catch (err) {
        resp.status(400).json({
        message: "Failed to fetch contest history: " + err.message,
        data: null
        });
  }
}

module.exports = {
  fetchCodeforcesUserProfile,
  fetchCodeforcesUserContestHistory,
  fetchCodeforcesUserStatus
};
