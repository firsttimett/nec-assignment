export class TreeNode {
	public id: string;
	public Children: TreeNode[];
	public Right: TreeNode | null;

	constructor(id: string) {
		this.id = id;
		this.Children = [];
		this.Right = null;
	}
}

export interface TraverseOutput {
	node: TreeNode | undefined;
	outputString: string;
}
