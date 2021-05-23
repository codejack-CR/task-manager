import Header from './components/Header'

import Tasks from './components/Tasks'

import AddTask from './components/AddTask'

import Footer from './components/Footer'

import About from './components/About'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { useState } from "react"

import { useEffect } from "react"

const BASE_DB_URL = 'http://localhost:5000/tasks'

function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()

      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    let data = await fetch(BASE_DB_URL)
    let res = await data.json()
    return res;
  }

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`${BASE_DB_URL}/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter((t) => t.id !== id))
  }

  //Fetch Tasks
  const fetchTask = async (id) => {
    let data = await fetch(`${BASE_DB_URL}/${id}`)
    let res = await data.json()
    return res;
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {

    let taskToToggle = await fetchTask(id)

    let updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`${BASE_DB_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    let data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  //Add Task
  const addTask = async (task) => {
    let res = await fetch(BASE_DB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    })

    let data = await res.json()

    setTasks([...tasks, data])
  }

  //Toggle Form
  const toggleForm = () => {
    setShowAddTask(!showAddTask)
  }

  return (
    <Router>
      <div className="App">
        <Header onAdd={toggleForm} showAdd={showAddTask} />

        <Route path="/" exact render={(props) =>
          <>
            {showAddTask && <AddTask onAdd={addTask} />}

            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks'}

            <Footer />
          </>
        } />

        <Route path="/about" component={About} />
      </div>
    </Router>
  )
}

export default App;
