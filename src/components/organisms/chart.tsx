import React from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export type PerYear = {
  year: number
  value: number
}

export type PrefecturePerYear = {
  prefName: string
  data: PerYear[]
}

interface ChartProps {
  chartDataList: PrefecturePerYear[]
}

const getLineChartdata = (chartDataList: PrefecturePerYear[]) => {
  const LineChartdata = []
  // 1970年 〜 2020年までを10年ごとに表示
  // TODO: minYear, maxYear化
  for (let year = 1970; year <= 2020; year = year + 10) {
    // 年
    /* eslint @typescript-eslint/no-explicit-any: 0 */
    const PerYear: any = {}
    PerYear.year = year

    chartDataList.map((i) => {
      // 都道府県名
      const prefecture = i.prefName || ''
      // その年の都道府県の人口
      const PerValue = i?.data.find((item) => item.year === year)?.value || 0
      PerYear[prefecture] = PerValue
    })
    LineChartdata.push(PerYear)
  }
  return LineChartdata
}

const Chart = ({ chartDataList }: ChartProps) => (
  <div className="container">
    <LineChart
      width={700}
      height={500}
      data={getLineChartdata(chartDataList)}
      margin={{
        top: 50,
        right: 50,
        left: 50,
        bottom: 50,
      }}
    >
      <Legend />
      <CartesianGrid strokeDasharray="5 1" />
      <XAxis
        dataKey="year"
        label={{ value: '年度', position: 'insideBottomRight' }}
        padding={{ right: 80 }}
      />
      Math.ceil(num/10)) * 10
      <YAxis
        label={{ value: '総人口', position: 'insideTopLeft' }}
        type="number"
        domain={[
          (dataMin: number) => Math.ceil(dataMin / 100000) * 100000 - 100000,
          (dataMax: number) => Math.ceil(dataMax / 100000) * 100000,
        ]}
        tickCount={9}
        padding={{ top: 50 }}
      />
      {chartDataList.map((item) => {
        return (
          <Line
            key="item.prefName"
            type="monotone"
            dataKey={item.prefName}
            stroke="#8884d8"
          />
        )
      })}
      <Tooltip />
    </LineChart>
  </div>
)

export default Chart
