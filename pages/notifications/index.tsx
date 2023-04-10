import {
  AVATAR_SIZE,
  NOTIFICATION_PATH,
  testAvatarSrc,
} from "@/src/app/constants";
import MyBreadcrumb from "@/src/components/MyBreadcrumb";
import LayoutContainer from "@/src/containers/Layout";
import NotiCard from "@/src/components/NotiCard";

export default function NotificationsPage() {
  return (
    <LayoutContainer title="Thông báo">
      <div className="w-full overflow-auto">
        <MyBreadcrumb path={NOTIFICATION_PATH} />
        <div className="max-w-[860px] m-auto">
          {/* <NotiCard
            avatar={testAvatarSrc}
            name='Bakugo'
            title='Đã tạo bài viết mớiĐã tạo bài viết mớiĐã tạo bài viết mớiĐã tạo bài viết mớiĐã tạo bài viết mớiĐã tạo bài viết mới'
            createdAt='20230216'
            page={true}
          />
          <NotiCard
            avatar={testAvatarSrc}
            name='Bakugo'
            title='123'
            createdAt='20230216'
            page={true}
          /> */}
        </div>
      </div>
    </LayoutContainer>
  );
}
