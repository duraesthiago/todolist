import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { Login } from '../Login';
import { Header } from '../../components/Header';
import { Tasks } from '../../components/Tasks';
import { CreateUser } from '../CreateUser';
import axios from 'axios';

const LOCAL_STORAGE_KEY = 'todo:savedTasks';
const urlBase = 'http://localhost:3000';

function Home() {
  const [tasks, setTasks] = useState([]);

  function loadSavedTasks() {
    let headers = {
      'Content-type': 'application/json; charset=UTF-8',
      authorization: `bearer ${sessionStorage.getItem('token')}`,
    };

    let userLogged = JSON.parse(sessionStorage.user);

    const savedTasks = axios
      .get(`${urlBase}/tasks/${userLogged.idusers}`, {
        headers: headers,
      })
      .then((response) => {
        console.log(
          '🚀 ~ file: index.jsx:36 ~ .then ~ response.data',
          response.data
        );
        setTasks(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return savedTasks;
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  function setTasksAndSave(newTasks) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  // function addTask(taskText) {
  //   setTasksAndSave([
  //     ...tasks,
  //     {
  //       id: crypto.randomUUID(),
  //       title: taskText,
  //       isComplete: false,
  //     },
  //   ]);
  // }

  function addTask(taskText) {
    let newTask = axios
      .post(`${urlBase}/tasks/`, {
        task_text: taskText,
        users_idusers: userLogged.idusers,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    setTasksAndSave([...tasks, newTask]);
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
