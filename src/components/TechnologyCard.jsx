import './TechnologyCard.css';

function TechnologyCard({ id, title, description, status, onStatusChange }) {
  const handleClick = () => {
    if (onStatusChange) {
      onStatusChange(id);
    }
  };

  return (
    <div 
      className={`technology-card ${status}`}
      onClick={handleClick}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="status-indicator">
        Статус: 
        {status === 'completed' && ' ✅ Изучено'}
        {status === 'in-progress' && ' ⏳ В процессе'}
        {status === 'not-started' && ' ❌ Не начато'}
      </div>
      <div className="click-hint">👆 Нажмите для смены статуса</div>
    </div>
  );
}

export default TechnologyCard;