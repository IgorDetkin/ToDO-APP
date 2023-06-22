import React, { useEffect, useState, useRef} from 'react';
import './App.css';
import { ITodo } from '../../types/data';
import TodoList from '../TodoList/TodoList';
import { FilterValuesType } from '../../types/filterValues';




const App: React.FC = () => {

    const [value, setValue] = useState('');
    const [todos, setTodos] = useState<ITodo[]>([]);

    const [filter, setFilter] = useState<FilterValuesType>("all");

    const [countCurrent, setCountCurrent] = useState(0);




    let todosForToDoList = todos;
    if(filter === "completed") {
        todosForToDoList = todos.filter(todo => todo.complete === true);
    }
    if(filter === "active") {
        todosForToDoList = todos.filter(todo => todo.complete === false);
    }



    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }


    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange:React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value)
    }


    const handleKeyDown:React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if(e.key === 'Enter')
        addTodo();
    }

    const addTodo = () => {
        let regex = /^(?! )/; //начинается не с пробела
        if (value && value.match(regex)) {
            setTodos([...todos, {
                id: Date.now(),
                title:value,
                complete: false,
            }])
            setValue('');
        }
    }

    const removeTodo = (id: number): void => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    // не до конца понял, нужно очищать таски от меток выполнения или прям удалять их. Подготовил два варианта.
    const removeTodoAllChecked = () => {
        // setTodos(todos.map((todo) => {
        //     return {
        //         ...todo,
        //         complete: false
        //     }
        // })
        // )
           setTodos(todos.filter(todo => todo.complete !== true))
    }

    
    const toggleTodo = (id: number): void => {
        setTodos(todos.map((todo) => {
            if(todo.id !== id) return todo; 
            else return {
                ...todo,
                complete: !todo.complete
            }
        })
        )

    }


    useEffect(() => {
        if(inputRef.current) inputRef.current.focus();
    }, [])


    
    useEffect(() => {
        let todosForCountActive =  todos.filter(todo => todo.complete === false);
        setCountCurrent(todosForCountActive.length);
    }, [todos])


  return (
    <div className="root">
        <div className="root__container">
            <div className="root__wrapper">
            <h1 className="title">ToDo APP</h1>
            <div className="form">
                <input 
                    className="form__input"
                    type="text" 
                    maxLength={50}
                    placeholder='добавить задачу'
                    value={value}
                    onChange={handleChange}
                    ref={inputRef}
                    onKeyDown={handleKeyDown}
                    required
                    data-testid="input"
                    />
                <button 
                    onClick={addTodo}
                    className="form__add-button"
                    data-testid="add"
                ></button>
            </div>
            <TodoList
                items={todosForToDoList}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
            />
            </div>

            <div className="control-panel">
                <p className="control-panel__counter">{countCurrent} items select</p>
                <div className="control-panel__nav">
                    <button 
                        onClick={() => {changeFilter("all")}} 
                        className="control-panel__nav-button"
                    >All</button>
                    <button 
                        onClick={() => {changeFilter("active")}} 
                        className="control-panel__nav-button"
                    >Active</button>
                    <button 
                        onClick={() => {changeFilter("completed")}} 
                        className="control-panel__nav-button"
                    >Completed</button>
                </div>
                <button 
                    className="control-panel__nav-button control-panel__nav-button_long"
                    onClick={removeTodoAllChecked}
                >Clear completed</button>
            </div>
        </div>
    </div >
  )
}

export default App;