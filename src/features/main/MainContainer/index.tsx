import React, { useState, useRef, useCallback, useEffect } from "react"
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
  Background,
} from "reactflow"
import "reactflow/dist/style.css"
import { Button } from "antd"

import { Node } from "@reactflow/core/dist/esm/types/nodes"
import { useModal } from "@/common"

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: `김삿갓 \n 삿갓삿갓` },
    position: { x: 100, y: 100 },
  },
  {
    id: "3",
    type: "default",
    data: { label: "합쳐질놈1" },
    position: { x: 100, y: 200 },
  },
  {
    id: "4",
    type: "default",
    data: { label: "합쳐질놈2" },
    position: { x: 100, y: 300 },
  },
]

let id = 0
const getId = () => `dndnode_${id++}`

const MainContainer = () => {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [modal, contextHolder] = useModal()

  const onConnect = useCallback((params) => {
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
      const nodeName = event.dataTransfer.getData("application/nodeName")

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
        data: { label: `${nodeName}` },
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

  const onDragStart = (event, nodeType, nodeName) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.setData("application/nodeName", nodeName)
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

    const newNodes = nodes.map((n) => {
      if (n.id === draggedNodeId) {
        return {
          ...n,
          position: {
            x: Math.round(n.position.x / 100) * 100,
            y: Math.round(n.position.y / 100) * 100,
          },
        };
      }
      return n;
  });

  setNodes([...newNodes])

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

      if (node?.type === target?.type) {
        const newNodeLabel = `${target.data.label} \n ${node.data.label}`

        const newNode = {
          id: getId(),
          type: target.type,
          position: newPosition,
          data: {
            label: newNodeLabel,
          },
        }

        setNodes([...newNodes, newNode])
        // }
      } else {
        modal.warning({
          title: "타입을 일치시켜주세요!",
        })
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
            target.style = { ...target?.style, backgroundColor: "#F3B3B3" }
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
        <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, "input", event.currentTarget.innerText)}
          draggable
        >
          시작
        </div>
        <div
          className="dndnode"
          onDragStart={(event) => onDragStart(event, "default", event.currentTarget.innerText)}
          draggable
        >
          과정
        </div>
        <div
          className="dndnode output"
          onDragStart={(event) => onDragStart(event, "output", event.currentTarget.innerText)}
          draggable
        >
          마무리
        </div>
        {/* <div
          className="dndnode group"
          onDragStart={(event) => onDragStart(event, "group", event.currentTarget.innerText)}
          draggable
        >
          그룹
        </div> */}

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
            defaultViewport={{x: 0, y: 0, zoom: 1}}
            // onNodeClick={NodeClick}
          >
            <Background color="#ccc" lineWidth={1} gap={100} variant={'lines'} />
            </ReactFlow>
        </div>
      </ReactFlowProvider>
      {contextHolder}
    </div>
  )
}

export default MainContainer
