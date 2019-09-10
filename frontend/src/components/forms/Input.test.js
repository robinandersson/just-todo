import React from 'react';
import Input from './Input';

import { mount, shallow } from 'enzyme';

it('calls onChange', () => {
  const onChangeMock = jest.fn();
  const wrapper = shallow(<Input onChange={onChangeMock} />);

  const event = { target: { value: 'This is just for test' } };

  wrapper.find('input').simulate('change', event);

  expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith({
    target: { value: 'This is just for test' },
  });
});

it('renders text input value based on value prop', () => {
  const onChangeMock = jest.fn();
  const wrapper = mount(<Input onChange={onChangeMock} value="" />);

  expect(wrapper.find('input').props().value).toEqual('');

  // value shouldn't change because of onChange (value should depend on value-prop)
  wrapper.find('input').simulate('change', { target: { value: 'New Value' } });
  expect(wrapper.find('input').props().value).toEqual('');

  wrapper.setProps({ value: 'Value Changed' });
  expect(wrapper.find('input').props().value).toEqual('Value Changed');
});

it('respects disabled prop', () => {
  const wrapper = mount(<Input disabled />);
  expect(wrapper.find('input').props().disabled).toBeTruthy();
});

it('shows lock icon when disabled', () => {
  const wrapper = mount(<Input disabled />);
  const icon = wrapper.find('svg').props();
  expect(icon['data-icon']).toEqual('lock');
});

it('defaults to input type to text', () => {
  const wrapper = mount(<Input />);
  expect(wrapper.find('input').props().type).toEqual('text');
});
