import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type Prefectures = {
  prefCode: number
  prefName: string
}

const getPrefectures = async (
  req: NextApiRequest,
  res: NextApiResponse<Prefectures>,
) => {
  const response = await axios.get(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures',
    {
      headers: { 'X-API-KEY': process.env.RESAS_API_KEY },
    },
  )
  res.status(200).json(response.data)
}

export default getPrefectures
