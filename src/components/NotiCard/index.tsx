import {} from "antd";
import UserAvatar from "../UserAvatar";
import { AVATAR_SIZE } from "@/src/app/constants";

type NotiCardProps = {
  avatar: string;
  name: string;
  title: string;
  content?: string;
};

export default function NotiCard({
  avatar,
  name,
  title,
  content,
}: NotiCardProps) {
  return (
    <div className='flex items-center justify-between px-2 py-1 rounded-lg bg-slate-600 hover:bg-slate-700 cursor-pointer mt-2 transition ease-in-out delay-100'>
      <UserAvatar size={AVATAR_SIZE.SMALL} name={name} imgSrc={avatar} />
      <div className='w-[250px]'>
        <h2 className='font-mono text-white font-semibold'>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}
