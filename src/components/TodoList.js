import React from 'react';

function Todolist({ item, deleteItem }) {
  return (
    <li className="list-item">
      {item.title}
      <span className="icons">
        <i
          className="fa-solid fa-trash-can icon-delete"
          onClick={deleteItem}
        ></i>
      </span>
    </li>
  );
}

export default Todolist;
