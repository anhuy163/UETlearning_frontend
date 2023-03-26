import RegisterForm from "@/src/components/RegisterForm";
import useMutationRegister from "@/src/app/hooks/useMutationRegister";
import {
  showErrorMessage,
  showSuccessfulMessage,
} from "../../app/helpers/messageHelper";
import moment from "moment";
import {
  LOGIN_PATH,
  ERROR_MESSAGE,
  SUCCESSFUL_MESSAGE,
} from "@/src/app/constants";
import useUploadVerifyImage from "@/src/app/hooks/useUploadVerifyImage";
import { useState } from "react";

export default function RegisterFormContainer() {
  const { uploadImage } = useUploadVerifyImage();
  const { loading, register } = useMutationRegister();
  const [uploadingImage, setUploadingImage] = useState(false);
  const getImageName = async (image: any) => {
    try {
      setUploadingImage(true);
      const res = await uploadImage(image);
      setUploadingImage(false);
      return (res as any).location;
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnRegister = async (value: any) => {
    // console.log(value);

    const {
      dateOfBirth,
      password,
      confirmPassword,
      subjects,
      grade,
      frontIdFile,
      backIdFile,
      ...others
    } = value;
    console.log(moment(dateOfBirth.$d).format("DD-MM-YYYY"));

    if (password !== confirmPassword) {
      return showErrorMessage(ERROR_MESSAGE.CONFRIM_PASSWORD);
    }
    const frontIdFileSrc = await getImageName(frontIdFile?.file?.originFileObj);
    const backIdFileSrc = await getImageName(backIdFile?.file?.originFileObj);
    // console.log(frontIdFileSrc);
    // console.log(frontIdFileSrc);

    register({
      ...others,
      password,
      type: 1,
      status: 1,
      point: 0,
      course: 0,
      isActive: true,
      subjects: [subjects],
      dateOfBirth: moment(dateOfBirth.$d).format("DD-MM-YYYY"),
      mtCCCD: frontIdFileSrc,
      msCCCD: backIdFileSrc,
    })
      .then((res: any) => {
        console.log(res?.data);
        if (res?.data.code !== 0) {
          res.data.code == 7 && showErrorMessage(ERROR_MESSAGE.INVALID_EMAIL);
          return;
        }
        showSuccessfulMessage(SUCCESSFUL_MESSAGE.REGISTER);
        window.location.replace(LOGIN_PATH);
      })
      .catch((err) => console.log(err));
  };
  return (
    <RegisterForm
      onFinish={handleOnRegister}
      loading={loading || uploadingImage}
    />
  );
}
