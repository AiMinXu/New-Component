import React, { ReactNode } from 'react'
import classNames from 'classnames'
import './index.scss'

interface buttonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  className?: string
  type?: 'normal' | "primary" | "danger" | "link" | "text" | "dashed"
  size?: 'small' | 'medium' | 'large'
  children?: ReactNode
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  onBlur?: React.FocusEventHandler<HTMLButtonElement>
  htmlType?: "button" | "submmit" | "reset"
}

const Button = React.forwardRef<HTMLButtonElement, buttonProps>((props: buttonProps, ref) => {

  const { className, type = "normal", size = "medium", children, style, htmlType = 'button', onClick, onBlur, ...rest } = props

  const cls = classNames({
    'ant-btn': true,
    [`ant-btn-${type}`]: type,
    [`ant-btn-${size}`]: size,
    // 取bool
    [className as string]: !!className
  })

  return (
    <button
      {...rest}
      // type={htmlType}
      className={cls}
      ref={ref}
      style={style}
      onClick={onClick}
      onBlur={onBlur}
    // type={type}
    // size={size}
    >
      {children}
    </button>
  )
})

export default Button
