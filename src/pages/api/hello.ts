// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  name: string
}

interface DataType {
  name: string
  type: string
}

const items: DataType[] = [
  {
    name: "John Doe",
    type: "Person",
  },
]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data[]>) {
  res.status(200).json(items)
}
