import React, { useEffect, useState } from 'react';
import LineGraph from './LineGraph';

const ContestHistory = ({ props }) => {
  const contestData = props || {};
  const [prevDays, setPrevDays] = useState(365);

  useEffect({

  }, [prevDays]);
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 backdrop-blur-sm border border-blue-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-xl font-bold text-gray-800">Contest Performance</h3>
      </div>
      <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
        <LineGraph props={contestData} />
      </div>
    </div>
  );
};

export default ContestHistory;

/* <h3 className="text-xl font-semibold mb-4 text-gray-800">Contest History</h3>

      {Object.entries(contestData).map(([contestId, data]) => (
        <div
          key={contestId}
          className="mb-4 border rounded-lg p-4 bg-gray-50 hover:shadow-md transition"
        >
          <h4 className="text-lg font-medium text-indigo-600">Contest ID: {contestId}</h4>
          <p className="text-gray-700">Rank: {data.rank}</p>
          <p className="text-gray-700">Old Rating: {data.oldRating}</p>
          <p className="text-gray-700">New Rating: {data.newRating}</p>
          {data.hasOwnProperty('ratingChange') && (
            <p className="text-gray-700">
              Rating Change:{' '}
              <span className={data.ratingChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                {data.ratingChange}
              </span>
            </p>
          )}
        </div>
      ))} */
