import { Button, Spin } from "antd"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import { TextEditor } from ".."
import { useModal } from "@/common"

const TextContainer = () => {
  const modal = useModal()
  const [data, setData] = useState("")
  const [editorLoaded, setEditorLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedData = localStorage.getItem("draftData")
    if (savedData) {
      setData(savedData)
    }
  }, [])

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault()
      e.returnValue = ""
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  const handleNavigation = (newPath) => {
    // 다음과 같이 히스토리에 추가할 수 있습니다.
    window.history.pushState({}, "", newPath)
    router.push(newPath)
  }

  // useEffect(() => {
  //   const handleBeforePopState = (event) => {
  //     event.preventDefault()
  //     const isConfirmed = confirm("뒤로가시겠습니까?")
  //     if (isConfirmed) {
  //       router.back()
  //     } else {
  //       router.reload()
  //     }
  //   }

  //   window.addEventListener("popstate", handleBeforePopState)
  //   return () => {
  //     window.removeEventListener("popstate", handleBeforePopState)
  //   }
  // }, [router])

  useEffect(() => {
    const handleBeforePopState = (event) => {
      event.preventDefault()
      const isConfirmed = confirm("뒤로 가시겠습니까?")

      if (isConfirmed) {
        router.back()
      } else {
        router.push("/text")
      }
    }

    window.addEventListener("popstate", handleBeforePopState)

    return () => {
      window.removeEventListener("popstate", handleBeforePopState)
    }
  }, [router])

  return (
    // <Spin spinning={!editorLoaded}>
    <>
      <Button onClick={() => console.log(data)}>데이터 확인</Button>
      <TextEditor data={data} setData={setData} editorLoaded={editorLoaded} setEditorLoaded={setEditorLoaded} />
      <Button onClick={() => handleNavigation("/")}>다른 페이지로 이동</Button>
    </>
    // </Spin>
  )
}

export default TextContainer
