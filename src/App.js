import { useState } from "react"
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Doctors Appointment',
        day: 'Feb 5th at 2:00PM',
        reminder: true,
    },
    {
        id: 2,
        text: 'Meeting at School ',
        day: 'Feb 6th at 1:00PM',
        reminder: true,
    },
    {
        id: 3,
        text: 'Shopping',
        day: 'Feb 5th at 5:00PM',
        reminder: false,
    }
  ])

  // Add Task
  const taskAdd = (task) => {
    const id = Math.floor(Math.random()*1000 +1);
    const newTask = {id, ...task}
    console.log(newTask)
    setTasks([...tasks, newTask]);
  }

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter( (task)=> task.id !== id ))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task)=> task.id === id ? {...task, reminder:!task.reminder } : task
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
