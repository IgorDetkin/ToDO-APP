import React from 'react';
import './checkbox.css';

function Checkbox(props: any) {
    const checkboxClassName = (`checkbox__wrapper ${props.checked ? 'checkbox__wrapper_active' : ''}`);

  return (
    <div className={checkboxClassName}>
    <input 
        className="checkbox__field"
        {...props}
        // type="checkbox" 
        // checked={complete}
        // onChange={() => toggleTodo(id)}
    />
</div>
  )
}

export default Checkbox;
