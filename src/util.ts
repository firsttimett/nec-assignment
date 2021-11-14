import { TraverseOutput, TreeNode } from "./typings";

function traverseNodes(node: TreeNode, id = "", outputString = "", firstNodeInRowParam?: TreeNode): TraverseOutput {
	if (node?.id === id) {
		return {
			node,
			outputString,
		};
	}

	const firstNodeInRow = !firstNodeInRowParam && node.Children.length ? node.Children[0] : firstNodeInRowParam;

	if (node.Right) {
		outputString += `Node ${node.id} - Right node is ${node.Right.id}\n`;
		return traverseNodes(node.Right, id, outputString, firstNodeInRow);

	} else {
		outputString += `Node ${node.id} - No right node\n`;

		if (firstNodeInRow) {
			return traverseNodes(firstNodeInRow, id, outputString);
		}
	}

	return {
		node: undefined,
		// Remove last \n
		outputString: outputString.substring(0, outputString.length - 1),
	}
}

/**
 * @Returns success/error output string
 */
export function processInputArray(inputArray: string[]) {
	let rootNode: TreeNode | undefined;
	const nodeIds = new Set<string>();

	for (const [index, line] of inputArray.entries()) {
		let sameLevelPreviousNode: TreeNode | undefined;

		for (const nodeValue of line.trim().split("],[")) {
			const matches = nodeValue.match(/\w+/g);

			if (!matches || matches.length != 2) {
				return `Invalid data at Line ${index + 1}: ${line}`;
			}

			const parentId = matches[0];
			const nodeId = matches[1];

			if (nodeIds.has(nodeId)) {
				return `Invalid data, duplicated node id '${nodeId}' detected.`;
			}
			nodeIds.add(nodeId);

			if (parentId === "null") {
				rootNode = new TreeNode(nodeId);

			} else if (!rootNode) {
				return "Invalid data, first node must be root node.";

			} else {
				const newNode = new TreeNode(nodeId);
				const { node: parentNode } = traverseNodes(rootNode, parentId);

				if (!parentNode) {
					return `Invalid data, parent id '${parentId}' not found.`;
				}

				if (sameLevelPreviousNode) {
					sameLevelPreviousNode.Right = newNode;
				}

				parentNode.Children.push(newNode);
				sameLevelPreviousNode = newNode;
			}
		}
	}

	if (rootNode) {
		const { outputString } = traverseNodes(rootNode);
		return outputString;
	}
}
