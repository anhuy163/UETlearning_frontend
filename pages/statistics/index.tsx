import {} from "antd";
import LayoutContainer from "@/src/containers/Layout";
import { Chart } from "chart.js";
import BarChart from "@/src/components/BarChat";
import PieChart from "@/src/components/PieChart";
import MyBreadcrumb from "@/src/components/MyBreadcrumb";
import { STATISTICS_PATH } from "@/src/app/constants";

export default function StatisticsPage() {
  return (
    <LayoutContainer title='Thống kê'>
      <div className='text-center'>
        <MyBreadcrumb path={STATISTICS_PATH} />
        <div className='w-full min-h-[calc(100vh_-_128px)] bg-white p-2 flex items-center justify-between rounded-md'>
          <div className='w-[50%]'>
            <BarChart />
          </div>
          <div className='w-[50%] p-16'>
            <PieChart />
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
}
