// src/components/TechnologyFilter.jsx
import './TechnologyFilter.css';

function TechnologyFilter({ activeFilter, onFilterChange, technologies }) {
  const filters = [
    { key: 'all', label: 'Все', icon: '📚', count: technologies.length },
    { key: 'not-started', label: 'Не начатые', icon: '🆕', count: technologies.filter(t => t.status === 'not-started').length },
    { key: 'in-progress', label: 'В процессе', icon: '⚡', count: technologies.filter(t => t.status === 'in-progress').length },
    { key: 'completed', label: 'Выполненные', icon: '✅', count: technologies.filter(t => t.status === 'completed').length }
  ];

  return (
    <div className="technology-filter">
      <h3>🔍 Фильтр технологий</h3>
      
      <div className="filter-tabs">
        {filters.map(filter => (
          <button
            key={filter.key}
            className={`filter-tab ${activeFilter === filter.key ? 'active' : ''} ${filter.key}`}
            onClick={() => onFilterChange(filter.key)}
          >
            <span className="filter-icon">{filter.icon}</span>
            <span className="filter-label">{filter.label}</span>
            <span className="filter-count">{filter.count}</span>
          </button>
        ))}
      </div>

      <div className="filter-status">
        <span className="status-text">
          Показано: <strong>{filters.find(f => f.key === activeFilter)?.count}</strong> из {technologies.length} технологий
        </span>
        {activeFilter !== 'all' && (
          <button 
            className="clear-filter"
            onClick={() => onFilterChange('all')}
          >
            ✕ Сбросить фильтр
          </button>
        )}
      </div>
    </div>
  );
}

export default TechnologyFilter;