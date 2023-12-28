import React from 'react';
import { Line } from 'react-chartjs-2';
import './LineChart.css';


function LineChart({dataChart, optionsChart}) {
  return (
    <div className="linechart-container">
        <Line data={dataChart} options={optionsChart} />
    </div>
  )
}

export default LineChart