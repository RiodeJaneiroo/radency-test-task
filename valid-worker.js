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

const checkDate = (date) => {
	if (
		/([0-9]{4}-[0-9]{2}-[0-9]{2})|([0-9]{2}\/[0-9]{2}\/[0-9]{4})/.test(date)
	) {
		return new Date(date) > new Date();
	}
	return false;
};

const checkEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const checkLicenseNum = (num) => num.length === 6 && /(\d|\w){6}/.test(num);

const checkPhone = (phone) => phone.length === 12 && phone.slice(0, 2) === '+1';

const checkExperience = (num, age) => num < age - 21;

const checkYearlyIncome = (income) => income >= 0 && income <= 1_000_000;

const checkChildren = (children) =>
	['', 'FALSE', 'TRUE'].some((el) => el === children.trim());

onmessage = function ({ data }) {
	const users = data.map((user, idx) => {
		let formatUser = {
			id: idx + 1,
			full_name: user.full_name.trim(),
			age: user.age.trim(),
			email: user.email.trim().toLowerCase(),
			experience: user.experience.trim(),
			expiration_date: user.expiration_date.trim(),
			has_children: String(user.has_children).toUpperCase() || 'FALSE',
			license_number: user.license_number.trim(),
			license_states: formatState(user.license_states),
			phone: formatPhone(user.phone),
			yearly_income: parseFloat(user.yearly_income).toFixed(2),
		};
		return {
			...formatUser,
			validFields: {
				age: checkAge(formatUser.age),
				email: checkEmail(formatUser.email),
				phone: checkPhone(formatUser.phone),
				experience: checkExperience(formatUser.experience, formatUser.age),
				yearly_income: checkYearlyIncome(formatUser.yearly_income),
				license_states: checkState(formatUser.license_states),
				expiration_date: checkDate(formatUser.expiration_date),
				has_children: checkChildren(formatUser.has_children),
				license_number: checkLicenseNum(formatUser.license_number),
			},
		};
	});

	const withDupUsers = users.reduceRight((prev, curr, idx, arr) => {
		const dublicate = arr.slice(0, curr.id - 1).find((el) => {
			return el.email === curr.email || el.phone === curr.phone;
		});
		const user = {
			...curr,
			duplicate_with: dublicate?.id || null,
		};
		return [user, ...prev];
	}, []);

	postMessage(withDupUsers);
};
