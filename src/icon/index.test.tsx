import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Icon from '.';

describe('组件/Icon', () => {
  test('renders Icon', () => {
    const { container } = render(<Icon type="fixed" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  test('custom className', () => {
    const { container } = render(<Icon type="fixed" className="custom" />);

    expect(container.querySelector('.custom')).toBeInTheDocument();
  });

  test('should support click', () => {
    const onClick = jest.fn();
    const { container } = render(<Icon type="fixed" onClick={onClick} />);

    const linkElement = container.querySelector('svg') as SVGSVGElement;
    fireEvent.click(linkElement);

    expect(onClick).toBeCalled();
  });
});
