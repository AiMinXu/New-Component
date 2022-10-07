import React, { useEffect, useState, useRef, ReactNode, CSSProperties } from 'react';
import classNames from 'classnames';

import './index.scss';

type autoSizeType = {
  minRows: number;
  maxRows: number;
}

export interface inputProps {
  defaultValue?: string;
  value?: string;
  onChange?: (event: React.FormEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxLength?: number;
  showCount?: boolean;
  autoSize?: boolean | autoSizeType;
  prefix?: ReactNode;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  status?: 'error' | 'warning',
}

const hiddenStyle: CSSProperties = {
  visibility: 'hidden',
  position: 'absolute',
  zIndex: '-1000',
  top: '-1000px',
  overflowY: 'hidden',
  left: 0,
  right: 0,
};

const TextArea = (props: inputProps) => {
  const {
    defaultValue,
    value: pvalue,
    onChange,
    children,
    prefix,
    showCount = false,
    autoSize = false,
    status,
    ...others
  } = props;

  const [value, setValue] = useState(defaultValue || pvalue || '');
  const [height, setHeight] = useState(0);
  const textareaRef: any = useRef(null);//异步获取的textareaRef
  const fakeRef: any = useRef(null)

  React.useEffect(() => {
    //挂载之后进行操作
    if (typeof autoSize === 'object') {
      const { minRows, maxRows } = autoSize;
      const fakeNode = fakeRef.current
      // 利用rows属性进行操作,将影子元素的高度设置给页面元素
      fakeNode.setAttribute('rows', minRows)
      const minHeight = fakeNode.clientHeight;//页面高度
      fakeNode.setAttribute('rows', maxRows)
      const maxHeight = fakeNode.clientHeight;//页面高度

      textareaRef.current.setAttribute('style',
        `min-height: ${minHeight}px; max-height: ${maxHeight}px;`
      )
    }

  }, [])

  useEffect(() => {
    if ('value' in props) {
      setValue(pvalue as string);
    }
  }, [pvalue])

  const cls = classNames({
    'ant-input': true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!('value' in props)) {
      const value = e.target.value;
      setValue(value);

      //自动高度
      if (autoSize) {
        const fakeNode = fakeRef.current
        fakeNode.value = value
        const height = fakeNode.scrollHight//将滚动的高度设给当前节点
        setHeight(height)
      }
    }
    onChange?.(e);
  }

  const wrapperCls = classNames({
    'ant-input-textarea': true,
    'ant-input-textarea-show-count': showCount,
  });


  const style: CSSProperties = {};
  if (height) {
    style.height = height;
  }

  const textarea = <textarea
    {...others}
    className={cls}
    value={value}
    onChange={handleChange}
    ref={textareaRef}
    style={style}
  />;

  //若有showCount属性则
  if (props.showCount) {
    return <span className={wrapperCls} data-count={`${value.length} / ${props.maxLength}`}>
      {textarea}
    </span>
  }

  return <>
    {textarea}
    {
      autoSize ? <textarea className={cls} style={hiddenStyle} ref={fakeRef} dada-fake /> : null
    }
  </>
}

export default TextArea;
