import { TreeContainer } from "@/features/tree/component"
import dynamic from "next/dynamic"

const TreePage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/Layout"))
  return (
    <DynamicLayout>
      <TreeContainer />
    </DynamicLayout>
  )
}

export default TreePage
