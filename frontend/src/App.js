itimport React from 'react';
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrash,faFloppyDisk,faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import axios from 'axios'

function App()
{
  const [todo,setTodo]=useState([])
  const [input,setInput]=useState("")
  const [editingItemId,setEditingItemId]=useState(null)
  const [editedItemName,setEditedItemName]=useState("")

  useEffect(()=>{fetchTodos();},[])

  async function updateTodo(id)
  {
    const response=await axios.get(`https://todo-withapi-aeaw.vercel.app/get/${id}`)
    fetchTodos()
  }


  async function  fetchTodos()
  {
    const response=await axios.get('https://todo-withapi-aeaw.vercel.app/get');
    setTodo(response.data)
  }

  async function  deleteTodo(id)
  {
    const response=await axios.delete(`https://todo-withapi-aeaw.vercel.app/delete/${id}`);
    fetchTodos()
  }

  function changeInput(e)
  {
    setInput(e.target.value)
  }


  async function submit()
  {
    const response=await axios.post('https://todo-withapi-aeaw.vercel.app/post',{
      todo:input,
      status:false
    });
    fetchTodos()
    setInput("")
  }

  async function saveEditItem(id)
  {
    const response=await axios.put(`https://todo-withapi-aeaw.vercel.app/edit/${id}`,{
      todo:editedItemName
    })
    fetchTodos()
    setEditingItemId(null)
    setEditedItemName("")
  }



  function handleEditItem(item)
  {
    setEditingItemId(item._id)
    setEditedItemName(item.todo);
  }

  function cancelEditItem(id)
  {
    setEditingItemId(null)
    setEditedItemName("");
  }


  function handleInputChange(event)
  {
    setEditedItemName(event.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 offset-md-4 col-sm-6 offset-sm-3 col-10 offset-1">
          <h2 className="text-center p-3 mt-5 text-white"><b>TO-DO LIST</b></h2>
          <div className="input-group mb-3 mt-3">
            <input type="text" className="form-control" placeholder="Enter the next task" aria-label="Recipient's username" aria-describedby="button-addon2" value={input} onChange={changeInput}/>
            <button className="btn btn-outline-white btn-success" type="button" id="button-addon2" onClick={submit}>ADD TASK</button>
          </div>
          <div>
            <ul className="list-unstyled">
              {
              todo.map((item)=>( <li key={item._id}>
                {
                  (editingItemId===item._id)?(<div className="bg-white border rounded mt-1 d-flex justify-content-between align-items-center">
                  <input autoFocus type="input" onChange={handleInputChange} value={editedItemName} className="form-control-plaintext w-100 ms-2" />
                  <div className="d-flex">
                    <button className="btn btn-default" onClick={()=>saveEditItem(item._id)}  style={{ padding: 0, backgroundColor: 'transparent', border: 'none' }}>
                    <FontAwesomeIcon icon={faFloppyDisk} /> {/* corrected icon name */}
                    </button>
                    <button className="btn btn-default ms-2 pe-2" onClick={()=>cancelEditItem(item._id)} style={{ padding: 0, backgroundColor: 'transparent', border: 'none' }}>
                    <FontAwesomeIcon icon={faCircleXmark} /> {/* corrected icon name */}
                    </button>
                  </div>
                </div>)
                
                :(<div className="bg-white rounded p-2 mt-1 d-flex justify-content-between align-items-center">
                  <div className="task-description">
                    <input type="checkbox" checked={item.status} onChange={()=>updateTodo(item._id)} />
                    <label style={{textDecoration:item.status?'line-through':'none'}}>{' '+ item.todo}</label>
                  </div>
                  <div className="d-flex">
                    <button className="btn btn-default" onClick={()=>handleEditItem(item)} style={{ padding: 0, backgroundColor: 'transparent', border: 'none' }}>
                      <FontAwesomeIcon icon={faPenSquare} /> {/* corrected icon name */}
                    </button>
                    <button className="btn btn-default ms-2" onClick={()=>deleteTodo(item._id)}  style={{ padding: 0, backgroundColor: 'transparent', border: 'none' }}>
                      <FontAwesomeIcon icon={faTrash} /> {/* corrected icon name */}
                    </button>
                  </div>
                </div>)
                }
              </li>))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
