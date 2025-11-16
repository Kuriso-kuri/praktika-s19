import './App.css';
import { useState } from 'react';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import TechnologyStatistics from './components/TechnologyStatistics';
import QuickActions from './components/QuickActions';
import TechnologyFilter from './components/TechnologyFilter';

function App() {
  const [technologies, setTechnologies] = useState([
    { 
      id: 1, 
      title: 'React', 
      description: 'Изучение базовых компонентов React', 
      status: 'not-started' 
    },
    { 
      id: 2, 
      title: 'JSX Синтаксис', 
      description: 'Освоение синтаксиса JSX', 
      status: 'not-started' 
    },
    { 
      id: 3, 
      title: 'Что-то еще', 
      description: 'Что-то еще', 
      status: 'not-started' 
    },
    { 
      id: 4, 
      title: 'И еще что-то еще', 
      description: 'И еще что-то еще', 
      status: 'not-started' 
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  const handleStatusChange = (technologyId) => {
    setTechnologies(prevTechnologies => 
      prevTechnologies.map(tech => {
        if (tech.id === technologyId) {
          const statusOrder = ['not-started', 'in-progress', 'completed'];
          const currentIndex = statusOrder.indexOf(tech.status);
          const nextIndex = (currentIndex + 1) % statusOrder.length;
          return {
            ...tech,
            status: statusOrder[nextIndex]
          };
        }
        return tech;
      })
    );
  };

  const handleUpdateAllStatuses = (newStatus) => {
    setTechnologies(prevTechnologies => 
      prevTechnologies.map(tech => ({
        ...tech,
        status: newStatus
      }))
    );
  };

  const handleRandomSelect = (technologyId) => {
    setTechnologies(prevTechnologies => 
      prevTechnologies.map(tech => 
        tech.id === technologyId 
          ? { ...tech, status: 'in-progress' }
          : tech
      )
    );

    setTimeout(() => {
      const element = document.getElementById(`tech-${technologyId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('highlight-random');
        setTimeout(() => {
          element.classList.remove('highlight-random');
        }, 2000);
      }
    }, 100);
  };

  const filteredTechnologies = activeFilter === 'all' 
    ? technologies 
    : technologies.filter(tech => tech.status === activeFilter);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Трекер изучения</h1>
        <p>Отслеживайте прогресс в изучении технологий</p>
      </header>
      
      <main>
        <ProgressHeader technologies={technologies} />
        <TechnologyStatistics technologies={technologies} />
        <QuickActions 
          technologies={technologies}
          onUpdateAllStatuses={handleUpdateAllStatuses}
          onRandomSelect={handleRandomSelect}
        />
        <TechnologyFilter 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          technologies={technologies}
        />
        
        <h2>Дорожная карта изучения</h2>
        {filteredTechnologies.length === 0 ? (
          <div className="no-results">
            <p>🚫 Нет технологий в этом фильтре</p>
          </div>
        ) : (
          filteredTechnologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              id={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default App;