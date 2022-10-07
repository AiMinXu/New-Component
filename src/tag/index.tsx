import React, { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import { CloseOutlined } from '@ant-design/icons'
import './index.scss'

interface iconProps extends React.MeterHTMLAttributes<HTMLButtonElement> {
  className?: string;
  closable?: boolean;
  color?: string;
  visiable?: boolean;
  children?: ReactNode
  onClose?: (e: any) => void
  style?: React.CSSProperties
}

const Tag = (props: iconProps) => {
  const { className, closable, color, children, onClose, style: pstyle, ...rest } = props

  const [visiable, setVisiable] = useState(true)
  useEffect(() => {
    if ('visiable' in props && typeof props.visiable !== 'undefined') {
      setVisiable(props.visiable)
    }
  }, [props.visiable])

  //取自定义的颜色
  const customColor = color && color.match(/^#/)
  const cls = classNames({
    'ant-tag': true,
    // !customColor
    [`ant-tag-${color}`]: color && !customColor,
    [className as string]: !!className
  })

  const style = { ...pstyle }
  if (customColor) {
    style.backgroundColor = color
  }

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    typeof onClose === 'function' && onClose(e)

    if (e.defaultPrevented) {
      return
    }
    if (!("visiable" in props)) {
      setVisiable(false)
    }
  }

  if (!visiable) return null
  return (
    <span className={cls} style={style} {...rest}>
      {children}
      {
        closable ? <CloseOutlined onClick={handleClick} /> : null
      }
    </span >
  )
}

export default Tag
