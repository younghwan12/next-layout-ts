import React, { useState, useRef, useCallback } from "react"
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
  {
    id: "2",
    data: { label: "그룹" },
    position: { x: 320, y: 200 },
    type: "group",
  },
  {
    id: "2b",
    data: { label: "그룹2 구성원" },
    position: { x: 100, y: 100 },
    parentNode: "2",
    extent: "parent",
  },
  {
    id: "2c",
    data: { label: "그룹2 구성원2" },
    position: { x: 50, y: 150 },
    parentNode: "2",
    extent: "parent",
  },
]

let id = 0
const getId = () => `dndnode_${id++}`

const DnDFlow = () => {
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

  // const [selectedNodeId, setSelectedNodeId] = useState(null)

  // const NodeClick = (event, node) => {
  //   setSelectedNodeId(node.id)
  // }

  const onNodeDragStop = (event, node) => {
    const draggedNodeId = node.id
    const groupNode = nodes.filter((n) => n.type === "group")

    if (groupNode) {
      // const groupNodePosition = groupNode.position;
      // const draggedNodePosition = node.position;
      // const groupNodeWidth = 200; // 그룹 노드의 너비
      // const groupNodeHeight = 100; // 그룹 노드의 높이

      // const isInsideGroup =
      //   draggedNodePosition.x >= groupNodePosition.x &&
      //   draggedNodePosition.y >= groupNodePosition.y &&
      //   draggedNodePosition.x <= groupNodePosition.x + groupNodeWidth &&
      //   draggedNodePosition.y <= groupNodePosition.y + groupNodeHeight;

      // if (isInsideGroup) {
      // const updatedNodes = nodes.map((n) => {
      //   if (n.id === draggedNodeId) {
      //     return {
      //       ...n,
      //       parentNode: groupNode.id,
      //       extent: 'parent',
      //     };
      //   }
      //   return n;
      //   });

      //   setNodes(updatedNodes);

      console.log("groupNode 입니다", groupNode)
      console.log("움직인 노드 입니다", node)
    }
  }

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

export default DnDFlow
