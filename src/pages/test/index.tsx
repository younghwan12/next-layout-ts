import { TestContainer } from "@/features/test/component"
import { Layout } from "@/layout"
import dynamic from "next/dynamic"

const TestPage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/Layout"))
  return (
    <DynamicLayout>
      <TestContainer />
    </DynamicLayout>
  )
}

export default TestPage
