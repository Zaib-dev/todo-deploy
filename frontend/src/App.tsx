import { useState, useEffect } from 'react'
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
type Todo = {
  id: number
  title: string
  done: boolean
}
function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState("")

  const api_url="http://localhost:3000/"

  useEffect(() => {
    getAllTodos (); 
  }, []);

  const getAllTodos = async () => {
    try {
      
      const response = await axios.get(`${api_url}api/todos`);

      setTodos(response.data.allTodos);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

const addTodo = async () => {
  try {
    // Send a GET request to fetch posts
    const todo = {title}
    const response = await axios.post(`${api_url}api/todos`, todo);
    setTodos((previousTodos)=> {
      return [...previousTodos, response.data];
    })
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const handleDoneTodo = async (id: number) => {
  try {
    // Send a GET request to fetch posts
    const todoId = id
    //console.log(todoId);
    await axios.put(`${api_url}api/todos/${todoId}`);
    setTodos((previousTodos)=> {
      previousTodos.map((todo)=> {
        if (todo.id === todoId) {
          todo.done =!todo.done
        }
      })
      return [...previousTodos]
    })
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

const notDoneStyle = { color: 'black' };
const doneStyle = {textDecoration: 'line-through', color: '#555' };

const handleDeleteTodo = async (id: number) => {
  try {
    const todoId = id
    await axios.delete(`${api_url}api/todos/${todoId}`);
    getAllTodos (); 

  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center"}}>
      <h1>Todo App</h1>
      <input type="text" placeholder='Title' value={title} onChange={(e)=> setTitle(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
      {todos.map((todo) => {
        return (
          <div key={todo.id} style={{display: "flex", alignItems: "center"}}>
            <Checkbox {...label} onChange={() => handleDoneTodo(todo.id)} checked={todo.done ? true : false} />
            <p style={todo.done ? doneStyle : notDoneStyle}>{todo.title}</p>
            <a style={{marginLeft: "auto", textDecoration: "none", }} onClick={() => handleDeleteTodo(todo.id)}><RemoveCircleOutlineRoundedIcon /></a>
          </div>
        )
      }
        )}
    </div>
  )
}

export default App
