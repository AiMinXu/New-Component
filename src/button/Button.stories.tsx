import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '.';

export default {
  title: "Button",
  component: Button,

  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({})
Primary.args = {
  type: 'primary',
  children: 'Button',
};

export const Dashed = () => {
  return <Button type='dashed'>Dashed Button</Button>
}

//样式
const style = {
  marginLeft: 8
}

export const Basic = () => {
  return <>
    <Button type="primary">Primary Button</Button>
    <Button style={style}>Default Button</Button>
    <Button type="dashed" style={style}>Dashed Button</Button>
    <br />
    <Button type="text">Text Button</Button>
    <Button type="link" style={style}>Link Button</Button>
    {/* <Button type="link" style={style} >Link Button</Button> */}
  </>
}
