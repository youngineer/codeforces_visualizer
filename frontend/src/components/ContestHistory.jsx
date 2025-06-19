import React, { useEffect, useState } from 'react';
import LineGraph from './LineGraph';

const ContestHistory = ({ props }) => {
  const contestData = props || {};
  const [prevDays, setPrevDays] = useState(365);

  useEffect(() => {
    //TODO add filters
  }, [prevDays]);

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h3 className="text-xl font-bold mb-4">Contest Performance</h3>
      <LineGraph props={contestData} />
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
