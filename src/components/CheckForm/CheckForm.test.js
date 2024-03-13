import React from 'react';
import { shallow } from 'enzyme';
import CheckForm from './CheckForm';

describe('CheckForm Component', () => {
	let wrapper;
	const prop = {
		change: jest.fn(),
	};

	beforeEach(() => {
		wrapper = shallow(<CheckForm {...prop} />);
	});

	it('renders', () => {
		expect(wrapper).not.toBeNull();
	});

	it('should update the address', () => {
		const address = wrapper.find('#address');
		address.simulate('change', {
			target: {
				name: 'address',
				value: '0x1010101010101010101010101010101010101010101010101010101010101010',
			},
		});
		expect(wrapper.find('#address').props().value).toEqual(
			'0x1010101010101010101010101010101010101010101010101010101010101010'
		);
	});

	it('should call change', () => {
		wrapper.find('button').simulate('click');
		expect(prop.change).toHaveBeenCalledTimes(1);
	});
});
