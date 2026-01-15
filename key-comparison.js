/**
 * Key-based comparison logic
 * Matches rows by key column value (e.g., Unit Name in column A)
 */
function compareSheetsByKey(data1, data2, keyColumnIndex) {
    // Build maps of key -> row data
    const map1 = new Map();
    const map2 = new Map();

    // Index all rows by key
    data1.forEach((row, index) => {
        const key = row[keyColumnIndex] || `__EMPTY_ROW_${index}__`;
        map1.set(String(key), { row, index });
    });

    data2.forEach((row, index) => {
        const key = row[keyColumnIndex] || `__EMPTY_ROW_${index}__`;
        map2.set(String(key), { row, index });
    });

    // Get all unique keys
    const allKeys = new Set([...map1.keys(), ...map2.keys()]);

    // Calculate max columns
    const maxCols = Math.max(
        ...data1.map(row => row.length),
        ...data2.map(row => row.length),
        0
    );

    // Generate column headers
    const columns = [];
    for (let i = 0; i < maxCols; i++) {
        columns.push(columnIndexToLetter(i));
    }

    // Build comparison matrix
    const matrix = [];
    const stats = { total: 0, added: 0, removed: 0, modified: 0 };

    allKeys.forEach(key => {
        const entry1 = map1.get(key);
        const entry2 = map2.get(key);

        const row1 = entry1 ? entry1.row : [];
        const row2 = entry2 ? entry2.row : [];

        const rowData = [];

        for (let c = 0; c < maxCols; c++) {
            const val1 = (row1[c] !== undefined) ? String(row1[c]) : '';
            const val2 = (row2[c] !== undefined) ? String(row2[c]) : '';

            let type = 'unchanged';

            if (!entry1 && entry2) {
                // Entire row added
                type = 'added';
                if (val2) {
                    stats.added++;
                    stats.total++;
                }
            } else if (entry1 && !entry2) {
                // Entire row removed
                type = 'removed';
                if (val1) {
                    stats.removed++;
                    stats.total++;
                }
            } else {
                //Both rows exist, compare values
                if (val1 === '' && val2 !== '') {
                    type = 'added';
                    stats.added++;
                    stats.total++;
                } else if (val1 !== '' && val2 === '') {
                    type = 'removed';
                    stats.removed++;
                    stats.total++;
                } else if (val1 !== val2 && val1 !== '' && val2 !== '') {
                    type = 'modified';
                    stats.modified++;
                    stats.total++;
                }
            }

            rowData.push({
                row: matrix.length,
                col: c,
                oldValue: val1,
                newValue: val2,
                type: type,
                key: key
            });
        }

        matrix.push(rowData);
    });

    return {
        matrix,
        columns,
        stats,
        data1,
        data2,
        maxRows: matrix.length,
        maxCols,
        keyColumn: keyColumnIndex
    };
}
