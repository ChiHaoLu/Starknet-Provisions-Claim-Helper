import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App/App.css';

const initialValues = {
	address: '0x018a0042b39b96942f5e3d927ac561febd42c02c044cbdb6edc5ab9f2d71b577',
	// amount: 0,
	// merkleIndex: 0,
	// merklePath: []
}

const CheckForm = ({ change }) => {
	const [state, setState] = useState(initialValues);

	const handleChange = e => {
		let { value } = e.target;
		// TODO: starknet address checksum
		
		setState({
			address: value,
		});
	};

	const handleSubmit = () => {
		change(state);
		setState(initialValues);
	};

	return (
		<>
			<div className="row">
				<div className="col m6 s12">
					<label htmlFor="address">Your Starknet Address: </label>
					<input
						id="address"
						name="address"
						type="string"
						placeholder="50"
						value={state.address}
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="center">
				<button
					id="bmi-btn"
					className="calculate-btn"
					type="button"
					disabled={state.address === ''}
					onClick={handleSubmit}
				>
					Get Result
				</button>
			</div>
		</>
	);
};

CheckForm.propTypes = {
	change: PropTypes.func.isRequired
};

export default CheckForm;
