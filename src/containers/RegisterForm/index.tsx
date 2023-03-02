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

export default function RegisterFormContainer() {
  const { loading, register } = useMutationRegister();
  const handleOnRegister = (value: any) => {
    console.log(value);

    const { dateOfBirth, password, confirmPassword, subjects, ...others } =
      value;
    if (password !== confirmPassword) {
      return showErrorMessage(ERROR_MESSAGE.CONFRIM_PASSWORD);
    }
    register({
      ...others,
      password,
      type: 1,
      status: 1,
      point: 1000,
      course: 0,
      isActive: true,
      subjects: [subjects],
      dateOfBirth: moment(dateOfBirth.d).format("DD-MM-YYYY"),
    })
      .then((res: any) => {
        console.log(res);
        if (res?.data.code !== 0) {
          res.data.code == 4 && showErrorMessage(ERROR_MESSAGE.INVALID_EMAIL);
          return;
        }
        showSuccessfulMessage(SUCCESSFUL_MESSAGE.REGISTER);
        window.location.replace(LOGIN_PATH);
      })
      .catch((err) => console.log(err));
  };
  return <RegisterForm onFinish={handleOnRegister} loading={loading} />;
}
