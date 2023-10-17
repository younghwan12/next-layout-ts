import { useAppSelector } from "@/redux/hooks"
import React, { useEffect } from "react"

const MessageContainer = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfoDetail)

  useEffect(() => {
    console.log("userInfo", userInfo)
  }, [])
  return <div>MessageContainer</div>
}

export default MessageContainer
