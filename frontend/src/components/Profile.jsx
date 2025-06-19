import React, { useEffect, useState } from 'react';
import { fetchUserDetails } from '@/services/helper';
import ContestHistory from './ContestHistory';
import ProblemSolvingData from './ProblemSolvingData';
import { useParams } from 'react-router';

const Profile = () => {
  const { handle } = useParams();
  const [contestHistoryData, setContestHistoryData] = useState(null);
  const [problemSolvedData, setProblemSolvedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const { userDetails, userContestDetails, userStatusDetails } = await fetchUserDetails(handle);
        setProblemSolvedData(userStatusDetails);
        setContestHistoryData(userContestDetails);
        
        console.log(userDetails, userContestDetails, userStatusDetails);
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screenflex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {handle}
          </h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContestHistory props={contestHistoryData} />
          <ProblemSolvingData props={problemSolvedData} />
        </div>
      </div>
    </div>
  );
};

export default Profile;