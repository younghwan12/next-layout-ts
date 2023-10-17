import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react"
import router from "next/router"
// import { AiOutlineArrowLeft} from 'react-icons/ai'
import { io as ClientIO } from "socket.io-client"

const ChattingModal = (props) => {
  // 전달받은 state 함수
  const { visible, setVisible, rowData } = props
  const [message, setMessage] = useState("")

  // Main Message

  // FOoter
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    requestSubmit()
  }

  const onChatSumbmit = (msg: string) => {
    const socket = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    })
    const chattingRequset = {
      message: msg,
    }
    socket?.emit("send_msg", chattingRequset)
  }

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

  return (
    // 뒷배경을 클릭하면 모달을 나갈 수 있게 해야하므로 뒷 배경 onClick에 state함수를 넣는다.
    // <SearchModalBox onClick={clickModal}>
    <div className="chattingRoom_wrapper" onClick={(e) => e.stopPropagation()}>
      {/* <div className="chattingRoom_inner"> */}
      <header className="Header__Wrapper-sc-16ernmy-0 wPmNI">
        <button type="button" onClick={() => setVisible(!visible)}>
          {/* <AiOutlineArrowLeft /> */}
          &lt;
        </button>
        <span>{rowData.user_id}</span>
      </header>
      <main></main>
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

export default ChattingModal
