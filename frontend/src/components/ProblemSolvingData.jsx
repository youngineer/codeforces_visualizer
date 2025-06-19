import React, { useState, useEffect } from 'react';
import BarGraph from './BarGraph';
import HeatGraph from './HeatGraph';

const ProblemSolvingData = ({ props }) => {
  const {
    averagePerDay = 0.62,
    averageRating = 0,
    heatMapData = {},
    mostDifficultRating = 0,
    ratingBuckets = {},
    totalSolved = 225,
  } = props || {};

  const [data, setData] = useState({
    averagePerDay,
    averageRating,
    heatMapData,
    mostDifficultRating,
    ratingBuckets,
    totalSolved,
  });

  useEffect(() => {
    if (props) {
      setData({
        averagePerDay,
        averageRating,
        heatMapData,
        mostDifficultRating,
        ratingBuckets,
        totalSolved,
      });
    }
  }, [props]);

  const stats = [
    {
      label: "Daily Average",
      value: data.averagePerDay,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Average Rating",
      value: data.averageRating,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      label: "Hardest Solved",
      value: data.mostDifficultRating,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Total Solved",
      value: data.totalSolved,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
      <div className="bg-white rounded-lg p-6 shadow">
        <h3 className="text-xl font-bold mb-6">Problem Solving Journey</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span>{stat.icon}</span>
                <span className="text-sm">{stat.label}</span>
              </div>
              <div className="text-xl font-bold">
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-3">Rating Distribution</h4>
            <BarGraph props={data.ratingBuckets} />
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="font-semibold mb-3">Activity Heatmap</h4>
            <HeatGraph props={data.heatMapData} />
          </div>
        </div>
      </div>
);
}

export default ProblemSolvingData;