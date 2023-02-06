import React, {
  useState,
} from 'react'
import styled from 'styled-components'

export interface CheckBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue'> {
  label: string
  onSelectedCheckBox: (prefCode: number) => void
}

const Label = styled.label`
  cursor: pointer;
  margin-left: 6px;
  user-select: none;
`

const CheckBoxItem = (props: CheckBoxProps) => {
  const { id, label, onChange, onSelectedCheckBox, ...rest } = props
  const [isChecked, setIsChecked] = useState(false)

  const onChangeCheckBox = () => {
    setIsChecked((prevState) => !prevState)
    onSelectedCheckBox(Number(id))
  }

  return (
    <>
      <span>
        <Label htmlFor="check">{label}</Label>
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={onChangeCheckBox}
        />
      </span>
    </>
  )
}

export default CheckBoxItem
