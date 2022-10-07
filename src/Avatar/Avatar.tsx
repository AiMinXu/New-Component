import React, { ReactNode, CSSProperties, useRef, useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import './index.scss';

import ResizeObserver from 'resize-observer-polyfill';


type sizeType = number | 'small' | 'medium' | 'large';
export interface avatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: sizeType
  shape?: 'circle' | 'square';
  src?: string | ReactNode;
  className?: string;
  icon?: React.ReactNode;
  gap?: number;
  children?: ReactNode;
  style?: CSSProperties;
}

const Avatar = (props: avatarProps) => {
  const {
    size = 'medium',
    shape = 'circle',
    src,
    icon,
    gap,
    children,
    ...others
  } = props;
  //记录缩放的倍数
  const [scale, setScale] = useState(1)
  //文字ref
  const textRef = useRef(null)
  //外层容器ref
  const wrapperRef = useRef(null)

  useEffect(() => {
    const textnode: any = textRef.current
    const wrapperNode: any = wrapperRef.current
    if (!textnode || !wrapperNode) return
    const reRender = () => {
      const wrapperWidth = wrapperNode.offsetWidth
      const textWidth = textnode.offsetWidth;
      const gap = 4
      //文字比较小时就不缩放
      const scale = wrapperWidth - gap * 2 < textWidth ? (wrapperWidth - gap * 2) / textWidth : 1;
      setScale(scale)
    }
    const ob = new ResizeObserver(reRender)
    ob.observe(textnode)
  }, [])

  //方法二：定义在callback中
  // const textRefCb = useCallback((node) => {
  //   if (!node) return
  //   const reRender = () => {
  //     const wrapperNode: any = wrapperRef.current
  //     if (!node || !wrapperNode) return
  //     const wrapperWidth = wrapperNode.offsetWidth
  //     const textWidth = node.offsetWidth;
  //     const gap = 4
  //     //文字比较小时就不缩放
  //     const scale = wrapperWidth - gap * 2 < textWidth ? (wrapperWidth - gap * 2) / textWidth : 1;
  //     setScale(scale)
  //   }

  //   const ob = new ResizeObserver(reRender)
  //   ob.observe(node)
  // }, [])
  const wrapperStyle = (typeof size === "number") ? {
    width: size,
    height: size,
    lineHeight: `${size}px`,
    fontSize: size / 2,
  } : props.style

  const textStyle = {
    lineHeight: `${size}px`,
    transform: `scale(${scale}) translateX(-50%)`
  }
  const cls = classNames({
    'ant-avatar': true,
    'ant-avatar-lg': size === 'large',
    'ant-avatar-sm': size === 'small',
    'ant-avatar-icon': icon,
    'ant-avatar-image': src,
    [`ant-avatar-${shape}`]: shape,
  })
  return (
    <span className={cls} {...others} style={wrapperStyle} ref={wrapperRef}>
      {icon ? icon : null}
      {src ? (typeof src === 'string' ? <img src={src} /> : src) : null}
      {children ? (typeof children === "string" ? <span style={textStyle} ref={textRef} className="ant-avatar-string">{children}</span> : children) : null}
    </span>
  )
}

export default Avatar
