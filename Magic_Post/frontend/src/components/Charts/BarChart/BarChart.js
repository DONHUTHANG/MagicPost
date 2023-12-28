import React from 'react';
import { Bar } from 'react-chartjs-2';
import {} from 'chart.js/auto';
import './BarChart.css';


function BarChart({dataChart, optionsChart}) {
  return (
    <div className="barchart-container">
        <Bar data={dataChart} options={optionsChart} />
    </div>
  )
}

export default BarChart