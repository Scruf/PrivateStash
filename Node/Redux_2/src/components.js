import React from 'react';


export function Todo(props){
	const { todo } = props;
	if (todo.isDone){
		return <strike>{todo.text}</strike>
	}else{
		return <span>{todo.text}</span>
	}
}
export function ToDoList (props){
	const {todo} = props;
	return (
		<div className="todo">
			<input type="text" placeholder="Add todo" />
			  <ul className = "todo__list">
			  	{todos.map(t=>(
			  		<li  key={t.id} className="todo_item">
			  			<Todo todo={t} />
			  		</li>
			  	))}
			  </ul>
			 </div>

	);
}