import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import CheckForm from '../CheckForm/CheckForm';
import Info from '../Info/Info';
import { getData, storeData } from '../../helpers/localStorage';
import Starkscan from '../../images/Starkscan.png';

const App = () => {
  const initialState = () => getData('data') || [];
  const [state, setState] = useState(initialState);

  useEffect(() => {
    storeData('data', state);
  }, [state]);

  const handleChange = val => {
    // Check the value object in the json file
    val.amount = "0";
    val.id = uuidv4();
    let newVal = [...state, val];
    setState(newVal);
  };

  const handleDelete = id => {
    storeData('lastState', state);
    let newState = state.filter(i => {
      return i.id !== id;
    });
    setState(newState);
  };

  return (
    <div className='container'>
      <div className='row center'>
        <h1 className='white-text'> Starknet Provisions Helper </h1>
      </div>
      <div className='row'>
        <div className='col m12 s12'>
          <div>
            <div className='row center'>
              <h4 className='white-text'>Get the claiming params for <a href="https://starkscan.co/contract/0x06793d9e6ed7182978454c79270e5b14d2655204ba6565ce9b0aa8a3c3121025#read-write-contract-sub-write" target="_blank">Starkscan</a></h4>
            </div>
            <img alt="starkscan" src={Starkscan} width="750" />
            <CheckForm change={handleChange} />
            <div className='data-container row'>
              {state.length > 0 ? (
                <>
                  {state.map(info => (
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
                  <div className='center white-text'>Please click the Get Result button</div>
                )}
            </div>
          </div>
        </div>
        Github: Chihaolu, StarkNet: "", Ethereum: chihaolu.me
      </div>
    </div>
  );
};

export default App;
