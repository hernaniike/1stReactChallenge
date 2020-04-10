import React, {useState, useEffect} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 't',
      url: 'x',
      techs: ['1', '2'],
    })
    setRepositories([...repositories, response.data])
  }
  
  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
    // setRepositories(repositories.splice(repositoryIndex, 1));
  }
  useEffect(() => {
    api.get('/repositories').then(response => {setRepositories(response.data)}
    );
  }, []);
  
  return (
    <div>
      <h1>Repository List</h1>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
        <li key={repository.id}>
          {repository.title}
          <button key={repository.id} onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>))
        }
      </ul>
        <button onClick={() => handleAddRepository()}>Adicionar</button>
    </div>
  );
}
export default App;
