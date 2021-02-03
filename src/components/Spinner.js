import React from 'react';
import spinner from './spinner.svg';
const Spinner = ({ msg = '' }) => {
	return (
		<div className='spinner'>
			<img src={spinner} alt='Loading...' />
			<p>{msg}</p>
		</div>
	);
};

export default Spinner;
