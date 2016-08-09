public class Stack {
	int array[];
	int head = 0;
	int tail = 10;
	Stack(){
		array = new int [3];
	};

	Stack(int N){
		array  = new int [N];
		int tail = N;
	};

	public void push(int val){
		if(head==array.length)
			System.out.print("Stack is full\n");
		else
			array[head++]=val;
	};

	public int getSize(){
		return array.length;
	};

	public void print(){
		for (int i=0;i<array.length;i++)
			System.out.print(array[i]+"\n");
	}
	public static void main(String []args){
		Stack stack = new Stack ();
		stack.push(10);
		stack.print();
		stack.push(11);
		stack.print();
		stack.push(13);
		stack.print();
						
	}
}