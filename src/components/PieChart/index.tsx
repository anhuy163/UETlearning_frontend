import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { Pie } from "react-chartjs-2";
import React, { useEffect, useState } from "react";

ChartJS.register(CategoryScale, Title, Tooltip, Legend, ArcElement);

export default function PieChart() {
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Biểu đồ điểm",
        },
      },
    } as never);
  }, []);
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        // hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <Pie data={data} options={chartOptions} />
    </div>
  );
}
