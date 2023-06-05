import { arrayToTree } from "@/common/utils/treeUtil/arrayToTree"
import React, { useEffect, useState } from "react"
import { TreeTable } from "primereact/treetable"
import { Column } from "primereact/column"

interface TreeItem extends treeType {
  children?: TreeItem[]
}

interface treeType {
  key: string
  parent_key: string
  data: {
    name: string
    size: string
    type: string
  }
}
const dummyData: treeType[] = [
  {
    key: "1",
    parent_key: "0",
    data: {
      name: "React",
      size: "25kb",
      type: "Folder",
    },
  },

  {
    key: "1.1",
    parent_key: "1",
    data: {
      name: "React1",
      size: "25kb",
      type: "Fol123der",
    },
  },
  {
    key: "1.1.1",
    parent_key: "1.1",
    data: {
      name: "React23",
      size: "2544kb",
      type: "dsdd",
    },
  },
  {
    key: "1.1.2",
    parent_key: "1.1",
    data: {
      name: "dsczx",
      size: "25123kb",
      type: "Focddder",
    },
  },
  {
    key: "1.2",
    parent_key: "1",
    data: {
      name: "React",
      size: "25kb",
      type: "Folder",
    },
  },
  {
    key: "1.2.1",
    parent_key: "1.2",
    data: {
      name: "React",
      size: "25kb",
      type: "Folder",
    },
  },
  {
    key: "1.2.2",
    parent_key: "1.2",
    data: {
      name: "React",
      size: "25kb",
      type: "Folder",
    },
  },
]

const TreeContainer = () => {
  const [treeData, setTreeData] = useState<TreeItem[]>(dummyData)
  useEffect(() => {
    if (dummyData && dummyData.length > 0) {
      const treeData = arrayToTree(dummyData, {
        id: "key",
        parentId: "parent_key",
        dataField: null,
        rootParentIds: { [String(dummyData[0].parent_key)]: true },
      })
      setTreeData(treeData as TreeItem[])
    }
  }, [dummyData])

  useEffect(() => {
    if (treeData) {
      console.log(treeData)
    }
  }, [treeData])

  return (
    <>
      <TreeTable value={treeData} tableStyle={{ minWidth: "50rem" }}>
        <Column field="name" header="이름" expander></Column>
        <Column field="size" header="사이즈"></Column>
        <Column field="type" header="타입"></Column>
      </TreeTable>
    </>
  )
}

export default TreeContainer
