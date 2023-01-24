import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { Login } from '../Login';
import { ViewTask } from '../ViewTask';
import { Header } from '../../components/Header';
import { Tasks } from '../../components/Tasks';
import { CreateUser } from '../CreateUser';
import axios from 'axios';

const LOCAL_STORAGE_KEY = 'todo:savedTasks';
const urlBase = 'http://localhost:3000';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route path="/task" element={<ViewTask />}></Route>
        <Route path="/createUser" element={<CreateUser />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
