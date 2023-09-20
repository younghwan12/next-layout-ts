import { ApiTestContainer } from "@/features/apiTest/component"
import { Layout } from "@/layout"
import dynamic from "next/dynamic"

const TestPage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/Layout"))
  return (
    <DynamicLayout>
      <ApiTestContainer />
    </DynamicLayout>
  )
}

export default TestPage
