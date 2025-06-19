import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BarGraph(props) {
  const points = props.props;

  const xAxisPts = [];
  const yAxisPts = [];

  Object.entries(points).forEach(([x, y]) => {
    xAxisPts.push(x);
    yAxisPts.push(y);
  });

  return (
    <BarChart
      xAxis={[{ data: xAxisPts }]}
      series={[{ data: yAxisPts }]}
      height={300}
    />
  );
}
