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
    <div className="bg-gradient-to-br from-purple-50 to-pink-100 backdrop-blur-sm border border-purple-200/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-xl font-bold text-gray-800">Problem Solving Journey</h3>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bg} border border-white/30 rounded-lg p-4 backdrop-blur-sm hover:scale-105 transition-transform duration-200`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-sm font-medium text-gray-600">{stat.label}</span>
            </div>
            <div className={`text-2xl font-bold ${stat.color}`}>
              {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="space-y-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            Rating Distribution
          </h4>
          <BarGraph props={data.ratingBuckets} />
        </div>
        
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            Activity Heatmap
          </h4>
          <HeatGraph props={data.heatMapData} />
        </div>
      </div>
    </div>
  );
};

export default ProblemSolvingData;