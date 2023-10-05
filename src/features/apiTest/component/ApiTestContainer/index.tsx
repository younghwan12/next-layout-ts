import React, { useState, useEffect } from "react"
import { useGetCodeListQuery, useLazyGetCodeListQuery } from "../../redux/testApi"
import { Column } from "primereact/column"
import { DataTable } from "primereact/datatable"
import { Button, Form, Select } from "antd"

const ApiTestContainer = () => {
  const { data: initialData } = useGetCodeListQuery({})
  const [keyword, setKeyWord] = useState(null)

  const [getCode] = useLazyGetCodeListQuery()
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    if (initialData) {
      setTableData(initialData.list) // Initialize tableData with initialData if it exists
    }
  }, [initialData])

  const handleFinish = async () => {
    const response = await getCode({ group_code_id: keyword })
    if (response.data) {
      setTableData(response.data.list) // Step 2: Update state with API response data
    }
  }

  const handleChange = (value: string) => {
    setKeyWord(value)
  }

  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(5)
  // 페이징 처리

  const onPageChange = (e) => {
    setFirst(e.first)
    setRows(e.rows)

    console.log("첫 페이지 :", e.first)
    console.log("보여줄 수량:", e.rows)
    // getCdList({
    //   page_startnum: e.first + 1,
    //   page_endnum: e.first + rows,
    // });
  }

  return (
    <>
      <div className="flex nojs">
        <Select
          onChange={handleChange}
          showSearch
          options={[
            {
              value: "",
              label: "전체보기",
            },
            {
              value: "qnaCategory",
              label: "QNA 카테고리",
            },
            {
              value: "goodsCategory",
              label: "상품 카테고리",
            },
            {
              value: "userAuth",
              label: "사용자 권한",
            },
          ]}
        ></Select>
        <Button type="primary" onClick={() => handleFinish()}>
          검색
        </Button>
      </div>
      <DataTable
        value={tableData && tableData}
        showGridlines
        selectionMode={"checkbox"}
        rowHover={true}
        size="small"
        paginator
        rows={rows}
        first={first}
        onPage={onPageChange}
        rowsPerPageOptions={[5, 10, 15]}
      >
        <Column field="group_code_id" header="그룹코드ID"></Column>
        <Column field="group_code_name" header="그룹코드명"></Column>
        <Column field="sub_code_id" header="서브코드ID"></Column>
        <Column field="sub_code_name" header="서브코드명"></Column>
      </DataTable>
    </>
  )
}

export default ApiTestContainer
