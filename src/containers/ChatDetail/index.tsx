import ChatDetail from "@/src/components/ChatDetail";
import { useRouter } from "next/router";

export default function ChatDetailContainer() {
  const router = useRouter();

  return <ChatDetail />;
}
