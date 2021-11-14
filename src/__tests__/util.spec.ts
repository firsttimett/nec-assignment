import { processInputArray } from "../util";

describe("processInputArray", () => {
	it("should return correct success message", () => {
		const inputArray = [
			"[[“null”, “A”]]",
			"[[“A”,”Z”],[“A”,”Y”],[“A”,”X”]]",
			"[[“Z”,”C”],[“Z”,”B”],[“X”,”W”]]",
		];

		const expected = `Node A - No right node
Node Z - Right node is Y
Node Y - Right node is X
Node X - No right node
Node C - Right node is B
Node B - Right node is W
Node W - No right node`;

		const result = processInputArray(inputArray);
		expect(result).toEqual(expected);
	});

	describe("Error scenarios", () => {
		it("should return error message saying first node must be root node when first node is not root node", () => {
			const expected = "Invalid data, first node must be root node.";
			const inputArray = ["[[“A”,”Z”]"];

			const result = processInputArray(inputArray);
			expect(result).toEqual(expected);
		});

		describe("should return error message saying invalid data at specific line", () => {
			it("when parent node id is missing", () => {
				const inputArray = ["[[“”, “A”]]"];
				const expected = `Invalid data at Line 1: ${inputArray[0]}`;

				const result = processInputArray(inputArray);
				expect(result).toEqual(expected);
			});

			it("when node id is missing", () => {
				const inputArray = ["[[“null”, “A”]]", "[[“A”,””],[“A”,”Y”]"];
				const expected = `Invalid data at Line 2: ${inputArray[1]}`;

				const result = processInputArray(inputArray);
				expect(result).toEqual(expected);
			});
		});

		it(`should return error message saying parent id not found when parent id
			is neither a root node nor a child of any node`, () => {
			const expected = "Invalid data, parent id 'C' not found.";
			const inputArray = ["[[“null”, “A”]]", "[[“A”,”Z”],[“C”,”Y”]]"];

			const result = processInputArray(inputArray);
			expect(result).toEqual(expected);
		});

		it(`should return error message saying duplicated node id when the node id appeared more than once`, () => {
			const expected = "Invalid data, duplicated node id 'Z' detected.";
			const inputArray = ["[[“null”, “A”]]", "[[“A”,”Z”],[“A”,”Z”]]"];

			const result = processInputArray(inputArray);
			expect(result).toEqual(expected);
		});
	});
});
