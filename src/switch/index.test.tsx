import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Switch from '.'

describe('Switch', () => {
  test('shoud support under control', () => {
    const onChange = jest.fn()
    render(<Switch checked data-testid='t2' onChange={onChange} />)

    const Element = screen.getByTestId('t2')
    expect(Element.getAttribute('class')).toBe('ant-switch ant-switch-checked')

    fireEvent.click(Element, {})
    expect(onChange).toBeCalledTimes(1)
    expect(Element.getAttribute('class')).not.toBe('disabled')
  })
})
