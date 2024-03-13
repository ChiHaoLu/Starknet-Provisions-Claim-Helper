import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../App/App.css';

const initialValues = {
	address:
		'0x079b7564882ddefd1c78dd31776ce5dc36c824d595c6f3aff982209bfff2fd2e',
	// amount: 0,
	// merkleIndex: 0,
	// merklePath: []
};

const CheckForm = ({ change }) => {
	const [state, setState] = useState(initialValues);

	const handleChange = (e) => {
		let { value } = e.target;
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
	change: PropTypes.func.isRequired,
};

export default CheckForm;
