import { MainContainer } from "@/features/main"
import dynamic from "next/dynamic"

const MainPage = () => {
  const DynamicLayout = dynamic(() => import("@/layout/Layout"))
  return (
    <DynamicLayout>
      <MainContainer />
    </DynamicLayout>
  )
}

export default MainPage
