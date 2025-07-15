import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Report.css'
const Report = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["1900", "1950", "1999", "2050"],
        datasets: [
          {
            label: "Africa",
            backgroundColor: "#3e95cd",
            data: [133, 221, 783, 2478]
          },
          {
            label: "Europe",
            backgroundColor: "#8e5ea2",
            data: [408, 547, 675, 734]
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Population growth (millions)'
          }
        }
      }
    });

  
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="row">
      <div className="col-12 col-md-7">
        <h3 className="fw-bold fs-4 my-3">Recent Transactions</h3>
        <table className="table table-striped">
          <thead>
            <tr className='highlight'>
              <th scope="col">S.No.</th>
              <th scope="col">Description</th>
              <th scope="col">Date</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr><th scope="row">1</th><td>Fruits</td><td>05-07-2025</td><td>5000</td></tr>
            <tr><th scope="row">2</th><td>Vegetables</td><td>08-06-2025</td><td>2000</td></tr>
            <tr><th scope="row">3</th><td>Cereals</td><td>02-06-2025</td><td>1500</td></tr>
          </tbody>
        </table>
      </div>
      <div className="col-12 col-md-5">
        <h3 className="fw-bold fs-4 my-3">Reports Overview</h3>
        <canvas ref={chartRef} width="800" height="450"></canvas>
      </div>
    </div>
  );
};

export default Report;
