import React from 'react';
import TableItem from './TableItem';

const Table = ({ users }) => {
	return (
		<table className='table'>
			<thead>
				<tr>
					<th>ID</th>
					<th>Full name</th>
					<th>Phone</th>
					<th>Email</th>
					<th>Age</th>
					<th>Experience</th>
					<th>Yearly Income</th>
					<th>Has children</th>
					<th>License states</th>
					<th>Expiration date</th>
					<th>License number</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<TableItem key={user.id} user={user} />
				))}
			</tbody>
		</table>
	);
};

export default Table;
