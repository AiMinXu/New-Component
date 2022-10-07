// import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from ".";

describe('Button', () => {

  //测试屏幕中是否出现文字
  test('render Button', () => {
    render(<Button>click me</Button>)
    const linkElement = screen.getByText(/click me/i)
    expect(linkElement).toBeInTheDocument()
  })

  test('render normal Button', () => {
    const { container } = render(<Button>click me</Button>)
    expect(container.querySelector('.ant-btn-normal')).toBeInTheDocument()
  })

  test('renders primary Button', () => {
    const { container } = render(<Button type="primary">click me</Button>)

    expect(container.querySelector('.ant-btn-primary')).toBeInTheDocument()
  })

  test('renders small Button', () => {
    const { container } = render(<Button size="small">click me</Button>);

    expect(container.querySelector('.ant-btn-small')).toBeInTheDocument();
  });

  test('should support click', () => {
    //模拟点击事件
    const onClick = jest.fn()

    render(<Button type="primary" onClick={onClick}>click me</Button>)

    const linkElement = screen.getByText(/click me/i)
    fireEvent.click(linkElement)
    expect(onClick).toBeCalled()
  })

  test('should support blur', () => {
    //模拟点击事件
    const onBlur = jest.fn()

    render(<Button type="primary" onBlur={onBlur}>click me</Button>)

    const linkElement = screen.getByText(/click me/i)
    fireEvent.blur(linkElement)
    expect(onBlur).toBeCalled()
  })

  test('should support focus', () => {
    const onFocus = jest.fn();
    render(<Button type="primary" onFocus={onFocus}>click me</Button>);

    const linkElement = screen.getByText(/click me/i);
    fireEvent.focus(linkElement);

    expect(onFocus).toBeCalled();
  });
})
