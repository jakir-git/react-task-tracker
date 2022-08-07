import { useState, useEffect } from "react"
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }
    getTasks()
  }, [])

  // Fetch tasks
  const fetchTasks =  async ()=> {
    const response = await fetch('http://localhost:5000/tasks');
    const data = await response.json()
    return data
  }

   // Fetch task
   const fetchTask =  async (id)=> {
    const response = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await response.json()
    return data
  }

  // Add Task
  const taskAdd = async (task) => {
    const response = await fetch('http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task),
    });

    const data = await response.json()
    setTasks([...tasks, data])

    // const id = Math.floor(Math.random()*1000 +1);
    // const newTask = {id, ...task}
    // console.log(newTask)
    // setTasks([...tasks, newTask]);
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE',
    })
    setTasks(tasks.filter( (task)=> task.id !== id ))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToggle = await fetchTask(id)
    const updateTask = {...taskToggle, reminder: !taskToggle.reminder}
    
    const response = await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateTask),
    });

    const data = await response.json()

    setTasks(
      tasks.map((task)=> task.id === id ? {...task, reminder:data.reminder } : task
        )
      )
  }

  return (
    <div className="container">
      <Header 
      onAdd={()=> setShowAddTask(!showAddTask)}
      showAdd={showAddTask}
      />
      { showAddTask && <AddTask onAdd={taskAdd}/>}
      {tasks.length > 0 ?
        <Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask} /> : 'No task found'}
    </div>
  );
}

export default App;
