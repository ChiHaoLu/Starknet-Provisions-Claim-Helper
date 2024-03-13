import React from 'react';
import { shallow } from 'enzyme';
import Info from './Info';

describe('Info Component', () => {
	let wrapper;
	const props = {
		address:
			'0x1010101010101010101010101010101010101010101010101010101010101010',
		id: '1234',
		amount: '200000000000000000000',
		merkleIndex: '9',
		merklePath: ['0x1234', '0x4321'],
		params: '0x1010101010101010101010101010101010101010101010101010101010101010, 200000000000000000000, 0, 9, 2, 0x1234, 0x4321',
		deleteCard: jest.fn(),
	};
	beforeEach(() => {
		wrapper = shallow(<Info {...props} />);
	});

	it('renders', () => {
		expect(wrapper).not.toBeNull();
	});

	it('renders with props', () => {
		expect(wrapper.find("[data-test='params']").text()).toEqual(
			'Params: ' + props.params
		);

		expect(wrapper.find("[data-test='address']").text()).toEqual(
			'Starknet Address: ' + props.address
		);

		expect(wrapper.find("[data-test='amount']").text()).toEqual(
			'Allocation Amount: ' + props.amount
		);

		expect(wrapper.find("[data-test='merkleIndex']").text()).toEqual(
			'Merkle Index: ' + props.merkleIndex
		);

		expect(wrapper.find("[data-test='merklePath']").text()).toEqual(
			'Merkle Path: ' + props.merklePath
		);
	});

	it('should delete the card', () => {
		wrapper.find('button').simulate('click');

		expect(props.deleteCard).toHaveBeenCalledTimes(1);
	});
});
