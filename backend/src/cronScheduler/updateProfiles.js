const cron = require('node-cron');
const { Student } = require('../models/student');
const { fetchCodeforcesUserProfile, fetchProfileInformation } = require('../middlewares/codeforcesMiddleware');
const { saveUserToDatabase } = require('../middlewares/databaseMiddleware');


// Fake express-like req/res for middleware compatibility
const fakeResp = {
  status: () => ({ json: console.log }),
};

const runDailyUserUpdate = async () => {
  console.log(`Running user profile cron at ${new Date().toLocaleString()}`);

  try {
    const users = await Student.find({});
    
    for (const user of users) {
      const fakeReq = {
        params: { handle: user.handle },
        body: {
          contestLimit: 365,
          problemsLimit: 90
        }
      };

      try {
        await fetchCodeforcesUserProfile(fakeReq, fakeResp, async () => {
          await fetchProfileInformation(fakeReq, fakeResp, async () => {
            await saveUserToDatabase(fakeReq, fakeResp, () => {
              console.log(`Updated: ${user.handle}`);
            });
          });
        });
      } catch (innerErr) {
        console.error(`Failed for user ${user.handle}:`, innerErr.message);
      }
    }

  } catch (err) {
    console.error("Cron Job Error:", err.message);
  }
};

// Schedule to run every day at 02:53 AM
cron.schedule('53 2 * * *', runDailyUserUpdate);
