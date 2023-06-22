import React from 'react';
import './TodoList.css';
import { TodoItem } from '../TodoItem/TodoItem';
import { ITodo } from '../../types/data';

export interface ItodoListProps {
    items: ITodo[];
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
}

 const TodoList:React.FC<ItodoListProps> = ({items, toggleTodo, removeTodo}) => {
  return (
    <section className="list" data-testid="list-placeholder">
      	{items.map((todo) => 
          <TodoItem
            key={todo.id}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
            {...todo}
          />)}
    </section>
  )
}

export default TodoList;
