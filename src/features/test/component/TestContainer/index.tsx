import LoadingDots from "@/component/loading/Loading"
import { Button, Input } from "antd"
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

  // connected flag
  const [connected, setConnected] = useState<boolean>(false)

  // init chat and message
  const [chatMessages, setChatMessages] = useState<IChatMessage[]>([])
  const [messageInput, setMessageInput] = useState<string>("")
  const [userNameInput, setUserNameInput] = useState<string>("")
  const [userName, setUserName] = useState<string>("")

  // dispatch message to other users
  const sendApiSocketChat = async (chatMessage: IChatMessage): Promise<Response> => {
    return await fetch("/api/socket/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chatMessage),
    })
  }

  const sendMessage = async () => {
    if (messageInput) {
      const chatMessage: IChatMessage = {
        userName,
        message: messageInput,
      }

      const resp = await sendApiSocketChat(chatMessage)

      if (resp.ok) setMessageInput("")
    }

    ;(inputRef?.current as any).focus()
  }

  const sendEnterRoomMessage = async () => {
    const chatMessage: IChatMessage = {
      userName: "Bot",
      message: `${userName}님이 방에 입장하셨습니다.`,
    }

    const resp = await sendApiSocketChat(chatMessage)
    if (!resp.ok) {
      setTimeout(() => {
        sendEnterRoomMessage()
      }, 500)
    }
  }

  useEffect((): any => {
    if (userName) {
      sendEnterRoomMessage()
    }
  }, [userName])

  useEffect((): any => {
    const socket = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    })

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id)
      setConnected(true)
    })

    // update chat on new message dispatched
    socket.on("message", (message: IChatMessage) => {
      chatMessages.push(message)
      setChatMessages([...chatMessages])
    })

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect()
  }, [])

  if (!connected) {
    return <LoadingDots />
  }

  if (!userName) {
    return (
      <div className="flex items-center p-4 mx-auto justify-center">
        <div className="gap-4 flex flex-col items-center justify-center w-full h-full">
          <div className="bg-slate-50 dark:bg-slate-950 p-4 h-20">
            <Input
              value={userNameInput}
              disabled={!connected}
              onChange={(e) => setUserNameInput(e.target.value)}
              placeholder={connected ? "이름" : "Connecting..."}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  setUserName(userNameInput)
                }
              }}
            />
            <Button
              onClick={() => {
                setUserName(userNameInput)
              }}
              disabled={!connected}
            >
              입장하기
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="msg-wrapper scrollbar-container">
        {chatMessages.length ? (
          chatMessages
            .map((chatMessage, i) => (
              <article className="lkFPuq">
                <div key={"msg_" + i} className="msg-container">
                  <div>
                    <span className={chatMessage.userName === userName ? `logged-user msg-text` : `msg-text`}>
                      {chatMessage.userName === userName ? "[나]" : `[${chatMessage.userName}]`}
                      {chatMessage.message}
                    </span>
                  </div>
                </div>
              </article>
            ))
            .reverse()
        ) : (
          <div className="">메세지가 없습니다.</div>
        )}
      </div>
      <div>
        <div className="chat_text">
          <div className="flex"></div>
          <TextArea
            ref={inputRef}
            value={messageInput}
            placeholder={connected ? "메시지 입력..." : "연결중입니다.."}
            disabled={!connected}
            onChange={(e) => {
              setMessageInput(e.target.value)
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                sendMessage()
              }
            }}
          />
        </div>
      </div>
    </>
  )
}

export default TestContainer
