/* Format functions */
const getStateCode = (stateFullName) => {
	const stateList = {
		arizona: 'AZ',
		alabama: 'AL',
		alaska: 'AK',
		arkansas: 'AR',
		california: 'CA',
		colorado: 'CO',
		connecticut: 'CT',
		delaware: 'DE',
		florida: 'FL',
		georgia: 'GA',
		hawaii: 'HI',
		idaho: 'ID',
		illinois: 'IL',
		indiana: 'IN',
		iowa: 'IA',
		kansas: 'KS',
		kentucky: 'KY',
		louisiana: 'LA',
		maine: 'ME',
		maryland: 'MD',
		massachusetts: 'MA',
		michigan: 'MI',
		minnesota: 'MN',
		mississippi: 'MS',
		missouri: 'MO',
		montana: 'MT',
		nebraska: 'NE',
		nevada: 'NV',
		'new hampshire': 'NH',
		'new jersey': 'NJ',
		'new mexico': 'NM',
		'new york': 'NY',
		'north carolina': 'NC',
		'north dakota': 'ND',
		ohio: 'OH',
		oklahoma: 'OK',
		oregon: 'OR',
		pennsylvania: 'PA',
		'rhode island': 'RI',
		'south carolina': 'SC',
		'south dakota': 'SD',
		tennessee: 'TN',
		texas: 'TX',
		utah: 'UT',
		vermont: 'VT',
		virginia: 'VA',
		washington: 'WA',
		'west virginia': 'WV',
		wisconsin: 'WI',
		wyoming: 'WY',
	};
	return stateList[stateFullName] || stateFullName;
};

const formatPhone = (phone) => {
	const phoneNum = phone.replace(/[^\d]/g, '');
	if (phoneNum.length === 10) {
		return `+1${phoneNum}`;
	} else if (phoneNum.length === 11 && parseInt(phoneNum.charAt(0)) === 1) {
		return `+${phoneNum}`;
	}
	return phone;
};

const formatState = (states) => {
	const arrState = states.toLowerCase().split('|');

	return arrState
		.map((state) => {
			state = state.trim();
			if (state.length === 2) return state.toUpperCase();
			return getStateCode(state.toLowerCase());
		})
		.join(' | ');
};

/* Validation functions */
const checkAge = (age) => {
	const ageNum = parseInt(age);
	if (ageNum > 20) {
		return true;
	}
	return false;
};

const checkState = (state) => {
	const arrState = formatState(state).split(' | ');
	return arrState.every((el) => el.length === 2);
};

const checkEmail = (email) => {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
const checkLicenseNum = (num) => {
	return num.length === 6 && /(\d|\w){6}/.test(num);
};
const checkPhone = (phone) => {
	return phone.length === 12 && phone.slice(0, 2) === '+1';
};

onmessage = function ({ data }) {
	const formatUsers = data.map((user, idx) => {
		return {
			id: idx + 1,
			full_name: user.full_name.trim(),
			age: user.age.trim(),
			email: user.email.trim().toLowerCase(),
			experience: user.experience.trim(),
			expiration_date: user.expiration_date.trim(),
			has_children: user.has_children.toUpperCase() || 'FALSE',
			license_number: user.license_number.trim(),
			license_states: formatState(user.license_states),
			phone: formatPhone(user.phone),
			yearly_income: parseFloat(user.yearly_income).toFixed(2),
		};
	});

	const validUsers = formatUsers.map((user) => {
		return {
			...user,
			validFields: {
				age: checkAge(user.age),
				email: checkEmail(user.email),
				phone: checkPhone(user.phone),
				experience: true,
				yearly_income: user.yearly_income <= 1_000_000,
				license_states: checkState(user.license_states),
				expiration_date: true,
				has_children: true,
				license_number: checkLicenseNum(user.license_number),
			},
		};
	});

	postMessage(validUsers);
};
