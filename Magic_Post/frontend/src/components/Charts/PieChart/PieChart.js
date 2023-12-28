import React from 'react';
import { Pie } from 'react-chartjs-2';
import './PieChart.css';


function PieChart({dataChart, optionsChart}) {
  return (
    <div className="piechart-container">
        <Pie data={dataChart} options={optionsChart} />
    </div>
  )
}

export default PieChart