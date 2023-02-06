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
  prefCode: number
  prefName: string
  data: PerYear[]
}

interface ChartProps {
  chartData: any[]
  chartDataList: PrefecturePerYear[]
}

const Chart = ({ chartData, chartDataList }: ChartProps) => {
  if (chartData.length && Object.keys(chartData[0]).length > 1) {
    return (
      <div className="container">
        <LineChart
          id="chart"
          width={700}
          height={500}
          data={chartData}
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
              (dataMin: number) =>
                Math.ceil(dataMin / 100000) * 100000 - 100000,
              (dataMax: number) => Math.ceil(dataMax / 100000) * 100000,
            ]}
            tickCount={9}
            padding={{ top: 50 }}
          />
          {chartDataList.map((item) => {
            return (
              <Line
                key={item.prefName}
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
  } else {
    return <div>ここにチャートが表示されるよ</div>
  }
}

export default Chart
