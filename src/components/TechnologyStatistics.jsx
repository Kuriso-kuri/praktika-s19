import './TechnologyStatistics.css';

function TechnologyStatistics({ technologies }) {
  const total = technologies.length;
  const completed = technologies.filter(tech => tech.status === 'completed').length;
  const inProgress = technologies.filter(tech => tech.status === 'in-progress').length;
  const notStarted = technologies.filter(tech => tech.status === 'not-started').length;
  
  const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const categories = {
    'completed': completed,
    'in-progress': inProgress,
    'not-started': notStarted
  };
  
  const MostPopularStatus = Object.keys(categories).reduce((a, b) => 
    categories[a] > categories[b] ? a : b
  );

  const GetStatusLabel = (status) => {
    const labels = {
      'completed': 'Изучено',
      'in-progress': 'В процессе', 
      'not-started': 'Не начато'
    };
    return labels[status] || status;
  };

  return (
    <div className="technology-statistics">
      <h3>Детальная статистика</h3>
      
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-number">{total}</div>
          <div className="stat-label">Всего технологий</div>
        </div>
        
        <div className="stat-card completed">
          <div className="stat-number">{completed}</div>
          <div className="stat-label">Изучено</div>
          <div className="stat-percentage">{Math.round((completed/total)*100)}%</div>
        </div>
        
        <div className="stat-card in-progress">
          <div className="stat-number">{inProgress}</div>
          <div className="stat-label">В процессе</div>
          <div className="stat-percentage">{Math.round((inProgress/total)*100)}%</div>
        </div>
        
        <div className="stat-card not-started">
          <div className="stat-number">{notStarted}</div>
          <div className="stat-label">Не начато</div>
          <div className="stat-percentage">{Math.round((notStarted/total)*100)}%</div>
        </div>
      </div>

      <div className="detailed-progress">
        <h4>Распределение по статусам</h4>
        <div className="progress-bars">
          <div className="progress-bar-item completed">
            <span className="progress-label">Изучено</span>
            <div className="progress-bar-track">
              <div 
                className="progress-bar-fill"
                style={{ width: `${(completed/total)*100}%` }}
              ></div>
            </div>
            <span className="progress-count">{completed}</span>
          </div>
          
          <div className="progress-bar-item in-progress">
            <span className="progress-label">В процессе</span>
            <div className="progress-bar-track">
              <div 
                className="progress-bar-fill"
                style={{ width: `${(inProgress/total)*100}%` }}
              ></div>
            </div>
            <span className="progress-count">{inProgress}</span>
          </div>
          
          <div className="progress-bar-item not-started">
            <span className="progress-label">Не начато</span>
            <div className="progress-bar-track">
              <div 
                className="progress-bar-fill"
                style={{ width: `${(notStarted/total)*100}%` }}
              ></div>
            </div>
            <span className="progress-count">{notStarted}</span>
          </div>
        </div>
      </div>

      <div className="insights">
        <h4>Инсайты</h4>
        <div className="insight-item">
          <span className="insight-icon">📊</span>
          <span>Общий прогресс: <strong>{progressPercentage}%</strong></span>
        </div>
        {completed === total && (
          <div className="insight-item achievement">
            <span className="insight-icon">🎉</span>
            <span>Поздравляю! Я изучил все технологии!</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TechnologyStatistics;