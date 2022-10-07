import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Radio from '.';

export default {
  title: 'Example/Radio',
  component: Radio,
} as ComponentMeta<typeof Radio>;


const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Radio',
};

export const Basic = () => {
  return <>
    <Radio onChange={e => console.log(e)} value="1">Primary Radio</Radio>
  </>
}

//未选中
export const UnChecked = () => {
  return <>
    <Radio checked={false} value="1">Primary Radio</Radio>
  </>
}

export const Disabled = () => {
  return <>
    <Radio disabled value="1">Radio</Radio>
  </>
}
