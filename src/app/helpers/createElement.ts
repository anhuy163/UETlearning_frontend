import React, { ReactNode } from "react";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];
export const getMenuItem = (
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: any
) => {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
};
