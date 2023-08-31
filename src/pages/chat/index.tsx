import { ChatContainer } from "@/features/chat/component"
import dynamic from "next/dynamic"

const ChatPage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/Layout"))
  return (
    <DynamicLayout>
      <ChatContainer />
    </DynamicLayout>
  )
}

export default ChatPage
