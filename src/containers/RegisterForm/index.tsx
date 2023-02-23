import RegisterForm from "@/src/components/RegisterForm";
import useMutationRegister from "@/src/app/hooks/useMutationRegister";
import showErrorMessage from "../../app/helpers/messageHelper";
import moment from "moment";
import { LOGIN_PATH } from "@/src/app/constants";

export default function RegisterFormContainer() {
  const { loading, register } = useMutationRegister();
  const handleOnRegister = (value: any) => {
    console.log(value);

    const { dateOfBirth, password, confirmPassword, ...others } = value;
    if (password !== confirmPassword) {
      return showErrorMessage("Mật khẩu nhập lại không khớp");
    }
    register({
      ...others,
      password,
      type: 1,
      status: 1,
      point: 1000,
      course: 0,
      isActive: true,
      dateOfBirth: moment(dateOfBirth.d).format("DD-MM-YYYY"),
    })
      .then((res) => {
        console.log(res);
        window.location.replace(LOGIN_PATH);
      })
      .catch((err) => console.log(err));
  };
  return <RegisterForm onFinish={handleOnRegister} loading={loading} />;
}
