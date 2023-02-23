import { CarryOutOutlined, FormOutlined } from "@ant-design/icons";
import { Divider, Tree } from "antd";
import type { DataNode } from "antd/es/tree";
import Comment from "../Comment";
import { AVATAR_SIZE } from "@/src/app/constants";
import styles from "./styles.module.less";
import clsx from "clsx";
import { useState } from "react";

const { TreeNode } = Tree;
const treeData: DataNode[] = [
  {
    title: <Comment content='123' avatarSize={AVATAR_SIZE.SMALL} />,
    key: "0-0",
    children: [
      {
        title: <Comment content='123' avatarSize={AVATAR_SIZE.TINY} />,
        key: "0-0-0",
      },
      {
        title: <Comment content='123' avatarSize={AVATAR_SIZE.TINY} />,
        key: "0-0-1",
      },
      {
        title: <Comment content='123' avatarSize={AVATAR_SIZE.TINY} />,
        key: "0-0-2",
      },
    ],
  },
];

export default function SubComment() {
  const [showSubCommentBtn, setShowSubCommentBtn] = useState(false);

  const onToggleBtn = () => {
    setShowSubCommentBtn(!showSubCommentBtn);
  };
  return (
    <div className={clsx(styles.container)}>
      {/* <Tree treeData={treeData} /> */}
      <Tree>
        {treeData?.map((item) => {
          return (
            <TreeNode
              selectable={false}
              className='mb-3'
              key={item.key}
              title={item.title}
              switcherIcon={
                <div onClick={onToggleBtn}>
                  {showSubCommentBtn ? "Ẩn phản hồi" : "Xem phản hồi"}
                </div>
              }>
              {item.children?.map((children) => (
                <TreeNode
                  selectable={false}
                  key={children.key}
                  title={children.title}
                  className='ml-10'
                />
              ))}
            </TreeNode>
          );
        })}
      </Tree>
    </div>
  );
}
