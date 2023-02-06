import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { PerYearResponseListEntity } from '@/type/prefecturePeople'

const getPrefectures = async (
  req: NextApiRequest,
  res: NextApiResponse<PerYearResponseListEntity>,
) => {
  const response = await axios.get(
    'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear',
    {
      params: { prefCode: req.query.prefCode, cityCode: '-' },
      headers: { 'X-API-KEY': process.env.RESAS_API_KEY },
    },
  )
  res.status(200).json(response.data)
}

export default getPrefectures
