import LayoutContainer from "@/src/containers/Layout";
import PostContainer from "@/src/containers/Post";
import MyBreadcrumb from "@/src/components/MyBreadcrumb";
import { QANDA_PATH } from "@/src/app/constants";

export default function Home() {
  return (
    <LayoutContainer title='Trang chủ'>
      <div className='w-full overflow-auto  '>
        <MyBreadcrumb path={QANDA_PATH} />
        <PostContainer
          id='1'
          name='Bakugo Katsuki'
          content='alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123alo123vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv'
        />
      </div>
    </LayoutContainer>
  );
}
