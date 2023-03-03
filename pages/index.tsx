import LayoutContainer from "@/src/containers/Layout";
import PostContainer from "@/src/containers/Post";
import TeachingScheduleContainer from "@/src/containers/TeachingSchedule";

export default function Home() {
  return (
    <LayoutContainer title='Trang chủ'>
      <div className='w-full rounded-md overflow-auto pt-3 '>
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
