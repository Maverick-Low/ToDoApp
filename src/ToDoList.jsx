import React from 'react'
import ToDo from './ToDo'

export default function ToDoList( {todos, toggleTodo}) {
  return (
    
    todos.map(todo => {
      return <ToDo key = {todo.id} todo={todo} toggleTodo = {toggleTodo}/>
    })
   
  )
}


