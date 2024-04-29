import { useEffect, useState } from 'react'
import './App.css'
import Todo from './component/Todo'
import { addToDo, getAllToDo, updateTodo,deleteTodo } from './utils/HandleApi'

function App() {
  const [toDo, setToDo] = useState([])
  const [text, setText] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [toDoId, setToDoId] = useState('')

  useEffect(() => {
    getAllToDo(setToDo)
  }, [setToDo])

  const updateMode = (_id, text) => {
    setIsUpdating(true)
    setText(text)
    setToDoId(_id)
  }

  return (
    <div className="container">
      <h1>Todo Web Application</h1>
      <div className="top">
        <input
          type="text"
          placeholder='Enter Task...'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="add"
          onClick={isUpdating ?
            () => updateTodo(toDoId, text, setToDo, setText, setIsUpdating)
            :
            () => addToDo(text, setToDo, setText)}>
          {isUpdating && text !== "" ? "Update" : "Add"}
        </div>
      </div>
      <div className="list">
        {toDo.map((item) =>
          <Todo
            key={item._id}
            text={item.text}
            updateMode={() => updateMode(item._id, item.text)}
            deleteTodo={()=> deleteTodo(item._id,setToDo)}
          />
        )}
      </div>
    </div>
  )
}

export default App
