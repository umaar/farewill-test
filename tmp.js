function getAlphabetLetterFromIndex(index) {
	const alphabetLettersAmount = 26;
	const letter = String.fromCharCode(97 + (index % alphabetLettersAmount));

	if (index <= alphabetLettersAmount) {
		return letter;
	}

	const secondLetter = String.fromCharCode(97 + (index % alphabetLettersAmount));
	return `${letter}.${secondLetter}`;
}

console.log(getAlphabetLetterFromIndex(100));