function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

/*
	Capitalises each word in a string, e.g.
	'jane John doe' -> 'Jane John Doe'
*/

function capitaliseWords(name) {
	const result = name
		.split(' ')
		.map(namePart => capitalizeFirstLetter(namePart))
		.join(' ');

	return result;
}

/*
	Generates list order labels such as:
	'a', 'b', 'c', ... 'a.a', 'a.b' ... 'a.a.a'
*/

const map = {};

function listPrefix(index) {
	const alphabetCount = 26;

	/*
		Ordering begins with character 'a'.
		Tip: ('a'.charCodeAt() + 1) represents character 'b'
	*/
	const startingCharCode = 'a'.charCodeAt();

	/*
		A recursive solution to generate character sequences
		according to the specified index, e.g. 'a', 'b', 'c', 'aa', 'ab'
	*/
	function generate(index, str = '') {
	    if (index < 0) {
			return str.slice(1);
		}

		let letter = map[index];

		if (letter) {

		} else {
		    // Provides the letter for the rightmost character
		    letter = String.fromCharCode(startingCharCode + (index % alphabetCount));
		    map[index] = letter;
		}

	    index = Math.floor(index / alphabetCount) - 1;

	    return generate(index, ('.' + letter) + str);
	}

	return generate(index);
}

module.exports = {
	capitaliseWords,
	listPrefix
};