import { Spin } from "antd"
import React, { useEffect, useState } from "react"

function CKEditorComponent({ data, setData, editorLoaded, setEditorLoaded }) {
  const [editorContent, setEditorContent] = useState("")

  useEffect(() => {
    import("@ckeditor/ckeditor5-react")
      .then(({ CKEditor }) => {
        setEditorLoaded(true)
      })
      .catch((error) => {
        console.error("Error loading CKEditor:", error)
      })
  }, [])

  if (!editorLoaded) {
    return <div>불러오는중 입니다..</div>
  }

  const { CKEditor } = require("@ckeditor/ckeditor5-react")
  const Editor = require("ckeditor5-custom-build/build/ckeditor")

  return (
    <div>
      <CKEditor
        editor={Editor}
        data={data}
        onChange={(event, editor) => {
          const data = editor.getData()
          setData(data)
        }}
      />
    </div>
  )
}

export default CKEditorComponent
