import axios from 'axios'
import { useState, useEffect } from 'react'
import CheckBoxItem from '@/components/molecules/CheckBoxItem'
import Chart from '@/components/organisms/chart'
import styles from '@/styles/Home.module.css'
import { PerYearResponseEntity, PrefecturePerYearEntity, PrefecturesResponseListEntity } from '@/type/prefecturePeople'

const emptyChartData = [
  { year: 1970 },
  { year: 1980 },
  { year: 1990 },
  { year: 2000 },
  { year: 2010 },
  { year: 2020 },
]

export default function Home() {
  const [prefectures, setPreFectures] = useState<PrefecturesResponseListEntity | null>(
    null,
  )
  const [chartDataList, setChartDataList] = useState<PrefecturePerYearEntity[] | []>(
    [],
  )
  const [selectedPreCodes, setSelectedPreCodes] = useState<number[] | []>([])
  const [selectedPreCode, setSelectedPreCode] = useState<number>(0)
  const [chartData, setChartData] = useState<any[]>(emptyChartData)

  // API: 都道府県一覧を取得する
  const getPrefectures = async () => {
    const response = await axios.get('api/getPrefectures')
    if (response.data?.result) {
      setPreFectures(response.data)
    } else {
      setPreFectures(null)
    }
  }

  // ページの初期表示時に都道府県一覧を表示
  useEffect(() => {
    getPrefectures()
  }, [])

  const formatChartData = (perYear: PerYearResponseEntity) => {
    // レスポンスから必要なデータを抜き出す
    const selectedPreName =
      prefectures?.result.find((item) => item.prefCode === selectedPreCode)
        ?.prefName || ''
    const perYearData =
      perYear?.result.data.find((item) => item.label === '総人口')?.data || []
    const prefecturePerYearListItem = {
      prefCode: selectedPreCode,
      prefName: selectedPreName,
      data: perYearData?.filter(
        (item) =>
          item.year >= 1970 && item.year % 10 === 0 && item.year <= 2020,
      ),
    }
    // チャートに出力するデータをセット
    const prefecturePerYearList = chartDataList.concat()
    prefecturePerYearList.push(prefecturePerYearListItem)
    setChartDataList(prefecturePerYearList)

    // チャートに出力可能な形に加工
    // 例) [{
    //   year: 1970,
    //   '北海道': 5000000,
    //   '青森': 60000000,
    // }]
    const inputChartData = chartData.concat()
    // 必要年度分ループ
    inputChartData.map((item) => {
      const prefecturePerYear = prefecturePerYearListItem.data.find(
        (i) => i.year === item.year,
      )
      item[selectedPreName] = prefecturePerYear?.value
      return item
    })
    setChartData(inputChartData)
  }

  // チェックボックスに変更があった際にデータを取得し、チャートに表示
  useEffect(() => {
    if (!selectedPreCode) return
    if (chartDataList?.find((item) => item.prefCode === selectedPreCode)) {
      // 既に選択済の場合は取得リストから除く
      setChartDataList(
        chartDataList.filter((item) => !(item.prefCode === selectedPreCode)),
      )
    } else {
      // 未選択の場合はAPIから人口構成を取得
      // API: 指定した都道府県の人口構成を取得する
      axios
        .get('api/getPerYear', {
          params: { prefCode: selectedPreCode },
        })
        .then((response) => {
          if (response.data?.result) {
            const perYear: PerYearResponseEntity = response.data
            formatChartData(perYear)
          }
        })
    }
  }, [selectedPreCodes])

  // チェックボックスのOnChangeイベント
  const onSelectedCheckBox = (prefCode: number) => {
    const selectedPreCodesList = selectedPreCodes.concat()
    selectedPreCodesList.push(prefCode)
    setSelectedPreCode(prefCode)
    setSelectedPreCodes(selectedPreCodesList)
  }

  return (
    <>
      <main className={styles.main}>
        <div>
          {prefectures?.result.map((prefecture) => {
            return (
              <CheckBoxItem
                key={prefecture.prefCode}
                id={String(prefecture.prefCode)}
                label={prefecture.prefName}
                onSelectedCheckBox={onSelectedCheckBox}
              />
            )
          })}
        </div>
        <div>
          <Chart chartData={chartData} chartDataList={chartDataList} />
        </div>
      </main>
    </>
  )
}
