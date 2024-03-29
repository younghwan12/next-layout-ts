import { useModal } from "@/common"
import ChattingTestModal from "@/component/Modal/ChattingModal"
import LoadingDots from "@/component/loading/Loading"
import { useAppSelector } from "@/redux/hooks"
import { Button, Input } from "antd"
import Image from "next/image"
import React, { useState, useEffect, useRef } from "react"
import { io as ClientIO } from "socket.io-client"
const { TextArea } = Input

interface IChatMessage {
  userName: string
  message: string
}

// component
const TestContainer = () => {
  const inputRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [modal] = useModal()

  // const userInfo = useAppSelector((state) => state.login.userInfo)

  const jwt = window.sessionStorage.getItem("jwt")

  useEffect(() => {
    if (jwt) {
      const socket = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL, {
        path: "/api/socket/io",
        addTrailingSlash: false,
      })

      socket.on("connect", () => {
        socket.emit("join_room", userInfo?.id)
        console.log("SOCKET CONNECTED!", socket.id)
      })

      if (socket) return () => socket.disconnect()
    }
  }, [])

  // connected flag

  // init chat and message

  const [userName, setUserName] = useState<string>("")

  const [rowData, setRowData] = useState(null)

  const roomList = [
    {
      identifier: "1-232",
      last_chat: "ㅁㄴㅇ",
      last_read_chat_id: 2970,
      not_read_chat: 0,
      participant: [232],
      room_id: 180,
      room_name: "",
      type: "individual",
      updatedAt: "2023-10-10T02:46:02.000Z",
    },
  ]

  const userList = [
    {
      id: "1",
      user_id: "twice",
      profile_img_url: "/images/twice.jpg",
    },
    {
      id: "2",
      user_id: "ive",
      profile_img_url: "/images/ive.jpg",
    },
  ]

  // {
  //   id: "1",
  //   user_id: "twice",
  //   profile_img_url: "/images/twice.jpg",
  // },
  // {
  //   id: "2",
  //   user_id: "ive",
  //   profile_img_url: "/images/ive.jpg",
  // },

  // dispatch message to other users
  // const sendApiSocketChat = async (chatMessage: IChatMessage): Promise<Response> => {
  //   return await fetch("/api/socket/chat", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(chatMessage),
  //   })
  // }

  // const sendMessage = async () => {
  //   if (messageInput) {
  //     const chatMessage: IChatMessage = {
  //       userName,
  //       message: messageInput,
  //     }

  //     const resp = await sendApiSocketChat(chatMessage)

  //     if (resp.ok) setMessageInput("")
  //   }

  //   ;(inputRef?.current as any).focus()
  // }

  // clident 메시지 전송
  // const onChatSumbmit = (msg: string) => {
  //   const chattingRequset: ChattingRequestDto = {
  //     room_id: chatState.room_id,
  //     type: chatState.type as RoomType,
  //     participant: chatState.participant,
  //     send_user_id: userState.id,
  //     message: msg,
  //     not_read: !isGroup && isMe ? 0 : chatState.participant.length
  //   };
  //   // 채팅방 참여자들에게 해당 메시지를 보냅니다.
  //   authState.socket?.emit('message', chattingRequset);
  // };

  const onDoubleClick = (room: any) => {
    console.log("room", room)
    setRowData(room)
    setVisible(true)
  }

  return (
    <>
      <div className="chat_list jwBxvn">
        {/* <li onDoubleClick={() => onDoubleClick()}>
          <Image src="/images/twice.jpg" width={45} height={45} alt="profile Image"></Image>
          <p className="room-block-top">
            <b>twice</b>
            <span>오전 9:43</span>
          </p>
          <p className="preview">
            ㄴㅁㅇ<span className="BaseStyle__Notification-sc-1se1zy4-5 dFciPp">12</span>
          </p>
        </li>
        <li>
          <Image src="/images/ive.jpg" width={45} height={45} alt="profile Image"></Image>
          <p className="room-block-top">
            <b>ive</b>
            <span>오전 9:43</span>
          </p>
          <p className="preview">
            ㄴㅁㅇ<span className="BaseStyle__Notification-sc-1se1zy4-5 dFciPp">3</span>
          </p>
        </li> */}
        {userList.map((item) => {
          return (
            <li key={item.id} onDoubleClick={() => onDoubleClick(item)}>
              <Image src={`${item.profile_img_url}`} width={45} height={45} alt="profile Image"></Image>
              <p className="room-block-top">
                <b>{item.user_id}</b>
                <span>
                  오전 9:43
                  {/* {roomList.updatedAt} */}
                </span>
              </p>
              <p className="preview">
                ㄴㅁㅇ
                {/* {roomList.last_chat} */}
                <span className="BaseStyle__Notification-sc-1se1zy4-5 dFciPp">3{/* {roomList.not_read_chat} */}</span>
              </p>
            </li>
          )
        })}
        {visible && <ChattingTestModal visible={visible} setVisible={setVisible} rowData={rowData} />}
      </div>
    </>
  )
}

export default TestContainer
