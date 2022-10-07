import React, { useEffect, useState, ReactNode, CSSProperties } from 'react';
import classNames from 'classnames';

import './index.scss'

export interface inputProps {
  defaultValue?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;//可输入最大长度
  prefix?: ReactNode;
  suffix?: ReactNode;
  size?: 'small' | 'medium' | 'large';//按钮大小
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  status?: 'error' | 'warning'
}

const Input = (props: inputProps) => {
  const {
    size = 'medium',
    defaultValue,
    value: pvalue,
    onChange,
    children,
    prefix,
    suffix,
    status,
    disabled,
    ...rest } = props

  const [value, setValue] = useState(props.defaultValue || pvalue || '')//设定初始value值
  useEffect(() => {
    // 判断value是不是在props上
    if ('value' in props) {
      if (typeof pvalue === 'undefined') {
        setValue('')
      } else {
        setValue(pvalue)
      }
    }
  }, [pvalue])

  const cls = classNames({
    'ant-input': true,
    'ant-input-lg': size === 'large',
    'ant-input-sm': size === 'small',
    [`ant-input-status-${status}`]: status,
    [`ant-input-disabled`]: disabled,
  })
  const wrapperCls = classNames({
    'ant-input-affix-wrapper': true,
    'ant-input-affix-wrapper-lg': size === 'large',
    'ant-input-affix-wrapper-sm': size === 'small',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 受控处理，不能改
    if (!('value' in props) && !('disabled' in props)) {
      setValue(e.target.value)
    }
    onChange?.(e)
    console.log(e.target.value);
  }
  const input = <input className={cls} value={value} onChange={handleChange} {...rest} />

  if (props.maxLength || prefix || suffix) {
    return (
      <span className={wrapperCls}>
        {
          prefix ? <span className='ant-input-prefix'>{prefix}</span> : null
        }
        {input}
        {
          props.maxLength ? <span className='ant-input-suffix'>
            <span className='ant-input-show-count-suffix'>{value.length} / {props.maxLength}</span>
          </span> : null
        }
        {
          suffix ? <span className='ant-input-suffix'>{suffix}</span> : null
        }
      </span>
    )
  }
  return input
}

export default Input
