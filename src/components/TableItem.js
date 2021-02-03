import React from 'react';

const TableItem = ({ user }) => {
	if (!user) return null;

	const { validFields } = user;
	return (
		<tr>
			<td>{user.id}</td>
			<td>{user.full_name}</td>
			<td className={validFields.phone ? '' : 'red'}>{user.phone}</td>
			<td className={validFields.email ? '' : 'red'}>{user.email}</td>
			<td className={validFields.age ? '' : 'red'}>{user.age}</td>
			<td>{user.experience}</td>
			<td className={validFields.yearly_income ? '' : 'red'}>
				{user.yearly_income}
			</td>
			<td>{user.has_children}</td>
			<td className={validFields.license_states ? '' : 'red'}>
				{user.license_states}
			</td>
			<td className={validFields.expiration_date ? '' : 'red'}>
				{user.expiration_date}
			</td>
			<td className={validFields.license_number ? '' : 'red'}>
				{user.license_number}
			</td>
		</tr>
	);
};

export default TableItem;
