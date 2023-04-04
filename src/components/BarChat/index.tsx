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
import { barChartData } from "@/src/app/constants";

type ChartProps = {
  data: any;
  type: string;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ data, type }: ChartProps) {
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
        label: "Điểm ",
        // data: [16, 45, 66, 68, 98, 100, 32, 23, 31, 13, 11, 50],
        data: data,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.4)",
      },
    ],
  };

  return <Bar data={chartData} options={chartOptions} />;
}
