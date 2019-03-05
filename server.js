
const express = require('express');

const app = express();

app.get('/', (request, response) => {
	response.send(`
    Hello there, this is here just so Glitch runs the app!
    <br />
    You may be looking for the logs, that's on the left side panel.
  `);
});

app.listen(process.env.PORT);

// Here is the main part of the application here

const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');

const mocha = new Mocha();
mocha.reporter('list').ui('tdd').run();

const testDirectoryPath = 'js';

const filesInTestDirectory = fs.readdirSync(testDirectoryPath);

const javascriptFilesInTestDirectory = filesInTestDirectory.filter(file => {
	const isAJavascriptFile = file.endsWith('.test.js');
	return isAJavascriptFile;
});

javascriptFilesInTestDirectory.forEach(file => {
	const filePath = path.join(testDirectoryPath, file);
	mocha.addFile(filePath);
});

mocha.run(failures => {
	if (failures) {
		process.exitCode = -1;
		return;
	}

	process.exitCode = 0;
});
