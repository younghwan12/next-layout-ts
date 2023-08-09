import { TextContainer } from "@/features/text/component"
import { Layout } from "@/layout"
import dynamic from "next/dynamic"

const TreePage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/Layout"))
  return (
    <DynamicLayout>
      <TextContainer />
    </DynamicLayout>
  )
}

export default TreePage
