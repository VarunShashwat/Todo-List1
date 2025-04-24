import React, { useState, useEffect } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import Todolist from './components/TodoList';
import axios from 'axios';

function App() {
  const [listTodo, setListTodo] = useState([]);

 
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10') 
      .then((response) => {
        setListTodo(response.data); 
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

      const addTodo = (newPost) => {
        axios.post('https://jsonplaceholder.typicode.com/posts', newPost, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          }
        })
        .then((response) => {
          setListTodo((prev) => [...prev, response.data]);
        })
        .catch((err) => console.error('Error posting todo:', err));
      };
  };
}

  
  const deleteListItem = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .then(response=>{
      const updatedList = listTodo.filter((item) => item.id !== id);
      setListTodo(updatedList);
    })
    .catch((err) => console.error('Error deleting todo:', err));
  }



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
