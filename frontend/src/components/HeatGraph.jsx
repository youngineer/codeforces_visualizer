import React from 'react';
import HeatMap from '@uiw/react-heat-map';


const HeatGraph = (props) => {
    const heatMapData = props.props;
    const values = [];

    Object.entries(heatMapData).forEach(([day, solved]) => {
        values.push({ date: day, count: solved });
    });



  return (
    <HeatMap
      value={values}
      width={600}
      style={{ color: '4ea37d', '--rhm-rect-active': 'green' }}
      startDate={new Date('2025/01/01')}
      panelColors={[
        '#e0f2e9', 
        '#b3e2c8',
        '#7ccba2',
        '#4ea37d',
        '#237b57',
        '#0b4a2e'  
      ]}
    />
  )
};


export default HeatGraph;