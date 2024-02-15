import './App.css';
import React, {useState, useRef, useEffect} from 'react'
import ToDoList from './ToDoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {

	const [todos, setTodos] = useState([]);
	const todoNameRef = useRef();

	// Load to do items stored in local storage once on start up
	useEffect( () => {
		const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

		if(storedTodos) {
			setTodos(prevTodos => [...storedTodos]);
		}
	
	}, [])

	// Save todos to local storage so it stays when page is refreshed
	useEffect( () => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
	}, [todos])

	// Add an item to the to do list
	function addToDo() {
		const name = todoNameRef.current.value
		setTodos(prevArray => {
			return [...prevArray, {id: uuidv4(), name: name, complete: false}]
		});

		todoNameRef.current.value = null;
	}


	// Toggle completed checkbox
	function toggleTodo(id) {
		// Copy current to do list
		const newTodos = [...todos];

		// Find to do to check
		const todo = newTodos.find(todo => todo.id === id);
		todo.complete = !todo.complete;
		setTodos(newTodos);
	}

	// Clear all
	function clearAll() {
		const newTodos = [];
		setTodos(newTodos);
	}

	// Clear completed
	function clearCompleted() {
		const uncompletedTodos = todos.filter( todo => !todo.complete);
		setTodos(uncompletedTodos);
	}



	return(
		
		<>	
			< ToDoList todos = {todos} toggleTodo = {toggleTodo} />
			<input ref={todoNameRef} type = "text" />
			<button onClick = {addToDo}> Add To Do</button>
			<button onClick = {clearCompleted}> Clear Complete </button>
			<button onClick = {clearAll}> Clear All</button>
			<div> {todos.filter(todo => !todo.complete).length}</div>
		</>
	)
}

export default App;
