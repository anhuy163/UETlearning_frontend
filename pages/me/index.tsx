import { AVATAR_SIZE, PROFILE_PATH } from "@/src/app/constants";
import MyBreadcrumb from "@/src/components/MyBreadcrumb";
import UserAvatar from "@/src/components/UserAvatar";
import LayoutContainer from "@/src/containers/Layout";
import UserInfoContainer from "@/src/containers/UserInfo";

export default function ProfilePage() {
  return (
    <LayoutContainer title='Hồ sơ'>
      <div>
        <MyBreadcrumb path={PROFILE_PATH} />
        <div className='w-full min-h-[calc(100vh_-_128px)] bg-white p-2 rounded-md'>
          <UserInfoContainer />
        </div>
      </div>
    </LayoutContainer>
  );
}
