import React, { useState, useRef, useCallback } from "react"
import ReactFlow, { ReactFlowProvider, addEdge, useNodesState, useEdgesState, Controls } from "reactflow"
import "reactflow/dist/style.css"
import { Button } from "antd"

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "input node" },
    position: { x: 250, y: 5 },
  },
]

let id = 0
const getId = () => `dndnode_${id++}`

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const type = event.dataTransfer.getData("application/reactflow")

      if (typeof type === "undefined" || !type) {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })
      const newNode = {
        id: getId(),
        type,
        position,
        // 이름 Drag 가져오는거
        data: { label: `${type} node` },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance]
  )

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject()
      console.log(flow)
    }
  }, [reactFlowInstance])

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <div className="dndflow">
      <aside style={{ position: "relative" }}>
        <div className="description">데이터 불러오기</div>
        <div className="dndnode input" onDragStart={(event) => onDragStart(event, "시작")} draggable>
          시작
        </div>
        <div className="dndnode" onDragStart={(event) => onDragStart(event, "과정")} draggable>
          과정
        </div>
        <div className="dndnode output" onDragStart={(event) => onDragStart(event, "마무리")} draggable>
          마무리
        </div>

        <Button style={{ position: "absolute", left: "5%", bottom: "2%" }} onClick={onSave}>
          저장(콘솔)
        </Button>
      </aside>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
          />
        </div>
      </ReactFlowProvider>
    </div>
  )
}

export default DnDFlow
