import React, { ReactNode, CSSProperties, useState, useEffect } from 'react';
import classNames from 'classnames';

import './index.scss'

export interface switchProps {
  size?: 'small' | 'medium'
  className?: string
  checked?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  onChange?: (checked: boolean) => void
  onClick?: Function
  checkedChildren?: ReactNode
  unCheckedChildren?: ReactNode
  children?: ReactNode
  style?: CSSProperties
}

const Switch = (props: switchProps) => {
  const { className, defaultChecked, checked: pchecked, children, size = 'medium', disabled, onChange, onClick, checkedChildren, unCheckedChildren, style: pstyle, ...rest } = props
  const [checked, setChecked] = useState(false || defaultChecked || pchecked)
  const cls = classNames('ant-switch', className, {
    'ant-switch-checked': checked,
    'ant-switch-disabled': disabled,
  })
  useEffect(() => {
    if ('checked' in props) {
      setChecked(pchecked);
    }
  }, [pchecked])
  //受控
  const handleClick = () => {
    if (props.disabled === true) return

    if (!('checked' in props)) {
      setChecked(!checked)
    }
    onChange?.(!checked)
  }
  return (
    <button className={cls} type='button' role='switch' aria-checked='true' onClick={handleClick} {...rest}>
      <div className='ant-switch-handle'></div>
      <span className='ant-switch-inner'>
        {checked ? checkedChildren : unCheckedChildren}
      </span>
    </button>
  )
}

export default Switch
