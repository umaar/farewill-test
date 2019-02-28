// The comment below ignores linting for keywords that are used by mocha
/* global describe, it */

/*
  This file holds a selection of tests to make sure the specificGifts function you have written in main.js works correctly.
  If any of the tests fail, this is a good indication that your function is not working as expected.
  You shouldn’t need to edit this file.
*/

const {expect} = require('chai');
const {specificGifts} = require('./main.js');

const standardClause1 = `
  The specific gifts given by this Will shall be paid free of
  inheritance tax and other taxes or duties payable as a result
  of my death and the cost of delivering any gift to a beneficiary
  or vesting it in them shall be an executorship expense as shall
  be the cost of the upkeep of the gift until delivery or vesting.
`;

const standardClause2 = `
  Any item that fails to pass to a beneficiary will return to my
  estate to be included in the residue of my estate.
`;

describe('A simple case', () => {
	const index = 1;

	const giftArraySimple = [
		{
			name: 'Crocs',
			beneficiaries: [
				{
					name: 'Daniel Garrett',
					identifier: 'dan@farewill.com'
				}
			]
		}
	];

	it('Adds the first two standard clauses to the returned array', () => {
		expect(specificGifts(index, giftArraySimple)[0]).to.eql([1, standardClause1]);
		expect(specificGifts(index, giftArraySimple)[1]).to.eql([2, standardClause2]);
	});

	it('Returns the correct format array for the gifts clause', () => {
		expect(specificGifts(index, giftArraySimple)[2][1][0]).to.eql([
			'a',
			'I give to Daniel Garrett of dan@farewill.com my \'Crocs\'.'
		]);
	});
});

describe('Non-capitalised names', () => {
	const index = 1;

	const giftArrayNonCapitalised = [
		{
			name: 'Crocs',
			beneficiaries: [{
				name: 'daniel garrett',
				identifier: 'dan@farewill.com'
			}]
		}
	];

	it('Returns the name capitalised in the string', () => {
		expect(specificGifts(index, giftArrayNonCapitalised)[2][1][0]).to.eql([
			'a',
			'I give to Daniel Garrett of dan@farewill.com my \'Crocs\'.'
		]);
	});
});

describe('Different start index', () => {
	// There can be a variable number of clauses preceeding the clause

	const bigIndex = 11;
	const veryBigIndex = 212;

	const giftArraySimple = [
		{
			name: 'Crocs',
			beneficiaries: [
				{
					name: 'Daniel Garrett',
					identifier: 'dan@farewill.com'
				}
			]
		}
	];

	it('Returns the correct indexes for a larger given idnex', () => {
		expect(specificGifts(bigIndex, giftArraySimple)[0][0]).to.equal(11);
		expect(specificGifts(bigIndex, giftArraySimple)[2][0]).to.equal(13);
		expect(specificGifts(veryBigIndex, giftArraySimple)[0][0]).to.equal(212);
		expect(specificGifts(veryBigIndex, giftArraySimple)[2][0]).to.equal(214);
	});
});

describe('No data', () => {
	/*
    If there is no gift data then we need to return an
    empty array (no standard clauses).
  */

	const index = 1;
	const giftArrayEmpty = [];

	it('Returns an empty array if there are no gifts', () => {
		expect(specificGifts(index, giftArrayEmpty).length).to.equal(0);
	});
});

describe('Multiple beneficiaries', () => {
	/*
   When listing names in a  will there is specific
   punctuation required. All names in a list must be separated
   by a comma (no 'and').
  */

	const index = 1;
	const giftArrayMultipleBeneficiaries = [
		{
			name: 'Watch',
			beneficiaries: [
				{
					name: 'Zac Colley',
					identifier: 'zac@farewill.com'
				},
				{
					name: 'Helena Thompson',
					identifier: 'helena@farewill.com'
				},
				{
					name: 'Tom Rogers',
					identifier: 'tom@farewill.com'
				}
			]
		}
	];

	it('Returns a comma separated list in the gift text for multiple beneficiaries', () => {
		const expectedString = 'I give to Zac Colley of zac@farewill.com and Helena Thompson of helena@farewill.com and Tom Rogers of tom@farewill.com my \'Watch\'.';

		expect(specificGifts(index, giftArrayMultipleBeneficiaries)[2][1][0][1]).to.equal(expectedString);
	});
});

describe('Many gifts', () => {
	/*
    Someone could leave any number (>=0) of gifts,
    and each gift subclause needs to have a unique lettering.
    For example; if someone has 30 gifts the 27th gift should
    have the letters 'a.a', the 28th should have 'a.b', the
    29th 'a.c' and the 30th 'a.d'.
  */

	/*
    Hint: you may wish to split into two separate cases, one
    where the index of the gift <= 26 (letters in the alphabet),
    the other where the index > 26.
  */

	const index = 1;
	const manyGifts = [...new Array(100001)].map((el, index) => {
		return {
			name: 'gift_' + index,
			beneficiaries: [{
				name: 'Tom Rogers',
				identifier: 'tom@farewill.com'
			}]
		};
	});

	it('Returns the correct lettering for large numbers of gifts', () => {
		const manyGiftsOutput = specificGifts(index, manyGifts);

		expect(manyGiftsOutput[2][1][0][0]).to.equal('a');
		expect(manyGiftsOutput[2][1][1][0]).to.equal('b');
		expect(manyGiftsOutput[2][1][24][0]).to.equal('y');
		expect(manyGiftsOutput[2][1][25][0]).to.equal('z');
		expect(manyGiftsOutput[2][1][26][0]).to.equal('a.a');
		expect(manyGiftsOutput[2][1][27][0]).to.equal('a.b');
		expect(manyGiftsOutput[2][1][100][0]).to.equal('c.w');
		expect(manyGiftsOutput[2][1][1000][0]).to.equal('a.l.m');
		expect(manyGiftsOutput[2][1][10000][0]).to.equal('n.t.q');
		expect(manyGiftsOutput[2][1][100000][0]).to.equal('e.q.x.e');
	});
});

