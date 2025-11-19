import './SearchBox.css';

function SearchBox({ searchQuery, onSearchChange, resultsCount }) {
  return (
    <div className="search-box">
      <div className="search-header">
        <h3>🔍 Поиск технологий</h3>
        <span className="search-results-count">Найдено: {resultsCount}</span>
      </div>
      <input
        type="text"
        placeholder="Поиск по названию или описанию..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default SearchBox;