class Queue():
	arr = []
	head = 0
	def __init__ (self):
		self.items = []

	def enqueue(self,item):
		self.items.insert(0,item)

	def deque(self):
		return self.items.pop()

	def lol(self):
		print self.items 	
	


if __name__ == '__main__':
	queue = Queue()
	queue.enqueue(2)
	queue.lol()
	queue.deque()
	queue.lol()

