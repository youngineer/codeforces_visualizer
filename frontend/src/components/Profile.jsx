import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import ProblemSolvingData from './ProblemSolvingData';
import ContestHistory from './ContestHistory';
import { fetchUserDetails } from '@/services/helper';

const Profile = () => {
  const { handle } = useParams();
  const [contestHistoryData, setContestHistoryData] = useState(null);
  const [problemSolvedData, setProblemSolvedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [heatGraphData, setHeatGraphData] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const userDetailsFromDb = await fetchUserDetails(handle);
        const { userStatus, contestHistory, heatMapData } = userDetailsFromDb;
        console.log({ userStatus, contestHistory})
        setProblemSolvedData(userStatus);
        setContestHistoryData(contestHistory);
        setHeatGraphData(heatMapData);
        
      } 
        catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [handle]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{handle}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProblemSolvingData props={problemSolvedData} />
        <ContestHistory props={contestHistoryData} />
      </div>
    </div>
  );
};


export default Profile;