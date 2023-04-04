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
type ChartProps = {
  data: any;
  type: string;
};

export default function PieChart({ data, type }: ChartProps) {
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
          text:
            type === "1"
              ? "Điểm đạt được theo ngày trong tuần"
              : "Điểm đạt được theo tháng",
        },
      },
    } as never);
  }, [type]);
  const chartData = {
    labels:
      type === "1"
        ? ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"]
        : [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
          ],
    datasets: [
      {
        label: "Điểm",
        data: data,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(22, 95, 114)",
          "rgb(160, 190, 114)",
          "rgb(86, 95, 114)",
          "rgb(190, 95, 114)",
          "rgb(190, 244, 114)",
          "rgb(190, 144, 114)",
          "rgb(190, 225, 229)",
          "rgb(225, 195, 214)",
          "rgb(200, 56, 61)",
          // "rgb(47, 137, 61)",
        ],
        // hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
}
