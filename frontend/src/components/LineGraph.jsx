import * as React from 'react';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ChartsReferenceLine } from '@mui/x-charts/ChartsReferenceLine';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';

const margin = { right: 24 };

export default function LineGraph({ props: dataPoints }) {
  if (!dataPoints || Object.keys(dataPoints).length === 0) return <div>Loading...</div>;

  // Sort contest IDs (keys) in ascending order
  const sortedContestIds = Object.keys(dataPoints).sort((a, b) => +a - +b);

  const xLabels = sortedContestIds.map((id) => id);
  const ratingData = sortedContestIds.map((id) => dataPoints[id].newRating);

  const maxRating = Math.max(...ratingData);
  const maxIndex = ratingData.indexOf(maxRating);
  const maxLabel = xLabels[maxIndex];

  return (
    <ChartContainer
      width={800}
      height={400}
      series={[{ data: ratingData, label: 'CF Rating', type: 'line' }]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      yAxis={[{ width: 50 }]}
      margin={margin}
    >
      <LinePlot />
      <MarkPlot />
      <ChartsXAxis />
      <ChartsYAxis />
      <ChartsReferenceLine
        x={maxLabel}
        label="Peak Rating"
        lineStyle={{ stroke: 'green', strokeDasharray: '5 5' }}
      />
      <ChartsReferenceLine
        y={maxRating}
        label={`Max ${maxRating}`}
        lineStyle={{ stroke: 'red', strokeDasharray: '5 5' }}
      />
    </ChartContainer>
  );
}
