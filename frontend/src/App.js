import './App.css';
import React, {useState , useEffect} from 'react';
import axios  from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoView from './components/TodoListView';

function App() {
  
  const [todoList, setTodoList] = useState([{}])
  const [title, setTitle] = useState('') 
  const [desc, setDesc] = useState('')
  
    

  // Read all todos
  useEffect(() => {
    axios.get('http://localhost:8000/app/todo')
      .then(res => {
        setTodoList(res.data)
      })
  });

  // Post a todo
  const addTodoHandler = () => {
    axios.post('http://localhost:8000/app/todo/', { 'title': title, 'description': desc })
      .then(res => console.log(res))
};
  return (
   
      <div className = "App list-group-item justify-content-centeralign-item-center mx-auto" style={{"width":"400px","background":"white","marginTop":"15px"}}>
        <h1 className ="card text-white bg-secondary mb-1"
        styleName ="max-width: 20rem;">Task Manger
        </h1>
        <h6 className ="card text-white bg-secondary mb-3">
          FastAPI - React - MongoDB
        </h6>
        <div className = "card-body">
          <h5 className = "card text-white bg-dark mb-3">Add Your Task</h5>
          <span className ="card-body">
          <input className="mb-2 form-control titleIn" onChange={event => setTitle(event.target.value)} placeholder='Title'/> 
          <input className="mb-2 form-control desIn" onChange={event => setDesc(event.target.value)}   placeholder='Description'/>
          <button className="btn btn-outline-primary mx-2 mb-3" style={{'borderRadius':'50px',"font-weight":"bold"}}  onClick={addTodoHandler}>Add Task</button>
          </span>
          <h5 className = "card text-white bg-dark mb-3">Your Task</h5>
          <div>
          <TodoView todoList={todoList} />
          </div>
        </div>
        <h6 className ="card text-dark bg-warning py-1 mb-0">
          CopyRight 2021, All right reserved to abhinav &copy; 
        </h6>
      </div>
   
  );
}

export default App;
