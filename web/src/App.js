import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Main.css';
import './Sidebar.css';

function App() {
  const [users, setUsers] = useState([]);

  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []); // execute once for this component render cycle

  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/users');

      // armazenar em estado
      setUsers(response.data);
    }

    loadUsers();
  }, []);

  async function handleAddUser(e) {
    e.preventDefault();

    const response = await api.post('/users', {
      github_username,
      techs,
      latitude,
      longitude,
    })

    setGithubUsername('');
    setTechs('');
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddUser}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do github</label>
            <input
              name="github_username"
              id="github_username"
              value={github_username}
              onChange={e => setGithubUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs"
              id="techs"
              value={techs}
              onChange={e => setTechs(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="number"
                name="latitude"
                id="latitude"
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
                required
              />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="number"
                name="longitude"
                id="longitude"
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          {users.map(user => (
              <li key={user._id} className="user-item">
                <header>
                  <img src={user.avatar_url} alt={user.name} />
                  <div className="user-info">
                    <strong>{user.name}</strong>
                    <span>{user.techs.join(', ')}</span>
                  </div>
                </header>
                <p>{user.bio}</p>
                <a href={`https://github.com/${user.github_username}`}>Acessar perfil github</a>
              </li>
            ))
          }


        </ul>
      </main>
    </div>
  );
}

export default App;
