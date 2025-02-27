import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
  }, []);

  // Save todos to local storage
  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // Add a new task
  const handleAdd = () => {
    if (todo.trim()) {
      const newTodo = { id: uuidv4(), todo, isCompleted: false };
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      saveToLS(newTodos);
      setTodo("");
    }
  };

  // Edit an existing task
  const handleEdit = (id) => {
    const taskToEdit = todos.find(item => item.id === id);
    if (taskToEdit) {
      setTodo(taskToEdit.todo);
      handleDelete(id); // Remove the task to prepare for the edit
    }
  };

  // Delete a task
  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  // Handle checkbox change
  const handleCheckbox = (id) => {
    const newTodos = todos.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  // Toggle show finished tasks
  const toggleFinished = () => {
    setShowFinished(prev => !prev);
  };

  // Remove all tasks
  const handleRemoveAll = () => {
    setTodos([]);
    saveToLS([]); // Clear local storage
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 p-5 rounded-xl bg-blue-100 min-h-[80vh]">
        <h1 className='text-xl text-center font-bold my-5 underline'>K-Task - Manage All Your Tasks At One Place</h1>
        <div className="addTodo">
          <h2 className='text-lg font-bold'>Add a Task</h2>
          <input
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            type="text" 
            className='w-[60vw] h-8 rounded-md my-5'
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 2}
            className='bg-blue-700 hover:bg-blue-900 text-white p-3 py-1 rounded-md m-5 font-bold'
          >
            Save
          </button>
        </div>

        <div className="flex items-center mb-4">
          <input
            onChange={toggleFinished}
            type="checkbox"
            className="m-2"
            checked={showFinished}
          /> 
          <label className="mr-4">Show Finished Tasks</label>
          <button
            onClick={handleRemoveAll}
            className='bg-red-700 hover:bg-red-900 text-white p-3 py-1 rounded-md font-bold'
          >
            Remove All Tasks
          </button>
        </div>

        <h2 className='text-lg font-bold'>Your List</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-4'>No Task to display</div>}
          {todos.map(item => (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex my-3 max-w-1/4 justify-between">
                <div className="flex gap-5">
                  <input
                    name={item.id}
                    onChange={() => handleCheckbox(item.id)}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className='bg-blue-700 hover:bg-blue-900 text-white p-3 py-1 rounded-md mx-1 font-bold'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='bg-blue-700 hover:bg-blue-900 text-white p-3 py-1 rounded-md mx-1 font-bold'
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
