import React from 'react';

const TdItem = ({ text, valid = true }) =>
	valid ? <td>{text}</td> : <td className='red'>{text}</td>;

const TableItem = ({ user }) => {
	if (!user) return null;

	const { validFields } = user;
	return (
		<tr>
			<TdItem text={user.id} />
			<TdItem text={user.full_name} />
			<TdItem text={user.phone} valid={validFields.phone} />
			<TdItem text={user.email} valid={validFields.email} />
			<TdItem text={user.age} valid={validFields.age} />
			<TdItem text={user.experience} valid={validFields.experience} />
			<TdItem text={user.yearly_income} valid={validFields.yearly_income} />
			<TdItem text={user.has_children} valid={validFields.has_children} />
			<TdItem
				text={user.license_states}
				valid={validFields.license_states}
			/>
			<TdItem
				text={user.expiration_date}
				valid={validFields.expiration_date}
			/>
			<TdItem
				text={user.license_number}
				valid={validFields.license_number}
			/>
			<TdItem text={user.duplicate_with} />
		</tr>
	);
};

export default TableItem;
