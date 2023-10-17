import { MessageContainer } from "@/features/message/components"
import dynamic from "next/dynamic"

const ChatPage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/Layout"))
  return (
    <DynamicLayout>
      <MessageContainer />
    </DynamicLayout>
  )
}

export default ChatPage
