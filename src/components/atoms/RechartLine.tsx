import React from 'react'
import { Line } from 'recharts'

interface RechartLineProps {
  dataKey: string
}

const RechartLine = ({ dataKey }: RechartLineProps) => (
  <>
    <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
  </>
)

export default RechartLine
