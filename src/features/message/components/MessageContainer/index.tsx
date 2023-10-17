import { useAppSelector } from "@/redux/hooks"
import React, { useEffect } from "react"

const MessageContainer = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfoDetail)

  useEffect(() => {
    console.log("userInfo", userInfo)
  }, [])
  return (
    <div className="flex justify-between">
      <div className="w-[48%]">LeftBlock</div>
      <div className="w-[48%]">RightBlock</div>
    </div>
  )
}

export default MessageContainer
