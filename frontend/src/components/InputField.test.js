import React from 'react';
import ReactDOM from 'react-dom';
import InputField from './InputField';

import { mount } from 'enzyme';

it('calls onChange', () => {
  const onChange = jest.fn();
  const wrapper = mount(<InputField onChange={onChange} />);

  wrapper.find('input').simulate('change', { target: { value: 'New Value' } });

  expect(onChange).toHaveBeenCalledTimes(1);
});

it('renders text input value based on value prop', () => {
  const onChange = jest.fn();
  const wrapper = mount(<InputField onChange={onChange} value="" />);

  expect(wrapper.find('input').props().value).toEqual('');

  // value shouldn't change because of onChange (value should depend on value-prop)
  wrapper.find('input').simulate('change', { target: { value: 'New Value' } });
  expect(wrapper.find('input').props().value).toEqual('');

  wrapper.setProps({ value: 'Value Changed' });
  expect(wrapper.find('input').props().value).toEqual('Value Changed');
});

it('respects disabled prop', () => {
  const wrapper = mount(<InputField disabled />);
  expect(wrapper.find('input').props().disabled).toBeTruthy();
});

it('shows lock icon when disabled', () => {
  const wrapper = mount(<InputField disabled />);
  const icon = wrapper.find('svg').props();
  expect(icon['data-icon']).toEqual('lock');
});

it('defaults to text input', () => {
  const wrapper = mount(<InputField />);
  expect(wrapper.find('input').props().type).toEqual('text');
});
