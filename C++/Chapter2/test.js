"use strict"
const Source = {
	filling: (array)=>{
		for(let i=0;i<array.length;i++)
			array[i]=Math.random(2,20);
	},
	output: (array)=>{
		for(let i=0;i<array.length;i++)
			console.log(array[i]+"\n");
	},
	bubble_sort: (array)=>{
		for(let i=0;i<array.length;i++)
			for(let j=1;j<array.length;j++)
				if(array[j]<array[j-1]){
					let temp = array[j];
					array[j] = array[j-1];
					array[j-1] = temp;
				}
	},
	quick_sort: (array,first,last)=>{
		let i,j,pivot;
		if(first<last){
			i=first;
			j=last;
			pivot=first;
			while(i<j){
				while(array[i]<=array[pivot] && i<last)
					i++;
				while(array[j]>array[pivot])
					j--;
				if(i<j){
					let temp = array[i];
					array[i] = array[j];
					array[j] = temp;
				}
			}
			let temp = array[pivot];
			array[pivot] = array[j];
			array[j] = temp;
			this.quick_sort(array,first,j-1);
			this.quick_sort(array,j+1,last);
		}
	},
	merge: (array,first,middle,last)=>{
		let tempPos=first,leftEnd=middle-1,number_of_elements=(last-first)+1,temp=[];
		while((first<=leftEnd)&&(middle<=last)){
			if(array[first]<array[middle])
				temp[tempPos++]=array[first++];
			else
				temp[tempPos++]=array[middle++];
		}
		while(first<=leftEnd)
			temp[tempPos++]=array[first++];
		while(middle<=last)
			temp[tempPos++]=array[middle++];
		for(let i=0;i<number_of_elements;i++){
			array[last]=temp[last];
			last--;
		}
	},
	merge_sort: (array,first,last)=>{
		let middle;
		if(first<last){
			middle=(first+last)/2;
			this.merge_sort(array,first,middle);
			this.merge_sort(array,middle+1,last);
			this.merge(array,first,middle+1,last);
		}
	},
	sift_down: (array,start,end)=>{
		let root = start;
		while(root*2+1<=end){
			let child = root * 2 + 1;
			if(child+1<=end && array[child]<array[child+1])
				child = child + 1;
			if(array[root]<array[child]){
				let temp = array[root];
				array[root] = array[child];
				array[child] = temp;
				this.sift_down(array,start,end-1);
				end--;
			}else{}
		}
	},
	heapify: (array,count)=>{
		let start = (count-2)/2;
		while(start>=0){
			this.sift_down(array,start,count-1);
			start--;
		}
	},
	heap_sort: (array)=>{
		let count = array.length;
		this.heapify(array,count-1);
		let end = count - 1;
		while(end>0){
			let temp = array[end];
			array[end ]= array[0];
			array[0] = temp;
			this.sift_down(array,0,end-1);
			end--;
		}
	}
};
const AVL = {
	Node:{
		height:0,
		value:0,
		left:null,
		right:null,
			Node: ()=>{
				this.height = 0;
				this.value=0;
				this.left=null;
				this.right = null;
			},
			Node: (N)=>{
				this.height = 0;
				this.value =  N;
				this.left=null;
				this.right = null;
			}
	},
	Node: root,
	AVL: ()=>{
		root=nuoll;
	},
	height: (N)=>{
		return N===null ? -1 : 0;
	},
	max: (leftNode,rightNode)=>{
		return leftNode > rightNode ? leftNode :  rightNode;
	},
	rotateWithLeftChild: (N)=>{
		Node: n = N.left;
		N.left = n.right;
		n.right = N;
		N.height = this.max(this.height(N.left),this.height(N.right))+1;
		n.height = this.max(this.height(n.left),N.height)+1;
		return N;
	},
	rotateWithRightChild: (N)=>{
		Node: n= N.right;
		N.right = n.left;
		n.left = N;
		N.height = this.max(this.height(N.left),this.height(N.right))+1;
		n.height = this.max(this.height(n.right),N.height)+1;
		return N;
	},
	doubleWithLeftChild: (N)=>{
		N.left = this.rotateWithRightChild(N);
		return this.rotateWithLeftChild(N);
	},
	doubleWithRightChild: (N)=>{
		N.right = this.rotateWithLeftChild(N);
		return this.rotateWithRightChild(N)
	}
}