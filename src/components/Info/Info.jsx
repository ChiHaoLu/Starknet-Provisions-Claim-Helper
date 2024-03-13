import React, { useState } from 'react';
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

	const copy = () => {
		navigator.clipboard.writeText(params);
		alert('Copied the text: ' + params);
	};

	return (
		<div className="col m6 s12">
			<div className="card">
				<div className="card-content">
					<span className="card-title" data-test="params">
						Claiming Params
					</span>
					<div className="card-data">
						<h6
							data-test="address"
							style={{ width: '25em', overflow: 'scroll' }}
						>
							Starknet Address: {address}
						</h6>
						<span
							data-test="amount"
							style={{ width: '15em', overflow: 'scroll' }}
						>
							Allocation Amount: {amount} STRK
						</span>
						<br />
						<span data-test="merkleIndex">
							Merkle Index: {merkleIndex}
						</span>
						<br />
						<span
							data-test="merklePath"
							style={{ width: '15em', overflow: 'scroll' }}
						>
							Merkle Path: {merklePath}
						</span>
						<br />
						<span
							data-test="params"
							style={{ width: '30em', overflow: 'scroll' }}
						>
							Params: {params}
						</span>
						<button
							onClick={async () => {
								if ('clipboard' in navigator) {
									await navigator.clipboard.writeText(params);
								} else {
									document.execCommand('copy', true, params);
								}
							}}
						>
							Copy Params
						</button>
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
