// import React, { useState } from "react"
// import ReactFlow, { MiniMap, Controls, Background, ReactFlowProvider } from "react-flow-renderer-pro"

// const initialElements = [
//   {
//     id: "1",
//     type: "input",
//     data: { label: "Input Node" },
//     position: { x: 250, y: 5 },
//   },
//   {
//     id: "2",
//     type: "default",
//     data: { label: "Default Node" },
//     position: { x: 100, y: 100 },
//   },
//   {
//     id: "3",
//     type: "output",
//     data: { label: "Output Node" },
//     position: { x: 250, y: 200 },
//   },
// ]

// const DynamicGroupingExample = () => {
//   const [elements, setElements] = useState(initialElements)

//   const onGroupElements = (event, elements) => {
//     const groupNode = {
//       id: "group",
//       type: "group",
//       position: { x: event.clientX, y: event.clientY },
//       data: { label: "Group" },
//       style: { width: 200, height: 200 },
//       children: elements.map((el) => el.id),
//     }

//     setElements((els) => els.concat(groupNode))
//   }

//   return (
//     <div style={{ height: "100vh" }}>
//       <ReactFlowProvider>
//         <ReactFlow elements={elements} onGroupElements={onGroupElements}>
//           <MiniMap />
//           <Controls />
//           <Background />
//         </ReactFlow>
//       </ReactFlowProvider>
//     </div>
//   )
// }

// export default DynamicGroupingExample
