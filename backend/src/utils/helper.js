const { default: axios } = require("axios");

const ONE_UNIX_DAY = 86400;
const BASE_URL = 'https://codeforces.com/api/';


const getRatingBucket = (rating) => {
    const ratingBucketLimits = [1200, 1400, 1600, 1900, 2100, 2300, 2400, 2600, 3000];
    for(let limit of ratingBucketLimits) {
        if(rating < limit) return limit;
    }

    return ratingBucketLimits[ratingBucketLimits.length - 1];
};


const getDateFromUnix = (timestamp) => {
    if (isNaN(timestamp) || timestamp <= 0) {
        console.error("Invalid timestamp:", timestamp);
        return "Invalid Date";  
    }

    const date = new Date(timestamp * 1000);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');  
    const yyyy = date.getFullYear();

    return `${yyyy}/${mm}/${dd}`;  
}



const getUnixTimestampNDaysAgo = (days) => {
  const timestamp = Math.floor(Date.now() / 1000) - (days * ONE_UNIX_DAY);
  return timestamp;
};



const filterContestsByDate = async (contests, handle, days) => {
    const validContestData = {};
    const totalContests = contests.length;
        const minUnixTime = getUnixTimestampNDaysAgo(days);

    // Loop through contests from the most recent to the oldest
    for (let i = totalContests - 1; i >= 0; i--) {
        const contest = contests[i];
        let unsolvedProblemsCount = 0;

        // Check if the contest meets the date condition
        if (contest.ratingUpdateTimeSeconds >= minUnixTime) {
            const contestDetailsApi = `${BASE_URL}contest.status?handle=${handle}&contestId=${contest.contestId}`;
            
            try {
                // Fetch contest details
                const contestData = await axios.get(contestDetailsApi);
                
                if (contestData && contestData.data.result) {
                    // Count unsolved problems
                    contestData.data.result.forEach((problem) => {
                        if (problem.verdict !== "OK") unsolvedProblemsCount++;
                    });
                }

                // Store valid contest data
                validContestData[contest.contestId] = {
                    rank: contest.rank,
                    oldRating: contest.oldRating,
                    newRating: contest.newRating,
                    unsolvedProblems: unsolvedProblemsCount,
                };
            } catch (error) {
                // Handle any errors in the API request
                console.error(`Error fetching data for contestId ${contest.contestId}:`, error);
            }
        } else {
            // Break out of the loop if contest does not meet the date condition
            break;
        }
    }
    return validContestData;
};


const filterUserDetailsByDate = async(submissions, days) => {
    const minUnixTime = getUnixTimestampNDaysAgo(days);

    let totalSolved = 0;
    let totalRating = 0;
    let mostDifficultRating = 0;

    const ratingBuckets = {};
    const heatMapData = {};

    submissions.forEach((submission) => {
        if(submission.verdict == "OK" && submission.creationTimeSeconds >= minUnixTime) {
            totalSolved++;

            const rating = submission.problem.rating || 0;
            totalRating += rating;
            mostDifficultRating = Math.max(mostDifficultRating, rating);

            const ratingBucket = getRatingBucket(rating);
            ratingBuckets[ratingBucket] = (ratingBuckets[ratingBucket] || 0) + 1;

            const dateKey = getDateFromUnix(submission.creationTimeSeconds);
            heatMapData[dateKey] = (heatMapData[dateKey] || 0) + 1;
        }
    });

    const averageRating = Number((totalRating / totalSolved).toFixed(2));
    const averagePerDay = Number((totalSolved / days).toFixed(2));


    return {
        mostDifficultRating,
        totalSolved,
        averageRating,
        averagePerDay,
        ratingBuckets,
        heatMapData
    };
};


