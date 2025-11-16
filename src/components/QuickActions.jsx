import './QuickActions.css';

function QuickActions({ technologies, onUpdateAllStatuses, onRandomSelect }) {
  const handleMarkAllCompleted = () => {
    onUpdateAllStatuses('completed');
  };

  const handleResetAll = () => {
    onUpdateAllStatuses('not-started');
  };

  const getRandomTechnology = () => {
    const notStartedTech = technologies.filter(tech => tech.status === 'not-started');
    if (notStartedTech.length === 0) {
      alert('Все технологии уже начаты или завершены! 🎉');
      return;
    }
    
    const randomTech = notStartedTech[Math.floor(Math.random() * notStartedTech.length)];
    onRandomSelect(randomTech.id);
  };

  const completedCount = technologies.filter(tech => tech.status === 'completed').length;
  const notStartedCount = technologies.filter(tech => tech.status === 'not-started').length;

  return (
    <div className="quick-actions">
      <h3>⚡ Быстрые действия</h3>
      
      <div className="actions-grid">
        <button 
          className="action-btn complete-all"
          onClick={handleMarkAllCompleted}
          disabled={completedCount === technologies.length}
        >
          <span className="action-icon">✅</span>
          <span className="action-text">Отметить все как выполненные</span>
          {completedCount > 0 && (
            <span className="action-count">{completedCount}/{technologies.length}</span>
          )}
        </button>

        <button 
          className="action-btn reset-all"
          onClick={handleResetAll}
          disabled={notStartedCount === technologies.length}
        >
          <span className="action-icon">🔄</span>
          <span className="action-text">Сбросить статусы</span>
          {notStartedCount > 0 && (
            <span className="action-count">{notStartedCount}/{technologies.length}</span>
          )}
        </button>

        <button 
          className="action-btn random-next"
          onClick={getRandomTechnology}
          disabled={notStartedCount === 0}
        >
          <span className="action-icon">🎲</span>
          <span className="action-text">Случайный выбор следующей технологии</span>
          {notStartedCount > 0 && (
            <span className="action-count">{notStartedCount} доступно</span>
          )}
        </button>
      </div>

      <div className="actions-status">
        <div className="status-item">
          <span className="status-dot completed"></span>
          <span>Выполнено: {completedCount}</span>
        </div>
        <div className="status-item">
          <span className="status-dot in-progress"></span>
          <span>В процессе: {technologies.filter(t => t.status === 'in-progress').length}</span>
        </div>
        <div className="status-item">
          <span className="status-dot not-started"></span>
          <span>Не начато: {notStartedCount}</span>
        </div>
      </div>
    </div>
  );
}

export default QuickActions;