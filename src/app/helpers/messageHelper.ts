import { message } from "antd";

export default function showErrorMessage(msg: string) {
  message.error(msg);
}
