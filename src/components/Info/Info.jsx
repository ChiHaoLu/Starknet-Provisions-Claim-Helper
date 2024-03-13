import React from 'react';
import PropTypes from 'prop-types';

const Info = ({
	id,
	address,
	amount,
	merkleIndex,
	merklePath,
	params,
	deleteCard,
}) => {
	const handleDelete = () => {
		deleteCard(id);
	};

	return (
		<div className="col m6 s12">
			<div className="card">
				<div className="card-content">
					<span className="card-title" data-test="params">
						Params: {params}
					</span>
					<div className="card-data">
						<span data-test="address">
							Starknet Address: {address}{' '}
						</span>
						<span data-test="amount">
							Allocation Amount: {amount} STRK
						</span>
						<span data-test="merkleIndex">
							Merkle Index: {merkleIndex}
						</span>
						<span data-test="merklePath">
							Merkle Path: {merklePath}
						</span>
					</div>

					<button className="delete-btn" onClick={handleDelete}>
						X
					</button>
				</div>
			</div>
		</div>
	);
};

Info.propTypes = {
	id: PropTypes.string,
	address: PropTypes.string,
	amount: PropTypes.string,
	merkleIndex: PropTypes.string,
	merklePath: PropTypes.arrayOf(PropTypes.string),
	params: PropTypes.string,
	deleteCard: PropTypes.func,
};

export default Info;
