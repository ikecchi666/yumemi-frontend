import React from 'react'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import styled from 'styled-components'

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

const Box = styled.div`
  ${({ theme }) => theme.breakpoint.base`
    height: 500px;
    width: 370px;
    font-size: ${theme.fonts.size.xs};
  `}
  ${({ theme }) => theme.breakpoint.sm`
    height: 500px;
    width: 620px;
    font-size: ${theme.fonts.size.sm};
  `}
`

const Chart = ({ chartData, chartDataList }: ChartProps) => {
  if (chartData.length && Object.keys(chartData[0]).length > 1) {
    return (
        <Box>
        <ResponsiveContainer>
        <LineChart
          id="chart"
          width={700}
          height={500}
          data={chartData}
          margin={{
            top: 48,
            right: 16,
            left: 24,
            bottom: 16,
          }}
        >
          <Legend />
          <CartesianGrid strokeDasharray="5 1" />
          <XAxis
            dataKey="year"
            label={{ value: '年度', position: 'insideBottomRight' }}
            padding={{ right: 65 }}
          />
          <YAxis
            label={{ value: '総人口', position: 'insideTopLeft' }}
            type="number"
            domain={[
              (dataMin: number) =>
                Math.ceil(dataMin / 100000) * 100000 - 100000,
              (dataMax: number) => Math.ceil(dataMax / 100000) * 100000,
            ]}
            tickCount={9}
            padding={{ top: 30 }}
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
        </ResponsiveContainer>
        </Box>
    )
  } else {
    return <div>ここにチャートが表示されるよ</div>
  }
}

export default Chart
