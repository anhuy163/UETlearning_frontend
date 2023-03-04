import LayoutContainer from "@/src/containers/Layout";
import PostContainer from "@/src/containers/Post";
import TeachingScheduleContainer from "@/src/containers/TeachingSchedule";

export default function Home() {
  return (
    <LayoutContainer title='Trang chủ'>
      <div className='w-full  h-[calc(100vh_-_80px)]  py-12 mt-2 bg-white rounded-md flex items-center justify-center text-center'>
        <TeachingScheduleContainer />
        {/* <PostContainer
          id='1'
          name='Bakugo Katsuki'
          content='alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv'
        />
        <PostContainer
          id='2'
          name='Bakugo Katsuki'
          content='alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv'
        /> */}
      </div>
    </LayoutContainer>
  );
}
