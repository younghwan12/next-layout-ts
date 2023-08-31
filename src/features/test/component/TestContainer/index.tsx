// import { Button } from "primereact/button"
import { Button } from "@/component"
import axios from "axios"
import React, { useEffect, useState } from "react"

const TestContainer = () => {
  const [data, setData] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:12300/api/hello")
      setData(response.data)
      console.log(response)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  return (
    <>
      <Button name="버튼" onClick={fetchData} />
      {data ? <div>{data.name}</div> : null}
      {/* {data ? <p>{data.name}</p> : <p>Loading...</p>} */}
    </>
  )
}

export default TestContainer
