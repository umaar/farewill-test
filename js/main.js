const {strings} = require('./constants');
const {capitaliseWords, listPrefix} = require('./utils');

/*
	Combines all the beneficiary names
	along with their identifiers, into one string
	e.g. 'Jane Doe of jane@domain and John Doe of john@domain'
*/

const map = new Map();

function formatNames(beneficiaries) {
	const result = beneficiaries.map(({name, identifier}) => {
		const id = name + identifier;

		if (map.has(id)) {
			return map.get(id);
		}

		const capitalisedNames = capitaliseWords(name);
		const string = `${capitalisedNames} ${strings.of} ${identifier}`;

		map.set(id, string);
		return string;
	}).join(` ${strings.and} `);

	return result;
}

/*
	Specifies which gifts the beneficiaries will receive
*/
function getGiftsText(gifts) {
	return gifts.map(({name: giftName, beneficiaries}, beneficiaryIndex) => {
		const prefixedList = listPrefix(beneficiaryIndex);
		const names = formatNames(beneficiaries);
		const giftAllocationStatement = `${strings.iGiveTo} ${names} ${strings.my} '${giftName}'.`;

		return [prefixedList, giftAllocationStatement];
	});
}

const specificGifts = (startIndex = 0, giftsArray = []) => {
	if (giftsArray.length === 0) {
		return [];
	}

	return [
		[startIndex, strings.standardClause1],
		[startIndex + 1, strings.standardClause2],
		[startIndex + 2, getGiftsText(giftsArray)]
	];
};

module.exports = {
	specificGifts
};
