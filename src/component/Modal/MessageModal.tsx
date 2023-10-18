import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import React, { ChangeEvent, FormEvent, KeyboardEvent, useState, useEffect } from "react"
import router from "next/router"
// import { AiOutlineArrowLeft} from 'react-icons/ai'
import { io as ClientIO } from "socket.io-client"
import { useLazyGetMsgListQuery } from "@/features/message/redux/followApi"
import { useAppSelector } from "@/redux/hooks"
import dayjs from "dayjs"
import "dayjs/locale/ko" // 한국어 로케일 추가
import Image from "next/image"

dayjs.locale("ko")
const MessageModal = (props) => {
  // 전달받은 state 함수
  const { visible, setVisible, rowData } = props
  const [message, setMessage] = useState("")
  const userInfo = useAppSelector((state) => state.auth.userInfoDetail)
  const token = useAppSelector((state) => state.auth.loginInfo)
  const [getmessage, { data: msgList }] = useLazyGetMsgListQuery()

  useEffect(() => {
    if (rowData && token && userInfo) {
      getmessage({
        token: token.accessToken,
        uid: userInfo.uid,
        to_user_uid: rowData.follower_uid,
      })
    }
  }, [])

  useEffect(() => {
    if (msgList && msgList.list) {
      var msgTemp = new Array()

      for (var i = 0; i < msgList.list.length; i++) {
        var item = msgList.list[i]

        //router.query.uid === item["creator_uid"] ? "you" : "me";

        var jsonDataItem = {
          yyyymmdd: item["yyyymmdd"],
          youme: userInfo.uid === item["creator_uid"] ? "msg-you" : "msg-me",
          uid: item["uid"],
          creator_uid: item["creator_uid"],
          chat_contents: item["chat_contents"],
          timestamp: dayjs(new Date(item.crtr_dt)).format("a hh:mm"),
        }

        msgTemp.push(jsonDataItem)
      }

      console.log("msgTemp", msgTemp)

      // console.log("msgTemp: ", msgTemp);
      // setMessages(msgTemp);

      //msgGroup - yyyymmdd
      var msgGroupTemp = new Array()

      for (var i = 0; i < msgList.listGroup.length; i++) {
        var item = msgList.listGroup[i]

        var jsonDataItem2 = {
          yyyymmdd: item["yyyymmdd"],
        }

        msgGroupTemp.push(jsonDataItem2)
      }
      // let mg = [];
      const aa = msgGroupTemp?.map((mg: any, idx: any) => {
        return (
          <React.Fragment key={idx}>
            <div className="separator" key={idx}>
              <span className="date">{mg.yyyymmdd}</span>
            </div>
            {msgTemp
              .filter((msg) => msg.yyyymmdd === mg.yyyymmdd)
              .map((message: any, idx: any) => (
                <React.Fragment key={idx}>
                  <div id="" className={`msg ${message.youme}`} key={idx}>
                    {/* 내가 메시지 보낼 때 className="msg msg-me" or you */}
                    <div className="chat-content dm-content">
                      <span className="status">
                        <span className="item-time">{message.timestamp}</span>
                      </span>
                      <div className="txt end">
                        <span>{message.chat_contents}</span>
                      </div>
                      {message.youme == "msg-you" ? (
                        <div className="prf">
                          <Image
                            src={`data:image/jpeg;base64, ${rowData.profileResource}`}
                            alt="프로필"
                            className="rounded-[50%]"
                            width={35}
                            height={35}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </React.Fragment>
              ))}
          </React.Fragment>
        )
      })
      setMessagesGroupBy(aa)
    }
  }, [msgList])

  // Main Message

  // FOoter
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    requestSubmit()
  }

  const onChatSumbmit = (msg: string) => {}

  const onMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    const value = event.target.value
    setMessage(value)
  }

  const onEnterPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    // shift + enter 이면 줄바꿈이 되고, enter키만 누르면 채팅 전송이 됩니다.
    if (!event.shiftKey && event.key === "Enter") {
      event.preventDefault()
      requestSubmit()
    }
  }

  const requestSubmit = () => {
    onChatSumbmit(message)
    setMessage("")
  }

  const [messagesGroupBy, setMessagesGroupBy] = useState([])

  return (
    // 뒷배경을 클릭하면 모달을 나갈 수 있게 해야하므로 뒷 배경 onClick에 state함수를 넣는다.
    // <SearchModalBox onClick={clickModal}>
    <div className="messageRoom_wrapper" onClick={(e) => e.stopPropagation()}>
      {/* <div className="chattingRoom_inner"> */}
      <header className="Header__Wrapper-sc-16ernmy-0 wPmNI">
        <button type="button" onClick={() => setVisible(!visible)}>
          {/* <AiOutlineArrowLeft /> */}
          &lt;
        </button>
        <span>{rowData.nickname}</span>
      </header>
      <main>
        <div className="msg_wrap">{messagesGroupBy}</div>
      </main>
      <footer className="jPLVXV">
        <form onSubmit={onSubmit}>
          <textarea value={message} autoFocus={true} onChange={onMessageChange} onKeyPress={onEnterPress} />
          <button type="submit">전송</button>
        </form>
      </footer>
      {/* </div> */}
    </div>
    // </SearchModalBox>
  )
}

export default MessageModal
