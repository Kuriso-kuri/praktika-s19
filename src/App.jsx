import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';

function App() {
  const technologies = [
    { 
      id: 1, 
      title: 'React', 
      description: 'Изучение базовых компонентов React', 
      status: 'completed' 
    },
    { 
      id: 2, 
      title: 'JSX синтаксис', 
      description: 'Освоение синтаксиса JSX', 
      status: 'in-progress' 
    },
    { 
      id: 3, 
      title: 'Что-то еще', 
      description: 'Работа', 
      status: 'not-started' 
    }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Трекер изучения</h1>
        <p>Прогресс в изучении технологий</p>
      </header>
      
      <main>
        <ProgressHeader technologies={technologies} />
        
        <h2>Дорожная карта изучения</h2>
        {technologies.map(tech => (
          <TechnologyCard
            key={tech.id}
            title={tech.title}
            description={tech.description}
            status={tech.status}
          />
        ))}
      </main>
    </div>
  );
}

export default App;