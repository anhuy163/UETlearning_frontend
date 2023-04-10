import { testAvatarSrc } from "@/src/app/constants";
import NotificationPopup from "@/src/components/NotificationPopup";

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
  return <NotificationPopup notis={dummyNotis} />;
}
