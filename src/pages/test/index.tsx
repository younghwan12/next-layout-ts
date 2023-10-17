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

// export async function getServerSideProps(context) {
//   console.log(context.req.cookies.jwt, "모가있을까요?")
//   const token = context.req.cookies.jwt

//   if (!token) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {},
//   }
// }
