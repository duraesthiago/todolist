import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { Header } from '../../components/Header';
import { Tasks } from '../../components/Tasks';
import { ExitButton } from '../../components/ExitButton';
import axios from 'axios';

const LOCAL_STORAGE_KEY = 'todo:savedTasks';
const urlBase = 'http://localhost:3000';

export function ViewTask() {
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
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  function addTask(taskText) {
    let userLogged = JSON.parse(sessionStorage.user);

    let headers = {
      'Content-type': 'application/json; charset=UTF-8',
      authorization: `bearer ${sessionStorage.getItem('token')}`,
    };

    let newTask = axios
      .post(
        `${urlBase}/tasks/`,
        {
          task_text: taskText,
          users_idusers: userLogged.idusers,
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        setTasksAndSave([...tasks, response.data.task]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function toggleTaskCompletedById(taskId) {
    let headers = {
      'Content-type': 'application/json; charset=UTF-8',
      authorization: `bearer ${sessionStorage.getItem('token')}`,
    };

    let taskToToggle = tasks.find((task) => {
      return task.idtasks == taskId;
    });

    taskToToggle.task_done == 0
      ? (taskToToggle.task_done = 1)
      : (taskToToggle.task_done = 0);

    let toggleTask = axios
      .post(
        `${urlBase}/tasks/done`,
        {
          ...taskToToggle,
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        //console.log(response);
        loadSavedTasks();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function deleteTaskById(taskId) {
    let headers = {
      'Content-type': 'application/json; charset=UTF-8',
      authorization: `bearer ${sessionStorage.getItem('token')}`,
    };

    let deletedTask = axios
      .post(
        `${urlBase}/tasks/delete`,
        {
          idtasks: taskId,
        },
        {
          headers: headers,
        }
      )
      .then(function (response) {
        //console.log(response);
        loadSavedTasks();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Header onAddTask={addTask} />
      <Tasks
        tasks={tasks}
        onComplete={toggleTaskCompletedById}
        onDelete={deleteTaskById}
      />
      <ExitButton />
    </>
  );
}
