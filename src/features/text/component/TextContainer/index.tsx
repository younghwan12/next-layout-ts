import { Button } from 'antd'
import React, { useState, useEffect } from 'react'
import { TextEditor } from '..';
// import TextEditor from '@/component/TextEditor'

const TextContainer = () => {
  const [data, setData] = useState('');

  return (
    <div>
        <Button onClick={() => console.log(data)}>데이터 확인</Button>
        {/* <TextEditor data={data} setData={setData} /> */}
        <TextEditor data={data} setData={setData} />
    </div>
  )
}

export default TextContainer