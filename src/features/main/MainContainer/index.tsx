import React, { useState, useRef, useCallback, useEffect } from "react"
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from "reactflow"
import "reactflow/dist/style.css"
import { Button } from "antd"

import { Node } from "@reactflow/core/dist/esm/types/nodes"

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "김삿갓" },
    position: { x: 250, y: 5 },
  },
  // {
  //   id: "2b",
  //   data: { label: "그룹2 구성원" },
  //   position: { x: 400, y: 100 },
  // },
  // {
  //   id: "2c",
  //   data: { label: "그룹2 구성원2" },
  //   position: { x: 350, y: 250 },
  // },
  {
    id: "3",
    type: "default",
    data: { label: "합쳐질놈1" },
    position: { x: 150, y: 150 },
  },
  {
    id: "4",
    type: "default",
    data: { label: "합쳐질놈2" },
    position: { x: 50, y: 450 },
  },
]

let id = 0
const getId = () => `dndnode_${id++}`

const MainContainer = () => {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [])
  const onConnect = useCallback((params) => {
    // 화살표 추가!
    // const arrowHeadType = {
    //   type: "arrow",
    //   color: "#f00",
    // }
    // params.markerEnd = arrowHeadType
    setEdges((eds) => addEdge({ ...params, markerEnd: { type: "arrow", color: "#B1B1B7" } }, eds))
  }, [])

  const [target, setTarget] = useState(null)

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

  // 노드 삭제
  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges)
          const outgoers = getOutgoers(node, nodes, edges)
          const connectedEdges = getConnectedEdges([node], edges)

          const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge))

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
          )

          return [...remainingEdges, ...createdEdges]
        }, edges)
      )
    },
    [nodes, edges]
  )

  const onNodeDragStop = (event, node) => {
    const draggedNodeId = node.id

    // console.log("node", node.type)
    // console.log("target", target?.type)
    if (target && target.id !== draggedNodeId) {
      const newNodes = nodes.filter((n) => n.id !== draggedNodeId && n.id !== target.id)
      const newEdges = edges.filter(
        (e) =>
          e.source !== draggedNodeId && e.target !== draggedNodeId && e.source !== target.id && e.target !== target.id
      )
      const newPosition = {
        x: (node.position.x + target.position.x) / 2,
        y: (node.position.y + target.position.y) / 2,
      }

      if (node?.type === "default") {
        if (target?.type === "default") {
          const newNodeLabel = `${target.data.label} , ${node.data.label}`

          const newNode = {
            id: getId(),
            type: "default",
            position: newPosition,
            data: {
              label: newNodeLabel,
            },
          }

          setNodes([...newNodes, newNode])
        }
      }
      setEdges(newEdges)
    }
    setTarget(null)
  }

  const onNodeDrag = (evt, node) => {
    const centerX = node.position.x + node.width / 2
    const centerY = node.position.y + node.height / 2

    // find a node where the center point is inside
    const targetNode = nodes.find(
      (n) =>
        centerX > n.position.x &&
        centerX < n.position.x + n.width &&
        centerY > n.position.y &&
        centerY < n.position.y + n.height &&
        n.id !== node.id
    )

    setTarget(targetNode)
  }

  useEffect(() => {
    if (nodes) {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === target?.id) {
            // if (target?.type === "default") {
            target.style = { ...target?.style, backgroundColor: "#F3B3B3" }
            // }
          }
          return node
        })
      )
    }

    return () => {
      if (nodes) {
        setNodes((nodes) =>
          nodes.map((node) => {
            if (node.id === target?.id) {
              // 이전 스타일을 복원
              node.style = { ...target?.style, backgroundColor: "#fff" }
            }
            return node
          })
        )
      }
    }
  }, [target])

  return (
    <div className="dndflow">
      <aside style={{ position: "relative" }}>
        <div className="description">데이터 불러오기</div>
        <div className="dndnode input" onDragStart={(event) => onDragStart(event, "input")} draggable>
          시작
        </div>
        <div className="dndnode" onDragStart={(event) => onDragStart(event, "default")} draggable>
          과정
        </div>
        <div className="dndnode output" onDragStart={(event) => onDragStart(event, "output")} draggable>
          마무리
        </div>
        <div className="dndnode group" onDragStart={(event) => onDragStart(event, "group")} draggable>
          그룹
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
            onNodeDragStop={onNodeDragStop}
            onNodeDrag={onNodeDrag}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodesDelete={onNodesDelete}
            // onNodeClick={NodeClick}
          />
        </div>
      </ReactFlowProvider>
    </div>
  )
}

export default MainContainer
