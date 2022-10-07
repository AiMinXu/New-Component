import React, { ReactNode, CSSProperties, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

import './index.scss'
import Radio from './Radio';

export interface radioGroupProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
  value?: string
  defaultValue?: string
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void
  // 禁用
  disabled?: boolean
  className?: string
  children?: ReactNode
  style?: CSSProperties
}

const RadioGroup = (props: radioGroupProps) => {
  const { disabled, className, children, style, onChange, ...rest } = props
  const [value, setValue] = useState(props.defaultValue || props.value)

  const cls = classNames({
    'ant-radio-group': true,
  })

  //点击之后拿到value重新下发
  const handleClick = (e: any) => {
    const value = e.target.value
    setValue(value)
  }

  //将接收的children进行克隆遍历，取出选中状态的，其他设置成disabled
  const newChildren = React.Children.map(children, (child: any) => {
    if (child.type !== Radio) return null//不等于返回空
    return React.cloneElement(child, {
      checked: child.props.value === value,
      // disabled: disabled,--此处不需要设置成disabled
      onChange: handleClick
    })
  })

  return (
    <span className={cls} onClick={handleClick} {...rest} >
      {newChildren}
    </span>
  )
}

export default RadioGroup
