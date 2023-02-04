import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type PerYearResponse = {
  message: null
  result: {
    data: PerYearContents[]
  }[]
}

type PerYearContents = {
  label: '総人口'
  data: PerYear[]
}

type PerYear = {
  year: number
  value: number
}

const getPrefectures = async (
  req: NextApiRequest,
  res: NextApiResponse<PerYearResponse>,
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
