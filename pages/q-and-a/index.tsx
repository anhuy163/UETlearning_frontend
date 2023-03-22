import LayoutContainer from "@/src/containers/Layout";
import PostContainer from "@/src/containers/Post";
import MyBreadcrumb from "@/src/components/MyBreadcrumb";
import { QANDA_PATH } from "@/src/app/constants";
import QuestionPostContainer from "@/src/containers/QuestionPost";
import { Select, Radio } from "antd";
import { POST_OPTIONS } from "@/src/app/constants";
import { useState } from "react";
import useQueryGetPosts from "@/src/app/hooks/useQueryGetPosts";
import FormWrapper from "@/src/containers/FormWrapper/FormWrapper";

export default function Home() {
  const [option, setOption] = useState(1);
  const {
    data: posts,
    loading: gettingPosts,
    isFetching: fetchingPosts,
    error,
  } = useQueryGetPosts(option);
  // console.log(posts?.questions);

  const onOptionChange = (event: any) => {
    // console.log(event.target.value);

    setOption(event.target.value);
  };

  return (
    <LayoutContainer title='Trang chủ'>
      <div className='w-full overflow-auto  '>
        <MyBreadcrumb path={QANDA_PATH} />
        <div className='w-[60%] m-auto mb-2'>
          <Radio.Group
            defaultValue={1}
            buttonStyle='solid'
            value={option}
            onChange={onOptionChange}>
            <Radio value={1}>
              <span
                className={
                  option === 1
                    ? "text-lg text-blue-600 font-semibold"
                    : "text-lg text-slate-600 font-semibold"
                }>
                Tất cả
              </span>
            </Radio>
            <Radio value={2}>
              <span
                className={
                  option === 2
                    ? "text-lg text-blue-600 font-semibold"
                    : "text-lg text-slate-600 font-semibold"
                }>
                Khối giảng dạy của bạn
              </span>
            </Radio>
            <Radio value={3}>
              <span
                className={
                  option === 2
                    ? "text-lg text-blue-600 font-semibold"
                    : "text-lg text-slate-600 font-semibold"
                }>
                Những người theo dõi bạn
              </span>
            </Radio>
          </Radio.Group>
        </div>
        <FormWrapper loading={fetchingPosts || gettingPosts}>
          {posts?.questions?.map((question: any) => {
            return (
              <QuestionPostContainer
                key={question?.id}
                id={question?.id}
                name={question?.student?.realName}
                content={question?.content}
                studentAva={question?.student?.avaPath}
                createdTime={question?.createTime}
                answers={question?.totalAnswer}
              />
            );
          })}
        </FormWrapper>
        {/* <QuestionPostContainer
          id='1'
          name='Bakugo Katsuki'
          content='alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv'
        />
        <QuestionPostContainer
          id='2'
          name='Bakugo Katsuki'
          content='alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv'
        /> */}
      </div>
    </LayoutContainer>
  );
}
