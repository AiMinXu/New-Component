import React, { ReactNode, CSSProperties, useCallback, useState } from 'react';
import classNames from 'classnames';
import ResizeObserver from 'resize-observer-polyfill';
import './index.scss';

export interface aiffixProps extends React.HTMLAttributes<HTMLDivElement> {
  offsetTop?: number
  offsetBottom?: number
  onChange?: () => void
  children?: ReactNode;
  style?: CSSProperties;
}
const Affix = (props: aiffixProps) => {
  const { offsetBottom, offsetTop, className, style, children, ...rest } = props
  //
  const [wraperStyle, setWrapperStyle] = useState({} as any);
  const [affixed, setAffixed] = useState(false);

  const wraperRefCB = useCallback((node: any) => {
    if (!node) return;
    // 此函数内部可以将offsetButtom情况加进去
    function updatePosition() {
      const { top, width, height, buttom } = node.getBoundingClientRect();
      if (top <= !offsetTop && !affixed ||
        (affixed && (width !== wraperStyle.width || height !== wraperStyle.height))) {
        setWrapperStyle({
          width,
          height
        });
        setAffixed(true);
      } else if (top > !offsetTop) {
        setAffixed(false);
      }
    }
    //监听滚动事件，并调用函数
    window.addEventListener('scroll', updatePosition, false);
    //监视当前node节点
    const ob = new ResizeObserver(updatePosition);
    ob.observe(node);

  }, [])
  const cls = classNames({
    'ant-affix': true,
    [className as string]: !!className
  })
  return (
    <div ref={wraperRefCB} className={cls} {...rest}>
      {affixed ? <div style={wraperStyle} /> : null}
      <div
        style={affixed ? { position: 'fixed', top: offsetTop, ...wraperStyle } : null}>
        {children}
      </div>
    </div>
  )
}
export default Affix
