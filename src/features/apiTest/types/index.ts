export interface Code {
  list: {
    uid: string
    group_code_id: string
    group_code_name: string
  }[]
  totalRecords: string
}

export interface Error {
  message: string
  status: Number
  // 다른 오류 정보 필드들도 정의해야 합니다.
}
