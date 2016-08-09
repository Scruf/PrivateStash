public class LinkedList {
	private class Node{
		Node next;
		int data;
			Node(int d){
				this.data = d;
				next = null;
			};
			Node (int d, Node next){
				this.data = d;
				this.next = next;
			}
	}
	private Node head;
	LinkedList(){
		head = new Node(null);		
	};
	public void add(int data){
		if(head == null)
			head = new Node(data,head);
		else{
			Node temp = new Node(data);
			Node current = headl
			while(current.next!=null){
				current = current.next;
			}
			current.next = temp;
			
		}
	}
}