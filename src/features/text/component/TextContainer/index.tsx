import { Button, Spin } from "antd"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import { TextEditor } from ".."

const TextContainer = () => {
  const [data, setData] = useState("")
  const [editorLoaded, setEditorLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault()
      e.returnValue = "" // 필요한 경우 빈 문자열을 반환하여 브라우저에 확인 메시지를 표시합니다.
    }

    const handlePopState = (e) => {
      const confirmed = window.confirm("변경된 내용이 있습니다. 페이지를 떠나시겠습니까?")
      if (!confirmed) {
        // 취소를 클릭한 경우 페이지 이동을 막지 않고 그대로 유지합니다.
        router.push("/text")
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  const handleNavigation = () => {
    const confirmed = window.confirm("변경된 내용이 있습니다. 페이지를 떠나시겠습니까?")
    if (confirmed) {
      router.push("/") // 실제로 페이지 이동
    }
  }

  return (
    <Spin spinning={!editorLoaded}>
      <Button onClick={() => console.log(data)}>데이터 확인</Button>
      <TextEditor data={data} setData={setData} editorLoaded={editorLoaded} setEditorLoaded={setEditorLoaded} />
      <Button onClick={handleNavigation}>다른 페이지로 이동</Button>
    </Spin>
  )
}

export default TextContainer
