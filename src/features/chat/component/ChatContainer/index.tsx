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
const ChatContainer = () => {
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
      <div className="flex items-center p-4 mx-auto min-h-screen justify-center">
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
    <div>
      <div className="chat_wrap">
        {chatMessages.length ? (
          chatMessages.map((chatMessage, i) => (
            <div key={"msg_" + i} className="chat">
              <span className={chatMessage.userName === userName ? `chat_me` : `text-slate-800 dark:text-slate-200`}>
                {chatMessage.userName === userName ? "[나]" : `[${chatMessage.userName}]`}
              </span>{" "}
              {chatMessage.message}
            </div>
          ))
        ) : (
          <div className="text-sm text-center text-gray-600 dark:text-gray-400 py-6">No chat messages</div>
        )}
      </div>
      <div className="">
        <TextArea
          ref={inputRef}
          rows={4}
          value={messageInput}
          placeholder={connected ? "Type a message..." : "Connecting..."}
          className="w-full h-full rounded shadow border px-2 border-gray-600 dark:border-gray-400 text-black dark:text-white"
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
        <Button
          onClick={() => {
            sendMessage()
          }}
          disabled={!connected}
        >
          보내기
        </Button>
      </div>
    </div>
  )
}

export default ChatContainer
