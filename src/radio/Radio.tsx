import React, { ReactNode, CSSProperties, useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

import './index.scss'

export interface radioProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
  value?: string
  checked?: boolean
  defaultChecked?: boolean
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void
  // 禁用
  disabled?: boolean
  className?: string
  children?: ReactNode
  style?: CSSProperties
}

const Radio = (props: radioProps) => {
  const { disabled, className, children, style, onChange, value, ...rest } = props
  //管理选中状态
  const [checked, setChecked] = useState(false)
  //取input的值
  const inputEl = useRef(null)
  //若有checked属性且不为true，则设置setChecked
  useEffect(() => {
    if ('checked' in props && props.checked !== checked) {
      setChecked(props.checked as boolean)
    }
  }, [props.checked])

  const cls = classNames({
    'ant-radio': true,
    'ant-radio-checked': checked,
    'ant-radio-disabled': disabled,
  })
  //包裹容器属性名
  const wrapperCls = classNames({
    'ant-radio-wrapper': true,
    'ant-radio-wrapper-disabled': disabled,
  })

  const handleClick = (e: any) => {
    //若默认为有disabled或者已经被checked 直接return
    if (disabled || checked) return
    //若无checked属性则设置为true
    if (!('checked ' in props)) {
      setChecked(true)
    }
    //点击时设置onchange，将input的值赋值给e.target
    if (typeof onChange === 'function') {
      e.target = inputEl.current
      onChange(e)
    }
  }
  return (
    <span className={wrapperCls} onClick={handleClick} {...rest}>

      <span className={cls}>
        <input type="radio" className='ant-radio-input' value={value} ref={inputEl} />
        <span className='ant-radio-inner'></span>
      </span>

      <span>{children}</span>
    </span>
  )
}

export default Radio
