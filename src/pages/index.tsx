import axios from 'axios'
import { useState, useEffect } from 'react'
import Chart from '@/components/organisms/chart'
import styles from '@/styles/Home.module.css'

type PrefecturesResponse = {
  message: null
  result: {
    prefCode: number
    prefName: string
  }[]
}

type PerYearResponse = {
  message: null
  result: {
    data: PerYearContents[]
  }
}

type PerYearContents = {
  label: string
  data: PerYear[]
}

type PerYear = {
  year: number
  value: number
}

export type PrefecturePerYear = {
  prefName: string
  data: PerYear[]
}

export default function Home() {
  const [prefectures, setPreFectures] = useState<PrefecturesResponse | null>(
    null,
  )
  const [perYear, setPerYear] = useState<PerYearResponse | null>(null)
  const Hokkaido = 1

  // 都道府県一覧を取得する
  const getPrefectures = async () => {
    const response = await axios.get('api/getPrefectures')
    // TODO: axios.interceptorsによるエラーハンドリング
    if (response.data?.result) {
      setPreFectures(response.data)
    } else {
      setPreFectures(null)
    }
  }

  // 指定した都道府県の人口構成を取得する
  const getPerYear = async () => {
    const response = await axios.get('api/getPerYear', {
      params: { prefCode: Hokkaido },
    })
    // TODO: axios.interceptorsによるエラーハンドリング
    if (response.data?.result) {
      setPerYear(response.data)
    } else {
      setPerYear(null)
    }
  }

  useEffect(() => {
    getPrefectures()
    getPerYear()
  }, [])

  const chartDataList = (
    perYear: PerYearResponse | null,
  ): PrefecturePerYear[] => {
    const selectedPreName =
      prefectures?.result.find((item) => item.prefCode === Hokkaido)
        ?.prefName || ''
    const perYearData =
      perYear?.result.data.find((item) => item.label === '総人口')?.data || []
    return [
      {
        prefName: selectedPreName,
        data: perYearData?.filter(
          (item) =>
            item.year >= 1970 && item.year % 10 === 0 && item.year <= 2020,
        ),
      },
    ]
  }

  return (
    <>
      <main className={styles.main}>
        <div>
          {prefectures?.result.map((prefecture) => {
            return <span key={prefecture.prefCode}>{prefecture.prefName}</span>
          })}
        </div>
        <div>
          <Chart chartDataList={chartDataList(perYear)} />
        </div>
      </main>
    </>
  )
}
