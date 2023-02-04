import axios from 'axios'
import { useState, useEffect } from 'react'
import styles from '@/styles/Home.module.css'

type PrefecturesResponse = {
  message: null
  result: {
    prefCode: number
    prefName: string
  }[]
}

export default function Home() {
  const [prefectures, setPreFectures] = useState<PrefecturesResponse | null>(
    null,
  )

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

  useEffect(() => {
    getPrefectures()
  }, [])

  return (
    <>
      <main className={styles.main}>
        <div>
          {prefectures?.result.map((prefecture) => {
            return <span key={prefecture.prefCode}>{prefecture.prefName}</span>
          })}
        </div>
      </main>
    </>
  )
}
