import React from 'react';
import './TodoItem.css';
import Checkbox from '../UI/checkbox/checkbox'
import { ITodo } from '../../types/data';
interface ITodoItem extends ITodo {
    toggleTodo: (id: number) => void;
    removeTodo: (id: number) => void;
}

export const TodoItem:React.FC<ITodoItem> = ({ id, title, complete, removeTodo, toggleTodo }) => {

    const titleClassName = (`item__title ${complete ? 'item__title_completed' : ''}`);
  
  
    return (
    <div className='item' data-testid="item-testid">
        <Checkbox
            type="checkbox" 
            checked={complete}
            onChange={() => toggleTodo(id)}
        />
        <p className={titleClassName}>{title}</p>
        <button 
            onClick={() => removeTodo(id)}
            className="item__button-remove"    
        >X</button>
    </div>
  )
}
