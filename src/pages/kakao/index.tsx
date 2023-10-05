import { KakaoHeader, KakaoFooter, KakaoContent } from "@/features/kakao/component"
import dynamic from "next/dynamic"

const KaKaoPage = () => {
  return (
    <div className="ChattingRoomContainer__Wrapper-sc-15hhatf-0 iPohNc">
      <KakaoHeader />
      <KakaoContent />
      <KakaoFooter />
    </div>
  )
}

export default KaKaoPage