const filterOneYearContests = async (contests, handle) => {
    const validContestData = {};
    const totalContests = contests.length;
    const minUnixTime = getUnixTimestampNDaysAgo(365);

    // Loop through contests from the most recent to the oldest
    for (let i = totalContests - 1; i >= 0; i--) {
        const contest = contests[i];
        let unsolvedProblemsCount = 0;

        // Check if the contest meets the date condition
        if (contest.ratingUpdateTimeSeconds >= minUnixTime) {
            const contestDetailsApi = `${BASE_URL}contest.status?handle=${handle}&contestId=${contest.contestId}`;
            
            try {
                // Fetch contest details
                const contestData = await axios.get(contestDetailsApi);
                
                if (contestData && contestData.data.result) {
                    // Count unsolved problems
                    contestData.data.result.forEach((problem) => {
                        if (problem.verdict !== "OK") unsolvedProblemsCount++;
                    });
                }

                // Store valid contest data
                validContestData[contest.contestId] = {
                    rank: contest.rank,
                    oldRating: contest.oldRating,
                    newRating: contest.newRating,
                    unsolvedProblems: unsolvedProblemsCount,
                };
            } catch (error) {
                // Handle any errors in the API request
                console.error(`Error fetching data for contestId ${contest.contestId}:`, error);
            }
        } else {
            // Break out of the loop if contest does not meet the date condition
            break;
        }
    }
    return validContestData;
};


const filterOneYearUserDetails = async(submissions) => {
    const minUnixTime = getUnixTimestampNDaysAgo(90);

    let totalSolved = 0;
    let totalRating = 0;
    let mostDifficultRating = 0;

    const ratingBuckets = {};
    const heatMapData = {};

    submissions.forEach((submission) => {
        if(submission.verdict == "OK" && submission.creationTimeSeconds >= minUnixTime) {
            totalSolved++;

            const rating = submission.problem.rating || 0;
            totalRating += rating;
            mostDifficultRating = Math.max(mostDifficultRating, rating);

            const ratingBucket = getRatingBucket(rating);
            ratingBuckets[ratingBucket] = (ratingBuckets[ratingBucket] || 0) + 1;

            const dateKey = getDateFromUnix(submission.creationTimeSeconds);
            heatMapData[dateKey] = (heatMapData[dateKey] || 0) + 1;
        }
    });

    const averageRating = Number((totalRating / totalSolved).toFixed(2));
    const averagePerDay = Number((totalSolved / 90).toFixed(2));


    return {
        mostDifficultRating,
        totalSolved,
        averageRating,
        averagePerDay,
        ratingBuckets,
        heatMapData
    };
};


const fetchRatingsFromApiResponse = (apiResponse) => {
    const userData = apiResponse.data.result[0];
    const currentRating = userData.rating;
    const maxRating = userData.maxRating;

    return {currentRating, maxRating}
};


const filterContests = (contestData, days) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const filtered = {};

  for (const [contestId, contest] of contestData.entries()) {
    const contestDate = new Date(contest.createdAt); 
    if (contestDate >= cutoffDate) {
      filtered[contestId] = contest;
    }
  }

  return filtered;
};



const filterUserStatus = (problemData, days) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  console.log(cutoffDate);

  const filtered = {};

  for (const [dateStr, value] of Object.entries(problemData)) {
    const [year, month, day] = dateStr.split('/').map(Number);
    const parsedDate = new Date(year, month - 1, day); 

    if (!isNaN(parsedDate) && parsedDate >= cutoffDate) {
      filtered[dateStr] = value;
    }
  }

  return filtered;
};


const filterValidEntries = (userStatus, days) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);

  const filteredHeatMapData = {};
  const activeRatings = new Set();

  // Filter heatMapData by date
  for (const [dateStr, value] of Object.entries(userStatus.heatMapData)) {
    const [year, month, day] = dateStr.split('/').map(Number);
    const parsedDate = new Date(year, month - 1, day); // month is 0-indexed

    if (!isNaN(parsedDate) && parsedDate >= cutoffDate) {
      filteredHeatMapData[dateStr] = value;

      // You could collect rating info from this context if available
      // For now we assume you want to keep all ratingBuckets regardless of date
    }
  }

  // Keep all ratingBuckets as-is (or filter only ones present in heatMapData if needed)
  const filteredRatingBuckets = { ...userStatus.ratingBuckets };

  return {
    ...userStatus,
    heatMapData: filteredHeatMapData,
    ratingBuckets: filteredRatingBuckets
  };
};



module.exports = {
    filterValidEntries,
  filterContestsByDate,
  filterUserDetailsByDate,
  fetchRatingsFromApiResponse,
  filterContests,
  filterUserStatus,
  filterOneYearUserDetails,
  filterOneYearContests
};

