import { Breadcrumb } from "antd";
import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { BREADCRUMB_NAME_MAPPING, HOME_PATH } from "@/src/app/constants";
import styles from "./styles.module.less";
import clsx from "clsx";
type MyBreadcrumbProps = {
  path: string;
};

export default function MyBreadcrumb({ path }: MyBreadcrumbProps) {
  return (
    <div className={clsx(styles.container, "py-3 px-2")}>
      <Breadcrumb>
        <Breadcrumb.Item href={HOME_PATH}>
          {BREADCRUMB_NAME_MAPPING[HOME_PATH]}
        </Breadcrumb.Item>

        {!!path && (
          <Breadcrumb.Item href={path}>
            {BREADCRUMB_NAME_MAPPING[path]}
          </Breadcrumb.Item>
        )}
      </Breadcrumb>
    </div>
  );
}
