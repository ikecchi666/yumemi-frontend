export type PrefecturesEntity = {
  prefCode: number
  prefName: string
}

export type PrefecturesResponseListEntity = {
  message: null
  result: {
    prefCode: number
    prefName: string
  }[]
}

export type PerYearResponseEntity = {
  message: null
  result: {
    data: PerYearContentsEntity[]
  }
}

export type PerYearResponseListEntity = {
  message: null
  result: {
    data: PerYearContentsEntity[]
  }[]
}

export type PerYearContentsEntity = {
  label: string
  data: PerYearEntity[]
}

export type PerYearEntity = {
  year: number
  value: number
}

export type PrefecturePerYearEntity = {
  prefCode: number
  prefName: string
  data: PerYearEntity[]
}
