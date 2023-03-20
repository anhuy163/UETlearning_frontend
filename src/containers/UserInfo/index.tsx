import UserInfo from "@/src/components/UserInfo";
import useQueryGetTeacherProfile from "@/src/app/hooks/useQueryGetTeacherProfile";
import useMutationUpdateTeacherProfile from "@/src/app/hooks/useMutationUpdateTeacherProfile";
import useUploadAvatar from "@/src/app/hooks/useUploadAvatar";
import { useState } from "react";
export default function UserInfoContainer() {
  const { data, loading, error } = useQueryGetTeacherProfile();
  const { doMutation: updateProfile, loading: updatingProfile } =
    useMutationUpdateTeacherProfile();
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const { uploadAvatar } = useUploadAvatar();
  // console.log(data);

  const [img, setImg] = useState();
  const onChange = (img: any) => {
    setImg(img);
  };
  const getImageName = async (image: any) => {
    try {
      setUploadingAvatar(true);
      const res = await uploadAvatar(image);
      // console.log(res);
      setUploadingAvatar(false);
      return (res as any).location;
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleOnUpdateProfile = async (value: any) => {
    let avatar;
    if (img) {
      avatar = await getImageName(img);
      console.log(avatar);
    }
    // console.log(value);
    console.log({
      avaPath: avatar ? avatar : data.avaPath,
      realName: value?.realname,
      phoneNumber: value?.phone,
      username: data.username,
      dateOfBirth: data.dateOfBirth,
      gender: value?.gender,
      subjects: data.subjects,
      course: value?.grade,
      priceChat: value?.priceChat,
      priceCall: value?.priceCall,
      message: value?.intro,
    });

    updateProfile({
      avaPath: avatar ? avatar : data.avaPath,
      realName: value?.realname,
      phoneNumber: value?.phone,
      username: data.username,
      dateOfBirth: data.dateOfBirth,
      gender: value?.gender,
      subjects: data.subjects,
      course: value?.grade,
      priceChat: value?.priceChat,
      priceCall: value?.priceCall,
      introduceMyself: value?.intro,
    });
  };

  return (
    <UserInfo
      loading={loading || updatingProfile || uploadingAvatar}
      defaultValues={data}
      onChange={onChange}
      onFinish={handleOnUpdateProfile}
    />
  );
}
