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



const filterOneYearContests = async (contests, handle, days=365) => {
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
                    date: getDateFromUnix(contest.ratingUpdateTimeSeconds)
                };
            } catch (error) {
                // Handle any errors in the API request
                console.error(`Error fetching data for contestId ${contest.contestId}:`, error);
            }
        }
    }
    return validContestData;
};


const filter90DaysUserDetails = (userDetails, days = 90) => {
  const minUnixTime = getUnixTimestampNDaysAgo(days);

  let totalSolved = 0;
  let totalRating = 0;
  let mostDifficultRating = 0;

  const ratingBuckets = {};
  const heatMapData = {};

//   const submissions = userDetails.problem || [];

  userDetails.forEach((submission) => {
    if (submission.verdict === "OK" && submission.creationTimeSeconds >= minUnixTime) {
      totalSolved++;

      const rating = submission.problem.rating || 0;
      totalRating += rating;
      mostDifficultRating = Math.max(mostDifficultRating, rating);

      const ratingBucket = getRatingBucket(rating);
      const lastUpdated = new Date(submission.creationTimeSeconds * 1000);

      if (ratingBuckets[ratingBucket]) {
        ratingBuckets[ratingBucket].count += 1;
        ratingBuckets[ratingBucket].lastUpdated = lastUpdated; 
      } else {
        ratingBuckets[ratingBucket] = {
          count: 1,
          lastUpdated,
        };
      }

      const dateKey = getDateFromUnix(submission.creationTimeSeconds); 
      const timestamp = new Date(submission.creationTimeSeconds * 1000);

      if (heatMapData[dateKey]) {
        heatMapData[dateKey].count += 1;
        heatMapData[dateKey].timestamp = timestamp;
      } else {
        heatMapData[dateKey] = {
          count: 1,
          timestamp,
        };
      }
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
    heatMapData,
  };
};



const fetchRatingsFromApiResponse = (apiResponse) => {
    const userData = apiResponse.data.result[0];
    const currentRating = userData.rating;
    const maxRating = userData.maxRating;

    return {currentRating, maxRating}
};






module.exports = {
  fetchRatingsFromApiResponse,
  filter90DaysUserDetails,
  filterOneYearContests
};

