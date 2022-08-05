import { useState } from "react"
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
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

  const deleteTask = (id) => {
    setTasks(tasks.filter( (task)=> task.id !== id ))
  }

  return (
    <div className="container">
      <Header/>
      {tasks.length > 0 ?
        <Tasks tasks={tasks} onDelete={deleteTask} /> : 'No task found'}
    </div>
  );
}

export default App;
