import React, { useState, useEffect } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import Todolist from './components/TodoList';

function App() {
  const [listTodo, setListTodo] = useState([]);

 
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10') 
      .then((response) => response.json())
      .then((data) => {
        setListTodo(data); // set to state
      })
      .catch((err) => console.error('Error fetching posts:', err));
  }, []);

  
  const addList = (inputText) => {
    if (inputText.trim() !== '') {
      const newPost = {
        title: inputText,
        body: ' new todo',
        userId: 1,
      };

      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newPost),
      })
        .then((response) => response.json())
        .then((data) => {
          setListTodo((prev) => [...prev, data]);
        })
        .catch((err) => console.error('Error posting todo:', err));
    }
  };

  
  const deleteListItem = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          const updatedList = listTodo.filter((item) => item.id !== id);
          setListTodo(updatedList);
        } else {
          console.error('Failed to delete item');
        }
      })
      .catch((err) => console.error('Error deleting todo:', err));
  };

  return (
    <div className="main-container">
      <div className="center-container">
        <TodoInput addList={addList} />
        <h1 className="app-heading">TODO</h1>
        <hr />

        {listTodo.length === 0 ? (
          <p>Loading todos...</p>
        ) : (
          listTodo.map((listItem) => (
            <Todolist
              key={listItem.id}
              item={listItem}
              deleteItem={() => deleteListItem(listItem.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
