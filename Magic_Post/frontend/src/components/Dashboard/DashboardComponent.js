import React, { useEffect, useState, useLayoutEffect } from "react";
import "./DashboardComponent.css";
import { FaTruckArrowRight } from "react-icons/fa6";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { FaWarehouse } from "react-icons/fa";
import { BsFillBoxSeamFill } from "react-icons/bs";
import LineChart from "../Charts/LineChart/LineChart";
import BarChart from "../Charts/BarChart/BarChart";
import PieChart from "../Charts/PieChart/PieChart";
import axios from "axios";

function DashboardComponent() {
  const token = localStorage.getItem("token");

  const [shipped, setShipped] = useState(0);

  const [shipping, setShipping] = useState(0);

  const [inStock, setInStock] = useState(0);

  const [numberOfInStock, setNumberOfInStock] = useState(0);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Số lượng',
        data: '',
        backgroundColor: "red"
      },
    ],
  });

  const ordersByYear = async () => {
    try {
      const response = await fetch("http://localhost:5000/order/getall", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const orders = await response.json();
        const count = orders.reduce((result, order) => {
          const year = new Date(order.order_date).getFullYear();
          console.log(year);
          const month = new Date(order.order_date).getMonth();
          console.log(month);

          if ((year === 2022 || year === 2023) && month + 1 === 6) {
            result++;
          }
          return result;
        }, 0);

        const shipData = orders.reduce((result, order) => {
          const orderYear = new Date(order.order_date).getFullYear();
          const existingObj = result.find((obj) => obj.year === orderYear);
          if (existingObj) {
            existingObj.ship++;
          } else {
            result.push({ year: orderYear, ship: 1 });
          }
          return result;
        }, []);

        setShipped(
          shipData.reduce(
            (orders, currentQuantity) => orders + currentQuantity.ship,
            0
          )
        );

        setShipping(
          shipData.reduce(
            (orders, currentQuantity) =>
              currentQuantity.year >= 2021 && currentQuantity.year < 2023
                ? orders + currentQuantity.ship
                : orders,
            0
          )
        );

        setInStock(count);

        console.log(shipData.map(data => data.year));
        console.log(shipData.map((data) => data.ship))
        setChartData({
          labels: shipData.map(data => data.year),
          datasets: [
            {
              label: "Số lượng",
              data: shipData.map(data => data.ship),
              backgroundColor:[
                'rgba(255, 99, 132, 0.9)',
                'rgba(54, 162, 235, 0.9)',
                'rgba(255, 206, 86, 0.9)',
                'rgba(75, 192, 192, 0.9)',
                'rgba(153, 102, 255, 0.9)'
              ],
              borderWidth: 0.9,
              borderColor: "#000",
            }
          ]
        }
    );
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.log("Error" + err);
    }
  };


  useLayoutEffect(() => {
    ordersByYear();
  }, []);

  const options = {
    indexAxis: "x",
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      title: {
        display: true,
        position: "bottom",
        text: "Thống kê số lượng đơn hàng theo từng năm",
      },
      legend:{
        display:true,
        align: "end",
        labels:{
          fontColor:'#000'
        }
      }
    },
  };
  return (
    <div className="dashboard-content">
      <div className="box-container">
        <div className="quantity-shipped">
          <div className="quantity-shipped-img">
            <AiOutlineDeliveredProcedure className="icon-box" />
          </div>
          <div className="quantity-shipped-content">
            <h3>Hàng đã vận chuyển</h3>
            <p>{shipped}</p>
          </div>
        </div>
        <div className="quantity-transit">
          <div className="quantity-transit-img">
            <FaTruckArrowRight className="icon-box" />
          </div>
          <div className="quantity-transit-content">
            <h3>Hàng đang vận chuyển</h3>
            <p>{shipping}</p>
          </div>
        </div>
        <div className="quantity-still-instock">
          <div className="quantity-still-instock-img">
            <FaWarehouse className="icon-box" />
          </div>
          <div className="quantity-still-instock-content">
            <h3>Hàng đang còn trong kho</h3>
            <p>{inStock}</p>
          </div>
        </div>
        <div className="quantity-arrive-instock">
          <div className="quantity-arrive-instock-img">
            <BsFillBoxSeamFill className="icon-box" />
          </div>
          <div className="quantity-arrive-instock-content">
            <h3>Số lượng hàng đến kho</h3>
            <p>789.376</p>
          </div>
        </div>
      </div>
      <div className="dashboard-chart">
      <BarChart dataChart={chartData} optionsChart={options}/>
      </div>
    </div>
  );
}

export default DashboardComponent;
