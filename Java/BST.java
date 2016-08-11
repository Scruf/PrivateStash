public class BST{
	private class Node{
		int data;
		Node left;
		Node right;
		Node(){
			this.left = null;
			this.right = null;
			this.data = 0
		};
		Node (int data){
			this.left = null;
			this.right = null;
			this.data = data;
		}
	}
	private Node root;
	BST(){
		root=null;
	};
	public Node insert(Node node,int data){
		if(node==null)
			node = New Node(data);
		else{
			if(data<node.left.data){
				node.left = insert(node.left,data);

			}
			else
				node.right = insert(node.right.data);
		}
		return node;
	}
	public void insert(int data){
		root = insert(root,data);
	}
	private boolean search(Node root,int data){
		if (root==null)
			System.out.print("tree is empty");
		else{
			boolean found = false;
			while(root!=null && !found){
				if(root.data < data)
					root = root.left;
				else if(root.data>data)
					rooot=root.right;
				else{
					found = true;
					break;
				}
			}
			return found;
		}
	}
	public boolean search(int data){
		return search(root,data);
	}
	private Node delete(Node root,int data){
		
	}
	public static void main(String []args){

	}
}