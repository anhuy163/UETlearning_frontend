import React from "react";
import { Spin } from "antd";
import styles from "./styles.module.less";

type FormWrapperProps = {
  children: React.ReactNode;
  loading?: boolean;
  className?: any;
};

export default function FormWrapper({
  children,
  loading = false,
  ...props
}: FormWrapperProps) {
  return loading ? (
    <div>
      <Spin tip='Đang tải...' size='large'>
        <div {...props}>{children}</div>
      </Spin>
    </div>
  ) : (
    <div {...props}>{children}</div>
  );
}
