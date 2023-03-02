import { message } from "antd";

export function showErrorMessage(msg: string) {
  message.error(msg);
}

export function showSuccessfulMessage(msg: string) {
  message.success(msg);
}
