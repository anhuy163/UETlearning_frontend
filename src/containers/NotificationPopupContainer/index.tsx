import { testAvatarSrc } from "@/src/app/constants";
import NotificationPopup from "@/src/components/NotificationPopup";
import useQueryGetNotifications from "@/src/app/hooks/useQueryGetNotifications";

export default function NotificationPopupContainer() {
  const dummyNotis = [
    {
      type: "answer",
      student: "An Huy",
      avatar: testAvatarSrc,
      link: "642d739f93fd287f37eb59d6",
      createdAt: "20230216",
    },
    {
      type: "answer",
      student: "An Huy",
      avatar: testAvatarSrc,
      link: "642d739f93fd287f37eb59d6",
      createdAt: "20230216",
    },
    {
      type: "answer",
      student: "An Huy",
      avatar: testAvatarSrc,
      link: "642d739f93fd287f37eb59d6",
      createdAt: "20230216",
    },
    {
      type: "call",
      student: "An Huy",
      avatar: testAvatarSrc,
      // link: "642d739f93fd287f37eb59d6",
      createdAt: "20230216",
    },
  ];
  const {
    data: notis,
    loading: gettingNoti,
    error,
  } = useQueryGetNotifications();
  // console.log(notis?.notificationDBS);

  return <NotificationPopup notis={notis?.notificationDBS} />;
}
