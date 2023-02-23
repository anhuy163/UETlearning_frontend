import { AVATAR_SIZE, PROFILE_PATH } from "@/src/app/constants";
import { Avatar } from "antd";
import Link from "next/link";
import { getFirstLetterOfName } from "@/src/app/helpers/nameHelper";
import styles from "./styles.module.less";

type UserAvatarProps = {
  size: number;
  name: string;
  imgSrc?: string | undefined;
  link?: string | undefined;
  base64url?: string | undefined;
};

export default function UserAvatar({
  imgSrc = undefined,
  size,
  name,
  link = undefined,
  base64url = undefined,
}: UserAvatarProps) {
  return !!link ? (
    <Link href={PROFILE_PATH}>
      {!!imgSrc ? (
        <Avatar
          style={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
            fontSize:
              size === AVATAR_SIZE.LARGE
                ? "100px"
                : size === AVATAR_SIZE.TINY
                ? "16px"
                : "28px",
            border: "0.1px solid rgb(170, 164, 164)",
            // alignItems: "center",
          }}
          size={size}
          src={!!base64url ? base64url : imgSrc}
        />
      ) : (
        <Avatar
          style={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
            fontSize:
              size === AVATAR_SIZE.LARGE
                ? "100px"
                : size === AVATAR_SIZE.TINY
                ? "16px"
                : "24px",
            border: "0.1px solid rgb(170, 164, 164)",
            // alignItems: "center",
          }}
          size={size}>
          {getFirstLetterOfName(name)}
        </Avatar>
      )}
    </Link>
  ) : (
    <Avatar
      size={size}
      style={{
        color: "#f56a00",
        backgroundColor: "#fde3cf",
        fontSize:
          size === AVATAR_SIZE.LARGE
            ? "100px"
            : size === AVATAR_SIZE.TINY
            ? "16px"
            : "24px",
        border: "0.1px solid rgb(170, 164, 164)",
        // alignItems: "center",
      }}
      src={!!base64url ? base64url : imgSrc}>
      {getFirstLetterOfName(name)}
    </Avatar>
  );
}
