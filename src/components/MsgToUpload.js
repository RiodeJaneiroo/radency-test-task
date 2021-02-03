import React from 'react';
import arrow from './arrow-top.svg';
const MsgToUpload = () => {
	return (
		<div className='msgToUpload'>
			<p>Please upload a CSV file</p>
			<img src={arrow} alt='Please upload csv file' />
		</div>
	);
};

export default MsgToUpload;
