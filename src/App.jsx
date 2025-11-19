import './App.css';
import { useState, useEffect } from 'react';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import TechnologyStatistics from './components/TechnologyStatistics';
import QuickActions from './components/QuickActions';
import TechnologyFilter from './components/TechnologyFilter';
import SearchBox from './components/SearchBox'; // Добавляем импорт

// Дефолтные технологии
const getDefaultTech = () => [
  { 
    id: 1, 
    title: 'React', 
    description: 'Изучение базовых компонентов React', 
    status: 'not-started',
    notes: ''
  },
  { 
    id: 2, 
    title: 'JSX Синтаксис', 
    description: 'Освоение синтаксиса JSX', 
    status: 'not-started',
    notes: '' 
  },
  { 
    id: 3, 
    title: 'Hooks', 
    description: 'useState, useEffect и другие хуки', 
    status: 'not-started',
    notes: ''
  },
  { 
    id: 4, 
    title: 'Props', 
    description: 'Работа с пропсами и компонентами', 
    status: 'not-started',
    notes: ''
  }
];

function App() {
  const [technologies, setTechnologies] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState(''); // Состояние для поиска

  // Загрузка данных
  useEffect(() => {
    const saved = localStorage.getItem('techTrackerData');
    console.log('RAW LOCALSTORAGE:', saved);
    
    let dataToSet = getDefaultTech();
    
    if (saved && saved !== '[]' && saved !== 'null' && saved !== 'undefined') {
      try {
        const parsed = JSON.parse(saved);
        console.log('PARSED DATA:', parsed);
        dataToSet = parsed;
      } catch (e) {
        console.error('PARSE ERROR:', e);
      }
    } else {
      console.log('NO SAVED DATA, LOADING DEFAULT');
    }

    setTimeout(() => {
      setTechnologies(dataToSet);
      setIsLoaded(true);
    }, 0);
  }, []);

  // Сохранение данных
  useEffect(() => {
    if (technologies.length > 0) {
      console.log('SAVING TO LOCALSTORAGE:', technologies);
      localStorage.setItem('techTrackerData', JSON.stringify(technologies));
    }
  }, [technologies]);

  // Фильтрация технологий по поисковому запросу
  const filteredBySearch = technologies.filter(tech =>
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Комбинированная фильтрация - поиск + фильтр по статусу
  const filteredTechnologies = activeFilter === 'all' 
    ? filteredBySearch 
    : filteredBySearch.filter(tech => tech.status === activeFilter);

  const updateTechnologyNotes = (techId, newNotes) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
  };

  const handleStatusChange = (technologyId) => {
    setTechnologies(prev => 
      prev.map(tech => {
        if (tech.id === technologyId) {
          const statusOrder = ['not-started', 'in-progress', 'completed'];
          const currentIndex = statusOrder.indexOf(tech.status);
          const nextIndex = (currentIndex + 1) % statusOrder.length;
          return { ...tech, status: statusOrder[nextIndex] };
        }
        return tech;
      })
    );
  };

  const handleUpdateAllStatuses = (newStatus) => {
    setTechnologies(prev => 
      prev.map(tech => ({ ...tech, status: newStatus }))
    );
  };

  const handleRandomSelect = (technologyId) => {
    setTechnologies(prev => 
      prev.map(tech => 
        tech.id === technologyId ? { ...tech, status: 'in-progress' } : tech
      )
    );
  };

  if (!isLoaded) {
    return <div>Загрузка...</div>;
  }

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
        
        {/* Добавляем компонент поиска */}
        <SearchBox 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          resultsCount={filteredTechnologies.length}
        />
        
        <TechnologyFilter 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          technologies={technologies}
        />
        
        <h2>Дорожная карта изучения</h2>
        {filteredTechnologies.length === 0 ? (
          <div className="no-results">
            <p>🚫 {searchQuery ? 'Ничего не найдено по вашему запросу' : 'Нет технологий в этом фильтре'}</p>
            {searchQuery && (
              <p style={{marginTop: '10px', fontSize: '0.9em', opacity: '0.7'}}>
                Попробуйте изменить поисковый запрос или сбросить фильтры
              </p>
            )}
          </div>
        ) : (
          filteredTechnologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              id={tech.id}
              title={tech.title}
              description={tech.description}
              notes={tech.notes}
              status={tech.status}
              onStatusChange={handleStatusChange}
              onNotesChange={updateTechnologyNotes}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default App;