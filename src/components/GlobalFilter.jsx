export function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length;

    return (
        <div className="globalfilter">
            <span>
                Search:{' '}
                <input
                    value={globalFilter || ''}
                    onChange={e => {
                        setGlobalFilter(e.target.value || undefined);
                    }}
                    placeholder={`${count} records...`}
                    className="globalfilter-input"
                />
            </span>
        </div>
    );
}