import React,{useState,useRef,useEffect} from 'react'
import './Todo.css'
import {IoMdDoneAll} from "react-icons/io";
import {FiEdit} from "react-icons/fi";
import {MdDelete} from "react-icons/md"
export default function Todo(){
    const[todo,setToDo] = useState('');
    const[todos,setToDos] = useState([])
    const[editId,setEditId] = useState(0)
    const handleSubmit = (e) =>{
        e.preventDefault();
    }
    const addTodo = () =>{
        if(todo !== '' ){
        setToDos([...todos,{list : todo , id : Date.now(),status: false,}])
        setToDo('')
    }
    if (editId) {
        const updatedTodos = todos.map((item) =>
          item.id === editId ? { ...item, list: todo } : item
        );
        setToDos(updatedTodos);
        setEditId(0);
        setToDo('');
      } else {
        setToDos([...todos, { list: todo, id: Date.now(), status: false }]);
        setToDo('');
      }
    }
    const inputRef = useRef('null')
    useEffect(()=>{
        inputRef.current.focus()
    })
    const onDelete = (id)=>{
      setToDos(todos.filter((todo)=> todo.id !== id))
    }
    const onComplete = (id)=>{
       let complete = todos.map((todo)=>{
        if(todo.id === id){
        return ({...todo , status:!todo.status})
    }
    return todo
       })
       setToDos(complete)
    }
    const onEdit = (id)=>{
      const editTodo =  todos.find((todo)=>todo.id === id)
      setToDo(editTodo.list)
      setEditId(editTodo.id)
    }
    return(
<div className="container">
    <h2>TODO APP</h2>
    <form className='form-group'onSubmit={handleSubmit}>
        <input type="text" 
            placeholder='Enter your todo' 
            className='form-control' 
            ref={inputRef}
            value={todo} 
            onChange={(e)=>setToDo(e.target.value)}
        />
        <button onClick={addTodo}>{editId ? 'Edit' : 'Add'}</button>
    </form>
    <div className='list'>
        <ul>
            {
                todos.map((todo,id)=>{
                    return(
                    <li key={id} className="list-items">
                        <div className = "list-item-list" id={todo.status ? 'list-item' :'null'}>{todo.list}</div>
                    <span>
                    <IoMdDoneAll 
                    className='list-item-icons' 
                    id='complete'
                    title='Complete'
                    onClick={()=>onComplete(todo.id)}
                    />
                    <FiEdit 
                    className='list-item-icons' 
                    id='edit' 
                    title='Edit'
                    onClick={()=>onEdit(todo.id)}
                    />
                    <MdDelete 
                    className='list-item-icons' 
                    id='delete' 
                    title='Delete' 
                    onClick={()=>onDelete(todo.id)}/>
                    </span>
                    </li>
                    )})
            }
        </ul>
    </div>
</div>
    );
}