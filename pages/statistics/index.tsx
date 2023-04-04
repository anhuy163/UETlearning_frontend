import { Select, Radio } from "antd";
import LayoutContainer from "@/src/containers/Layout";
import { Chart } from "chart.js";
import BarChart from "@/src/components/BarChat";
import PieChart from "@/src/components/PieChart";
import MyBreadcrumb from "@/src/components/MyBreadcrumb";
import { STATISTICS_PATH, STATISTICS_TYPE } from "@/src/app/constants";
import { useState } from "react";
import useQueryGetTeacherStatistics from "@/src/app/hooks/useQueryGetTeacherStatistics";
import FormWrapper from "@/src/containers/FormWrapper/FormWrapper";

export default function StatisticsPage() {
  const [type, setType] = useState("1");
  const { data, loading } = useQueryGetTeacherStatistics(type);
  const handleOnTypeChange = (value: any) => {
    // console.log(value.target.value);
    setType(value?.target.value);
  };
  // console.log(data);

  return (
    <LayoutContainer title='Thống kê'>
      <div className='text-center'>
        <MyBreadcrumb path={STATISTICS_PATH} />
        <div className='w-full min-h-[calc(100vh_-_128px)] bg-white p-2  rounded-md'>
          <FormWrapper loading={loading}>
            <div className='mt-2'>
              <Radio.Group
                buttonStyle='solid'
                onChange={handleOnTypeChange}
                defaultValue={"1"}>
                {STATISTICS_TYPE.map((item, index) => {
                  return (
                    <Radio.Button value={item?.value} key={index}>
                      {item?.label}
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            </div>
            <div className='w-full flex items-center justify-between'>
              <div className='w-[50%]'>
                <BarChart data={data} type={type} />
              </div>
              <div className='w-[50%] p-16'>
                <PieChart data={data} type={type} />
              </div>
            </div>
          </FormWrapper>
        </div>
      </div>
    </LayoutContainer>
  );
}
