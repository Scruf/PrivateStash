public class Queue{
	//initial arrray
	int array[];
	int tail = 2;
	int head = 2;
	Queue(){
		array = new int [2];
	};
	Queue(int N){
		array = new int[N];
		tail = N;
		head=N;
	};
	public int getSize(){
		return array.length;
	};
	public void enque(int el){
		if(tail==0)
			System.out.print("Queue is full"+"\n");
		else{
			array[--tail]=el;
		}
	};
	public int deque(){
		if(head==0)
			return -1;
		else
			return array[--head];
	}
	public void print(){
		for(int i=0;i<array.length;i++)
			System.out.print(array[i]+"\n");
	};
	public static void main (String []args){
		Queue queue = new Queue();
		queue.enque(10);
		queue.enque(15);
		System.out.print(queue.deque());
		System.out.print(queue.deque());
		System.out.print(queue.deque());
	}
}