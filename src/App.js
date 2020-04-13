import React, {useState, useEffect} from "react";
import { Form, Input } from '@rocketseat/unform'
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  async function handleAddRepository(data, { resetForm }) {
    const response = await api.post('/repositories', {
      title: `${data.repositoryTitle}`,
      url: `${data.repositoryUrl}`,
      techs: ['1', '2'],
    })
    setRepositories([...repositories, response.data]);
    // resetForm()
  }
  
  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
    // setRepositories(repositories.splice(repositoryIndex, 1));
  }
  useEffect(() => {
    api.get('/repositories').then(response => {setRepositories(response.data)}
    );
  }, [repositories]);
  
  return (
    <div>
      <h1>Repository List</h1>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
        <li key={repository.id}>
          {`title: ${repository.title}, URL: ${repository.url}`}
          <button key={repository.id} onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>))
        }
      </ul>
      <Form onSubmit={handleAddRepository}>
          <Input name="repositoryTitle" type="text" placeholder="Repository Title..."/>
          <Input name="repositoryUrl" type="text" placeholder="Repository Title..."/>
          <button type="submit">Adicionar</button>
      </Form>
    </div>
  );
}
export default App;
