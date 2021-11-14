import * as fs from "fs";
import path from "path";
import { processInputArray } from "./util";

const main = async () => {
	if (process.argv.length < 3) {
		console.error("Input file (.txt) is missing in argument.");
		return;
	}

	try {
		const filePath = path.resolve(__dirname, process.argv[2]);
		console.log(`Reading from ${filePath}...\n`);

		const fileData = await fs.promises.readFile(filePath, "utf8");
		const inputArray = fileData.toString().split("\n").filter((line) => line.length !== 0);

		console.log(processInputArray(inputArray));

		console.log("\nDone process file.");

	} catch (err) {
		console.error("Error encountered: ", err);
	}
}

main();
