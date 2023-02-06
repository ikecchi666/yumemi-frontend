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
  ${({ theme }) => theme.breakpoint.base`
    cursor: pointer;
    user-select: none;
    font-size: ${theme.fonts.size.xs};
  `}
  ${({ theme }) => theme.breakpoint.sm`
    cursor: pointer;
    margin-left: 16px;
    user-select: none;
    font-size: ${theme.fonts.size.sm};
  `}
`

const CheckBox = styled.input`
  ${({ theme }) => theme.breakpoint.base`
    cursor: pointer;
    margin-right: 6px;
    user-select: none;
    font-size: ${theme.fonts.size.xs};
  `}
  ${({ theme }) => theme.breakpoint.sm`
    cursor: pointer;
    margin-right: 16px;
    user-select: none;
    font-size: ${theme.fonts.size.sm};
  `}
`

const Span = styled.span`
  white-space: nowrap;
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
      <Span>
        <Label htmlFor="check">{label}</Label>
        <CheckBox
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={onChangeCheckBox}
        />
      </Span>
    </>
  )
}

export default CheckBoxItem
