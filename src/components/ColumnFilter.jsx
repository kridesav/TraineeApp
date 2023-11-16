
export function ColumnFilter({
    column: { filterValue, setFilter },
  }) {
    return (
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value || undefined)}
        className="filter-input"
      />
    );
  }