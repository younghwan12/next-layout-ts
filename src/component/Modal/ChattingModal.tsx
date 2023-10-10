import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import { useState } from "react"
import router from "next/router"

const ChattingModal = (props) => {
  // 전달받은 state 함수
  const { visible, setVisible, rowData } = props

  return (
    // 뒷배경을 클릭하면 모달을 나갈 수 있게 해야하므로 뒷 배경 onClick에 state함수를 넣는다.
    // <SearchModalBox onClick={clickModal}>
    <div className="chattingRoom_wrapper" onClick={(e) => e.stopPropagation()}>
      <header className="Header__Wrapper-sc-16ernmy-0 wPmNI">
        <button type="button" onClick={() => setVisible(!visible)}>
          <i className="fas fa-arrow-left" />
        </button>
        <span>{rowData.user_id}</span>
      </header>
    </div>
    // </SearchModalBox>
  )
}

export default ChattingModal
