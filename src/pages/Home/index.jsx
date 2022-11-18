import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { Login } from '../Login';
import { Header } from '../../components/Header';
import { Tasks } from '../../components/Tasks';
import { CreateUser } from '../CreateUser';

const LOCAL_STORAGE_KEY = 'todo:savedTasks';

function Home() {
  const [tasks, setTasks] = useState([]);

  function loadSavedTasks() {
    const savedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function addTask(taskText) {
    setTasksAndSave([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: taskText,
        isComplete: false,
      },
    ]);
  }

  function toggleTaskCompletedById(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isComplete: !task.isComplete,
        };
      }
      return task;
    });
    setTasksAndSave(newTasks);
  }

  function deleteTaskById(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasksAndSave(newTasks);
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route
          path="/task"
          element={
            <>
              <Header onAddTask={addTask} />
              <Tasks
                tasks={tasks}
                onComplete={toggleTaskCompletedById}
                onDelete={deleteTaskById}
              />
            </>
          }
        ></Route>
        <Route path="/createUser" element={<CreateUser />}></Route>
      </Routes>
    </Router>
  );
}

export default Home;
