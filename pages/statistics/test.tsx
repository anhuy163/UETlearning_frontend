import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const data = {
    labels: ["John", "Kevin", "Geroge", "Micheal", "Oreo"],
    datasets: [
      {
        label: "Whom'st let the dogs out",
        data: [12, 55, 34, 120, 720],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.4)",
      },
      {
        label: "Whom'st let the dogs in",
        data: [12, 55, 34, 120, 720],
        borderColor: "rgb(5, 162, 235)",
        backgroundColor: "rgba(5, 162, 235, 0.4)",
      },
    ],
  };

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: ["John", "Kevin", "Geroge", "Micheal", "Oreo"],
      datasets: [
        {
          label: "Whom'st let the dogs out",
          data: [12, 55, 34, 120, 720],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.4)",
        },
        {
          label: "Whom'st let the dogs in",
          data: [12, 55, 34, 120, 720],
          borderColor: "rgb(5, 162, 235)",
          backgroundColor: "rgba(5, 162, 235, 0.4)",
        },
      ],
    } as never);
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Whom'st let the dogs out",
        },
      },
    });
  }, []);

  return (
    <div className='App'>
      <Bar options={chartOptions} data={data} />
    </div>
  );
}

export default App;
