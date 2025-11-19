import './TechnologyCard.css';
import TechnologyNotes from './TechnologyNotes';

function TechnologyCard({ id, title, description, notes, status, onStatusChange, onNotesChange }) {
  const handleCardClick = (e) => {
    // Игнорируем клики по textarea и его родителям
    if (e.target.tagName === 'TEXTAREA' || e.target.closest('textarea')) {
      return;
    }
    if (onStatusChange) {
      onStatusChange(id);
    }
  };

  return (
    <div 
      id={`tech-${id}`}
      className={`technology-card ${status}`}
      onClick={handleCardClick}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="status-indicator">
        Статус: 
        {status === 'completed' && ' ✅ Изучено'}
        {status === 'in-progress' && ' ⏳ В процессе'}
        {status === 'not-started' && ' ❌ Не начато'}
      </div>
      <TechnologyNotes 
        notes={notes}
        onNotesChange={onNotesChange}
        techId={id}
      />
      <div className="click-hint">👆 Нажмите для смены статуса (кроме области заметок)</div>
    </div>
  );
}

export default TechnologyCard;