const fs = require("fs/promises");

const myFileWriter = async (fileName, fileContent) => {
	// write code here
	// dont chnage function name
	try {
		await fs.writeFile(`./${fileName}`, fileContent, { encoding: "utf-8" });
		console.log("successfully created the file: ", fileName);
	} catch (err) {
		console.log("wasnt able to create the file: ", err.message);
	}
};

const myFileReader = async (fileName) => {
	// write code here
	// dont chnage function name
	try {
		const data = await fs.readFile(`./${fileName}`, { encoding: "utf-8" });
		console.log(data);
	} catch (err) {
		console.log("wasnt able to read the file: ", err.message);
	}
};

const myFileUpdater = async (fileName, fileContent) => {
	// write code here
	// dont chnage function name
	try {
		await fs.appendFile(`./${fileName}`, fileContent, {
			encoding: "utf-8",
		});
		console.log("successfully appended to the file: ", fileName);
	} catch (err) {
		console.log(
			"wasnt able to appended the content to the file ",
			err.message
		);
	}
};

const myFileDeleter = async (fileName) => {
	// write code here
	// dont chnage function name
	try {
		await fs.unlink(`./${fileName}`);
		console.log("successfully deleted the file: ", fileName);
	} catch (err) {
		console.log("unable to delete: ", err.message);
	}
};

myFileWriter("hi", "Download the zip file, extract it and complete the template code")
	.then(() => myFileReader("hi"))
	.then(() => myFileUpdater("hi", "hfjkkjs"))
	.then(() => myFileReader("hi"))
	.then(() => myFileDeleter("hi"));

module.exports = { myFileWriter, myFileUpdater, myFileReader, myFileDeleter };
