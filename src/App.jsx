import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

const toggleFinished = (params)=>{
  setshowFinished(!showFinished)
}

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    saveToLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex(item => {
      return item.id == id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="container mx-3 md:mx-auto p-5 my-5 rounded-xl bg-violet-200 min-h-[80vh] md:w-1/2">
        <div className="harry my-5 flex flex-col gap-4">
          <h1 className="font-bold text-xl text-center">sTask-Manage Your Todo's at One Place</h1>
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="bg-white rounded-[3px] w-full p-2" placeholder='Enter your Todo here...' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-purple-700 py-1 px-3 font-bold cursor-pointer text-white rounded-[5px] hover:bg-purple-800'>Add</button>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} className="src" />Show Finished
        <h2 className='text-lg font-bold my-4'>Your Todos</h2>
        <div className="todos">
          {todos.length == 0 && <div className='m-5 text-xl font-medium text-red-600'>No Todos to Display</div>}
          {todos.map(item => {


            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
              <div className="flex gap-5">
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} className="src" name={item.id} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-purple-700 py-1 px-3 mx-1 font-bold cursor-pointer text-white rounded-[5px] hover:bg-purple-800'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-purple-700 py-1 px-3 mx-1 font-bold cursor-pointer text-white rounded-[5px] hover:bg-purple-800'><MdDeleteForever /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
