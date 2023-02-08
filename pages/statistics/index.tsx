import {} from "antd";
import LayoutContainer from "@/src/containers/Layout";
import { Chart } from "chart.js";
import BarChart from "@/src/components/BarChat";

export default function StatisticsPage() {
  return (
    <LayoutContainer title='Thống kê'>
      <div className='text-center'>
        <h1 className='text-4xl font-mono text-cyan-700 font-extrabold mb-2'>
          Thống kê của bạn
        </h1>
        <div className='w-full bg-white p-2'>
          <div className='w-[50%]'>
            <BarChart />
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
}
