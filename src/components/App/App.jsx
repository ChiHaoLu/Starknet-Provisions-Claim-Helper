import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import CheckForm from '../CheckForm/CheckForm';
import Info from '../Info/Info';
import { getData, storeData } from '../../helpers/localStorage';
import Starkscan from '../../images/Starkscan.png';
import { FaEthereum, FaGithub } from 'react-icons/fa';
import { IoPlanet } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import PacmanLoader from 'react-spinners/PacmanLoader';

const App = () => {
	const initialState = () => getData('data') || [];
	const [state, setState] = useState(initialState);
	const [searching, setSearching] = useState(false);

	useEffect(() => {
		storeData('data', state);
	}, [state]);

	const handleChange = async (val) => {
		// Check the value object in the json file
		var matches = [];
		setSearching(true);
		for (var i = 0; i <= 10 && matches.length === 0; i++) {
			const data = await import(
				'../../provisions-data/starknet/starknet-' +
					i.toString() +
					'.json'
			);
			matches = data.eligibles.filter(function (value) {
				return value.identity === val.address;
			});
		}
		setSearching(false);
		console.log(matches[0]);
		val.address = matches[0].identity;
		val.amount = matches[0].amount;
		val.merkleIndex = matches[0].merkle_index;
		val.merklePath = matches[0].merkle_path;
		val.params =
			matches[0].identity +
			',' +
			matches[0].amount +
			',' +
			'0' +
			',' +
			matches[0].merkle_index +
			',' +
			matches[0].merkle_path.length.toString() +
			',' +
			matches[0].merkle_path.join();
		val.id = uuidv4();
		let newVal = [...state, val];
		setState(newVal);
	};

	const handleDelete = (id) => {
		storeData('lastState', state);
		let newState = state.filter((i) => {
			return i.id !== id;
		});
		setState(newState);
	};

	return (
		<div className="container">
			<div className="row center">
				<h1 className="white-text"> Starknet Provisions Helper </h1>
			</div>
			<div className="row">
				<div className="col m12 s12">
					<div>
						<div className="row center">
							<h4 className="white-text">
								Get the claiming params for{' '}
								<a
									rel="noopener noreferrer"
									href="https://starkscan.co/contract/0x06793d9e6ed7182978454c79270e5b14d2655204ba6565ce9b0aa8a3c3121025#read-write-contract-sub-write"
									target="_blank"
								>
									Starkscan
								</a>
							</h4>
						</div>
						<img alt="starkscan" src={Starkscan} width="750" />
						<CheckForm change={handleChange} />
						<PacmanLoader
							color={'#ec796b'}
							loading={searching}
							size={50}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
						<div className="data-container row">
							{state.length > 0 ? (
								<>
									{state.map((info) => (
										<Info
											key={info.id}
											id={info.id}
											address={info.address}
											amount={info.amount}
											merkleIndex={info.merkleIndex}
											merklePath={info.merklePath}
											params={info.params}
											deleteCard={handleDelete}
										/>
									))}
								</>
							) : (
								<div className="center white-text">
									Please click the Get Result button
								</div>
							)}
						</div>
					</div>
				</div>
				<div>
					<IconContext.Provider
						value={{ color: '#E175B1', size: '25px' }}
					>
						<h6 className="white-text">
							<FaEthereum />
							<a
								className="white-text"
								rel="noopener noreferrer"
								href="https://etherscan.io/address/0x2b83c71a59b926137d3e1f37ef20394d0495d72d"
								target="_blank"
							>
								chihaolu.eth
							</a>
						</h6>
						<h6 className="white-text">
							<FaGithub />
							<a
								className="white-text"
								rel="noopener noreferrer"
								href="https://github.com/ChiHaoLu"
								target="_blank"
							>
								ChiHaoLu
							</a>
						</h6>
						<h6 className="white-text">
							<IoPlanet />
							<a
								className="white-text"
								rel="noopener noreferrer"
								href="https://starkscan.co/contract/0x018a0042b39b96942f5e3d927ac561febd42c02c044cbdb6edc5ab9f2d71b577#overview"
								target="_blank"
							>
								0x018a0042b39b96942f5e3d927ac561febd42c02c044cbdb6edc5ab9f2d71b577
							</a>
						</h6>
					</IconContext.Provider>
				</div>
			</div>
		</div>
	);
};

export default App;
