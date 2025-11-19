import './TechnologyNotes.css';

function TechnologyNotes({ notes, onNotesChange, techId }) {
  const safeNotes = notes || '';

  const handleChange = (e) => {
    if (onNotesChange) {
      onNotesChange(techId, e.target.value);
    }
  };

  return (
    <div className="notes-section">
      <h4>Мои заметки:</h4>
      <textarea
        value={safeNotes}
        onChange={handleChange}
        placeholder="Записывайте сюда важные моменты..."
        rows="3"
        className="notes-textarea"
      />
      <div className="notes-hint">
        {safeNotes.length > 0 
          ? `Заметка сохранена (${safeNotes.length} символов)` 
          : 'Добавьте заметку'
        }
      </div>
    </div>
  );
}

export default TechnologyNotes;