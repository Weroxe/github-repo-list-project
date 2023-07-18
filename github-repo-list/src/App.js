import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
        

import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";

import axios from "axios";
        

function App() {
  const [username, setUsername] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [error, setError] = useState(null);

  function fetchRepositories() {
    axios.get(`https://api.github.com/users/${username}/repos`)
      .then(res => {
        setRepositories(res.data);
        setError(null);
      })
      .catch((error) => {
        setError(error);
        setRepositories([]);
      });
  }

  return (
    <div className="App">
      <div className="App-Container">
        <div>
          <h2>Github Repositories List</h2>
        </div>
        <div className="App-Content">
          <div className="App-Form">
            <label htmlFor="username">Github Username</label>
            <InputText value={username} onChange={(e) => setUsername(e.target.value)} />
          <Button label="Submit" onClick={fetchRepositories}/>
          </div>
          <div className="App-Data">
          {error ? (
              <div className="App-Error">Error: {error.message}</div>
            ) : (
              <ul>
                {repositories.map((repo) => (
                  <li key={repo.id}>{repo.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
