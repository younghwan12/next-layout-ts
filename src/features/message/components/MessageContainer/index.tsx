import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import React, { useEffect, useState } from "react"
import { useLazyGetFollowListQuery } from "../../redux/followApi"
import Image from "next/image"
import ChattingTestModal from "@/component/Modal/ChattingModal"
import ChattingModal from "@/component/Modal/ChattingModal"
import MessageModal from "@/component/Modal/MessageModal"

const MessageContainer = () => {
  const userInfo = useAppSelector((state) => state.auth.userInfoDetail)
  const token = useAppSelector((state) => state.auth.loginInfo)
  const dispatch = useAppDispatch()
  // dispatch(followingList({ token: token, uid: userInfo?.uid }));
  const [getfollowList, { data }] = useLazyGetFollowListQuery()
  // const [getfollowerList, ] =
  useEffect(() => {
    if (token.accessToken && userInfo) {
      // dispatch(
      getfollowList({
        token: token.accessToken,
        uid: userInfo.uid,
      })
      // )
    }
    console.log("userInfo", userInfo)
  }, [token, userInfo])
  const [visible, setVisible] = useState(false)
  const [rowData, setRowData] = useState(null)

  const onDoubleClick = (room: any) => {
    console.log("room", room)
    setRowData(room)
    setVisible(true)
  }

  return (
    <div
      // className="msg_container"
      className="flex justify-between !h-full"
    >
      <div className=" w-[35%] jwBxvn overflow-y-scroll">
        {data &&
          data.map((item) => {
            return (
              <li key={item.uid} onDoubleClick={() => onDoubleClick(item)}>
                <Image
                  width={56}
                  height={56}
                  alt="profile"
                  src={`data:image/jpeg;base64, ${item.profileResource}`}
                ></Image>
                <p className="room-block-top">
                  <b>{item.nickname}</b>
                  <span>
                    오전 9:43
                    {/* {roomList.updatedAt} */}
                  </span>
                </p>
                <p className="preview">
                  {item.introduce}
                  {/* {roomList.last_chat} */}
                  <span className="BaseStyle__Notification-sc-1se1zy4-5 dFciPp">1{/* {roomList.not_read_chat} */}</span>
                </p>
              </li>
            )
          })}
      </div>
      <div className="ml-5 w-[63%]">
        {visible ? (
          <MessageModal visible={visible} setVisible={setVisible} rowData={rowData} />
        ) : (
          <div>선택된 채팅방이 없습니다.</div>
        )}
      </div>
    </div>
  )
}

export default MessageContainer
