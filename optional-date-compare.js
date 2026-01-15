/**
 * Composite key-based comparison logic
 * Matches by Unit Name + Date (optional)
 */
function compareSheetsByKey(data1, data2, keyColumnIndex) {
    // Get date column (optional)
    const dateColumnEl = document.getElementById('date-column');
    const dateColumnValue = dateColumnEl ? dateColumnEl.value.trim() : '';
    const useDateColumn = dateColumnValue !== '';
    const dateColumnIndex = useDateColumn ? columnLetterToIndex(dateColumnValue.toUpperCase()) : -1;

    // Build maps of key -> row data
    const map1 = new Map();
    const map2 = new Map();

    // Index all rows by key (unit only OR unit+date)
    data1.forEach((row, index) => {
        const unit = row[keyColumnIndex] || '';
        let compositeKey;

        if (useDateColumn && dateColumnIndex >= 0) {
            const date = row[dateColumnIndex] || '';
            compositeKey = `${unit}|||${date}`;
        } else {
            compositeKey = unit;
        }

        // Handle duplicates
        let finalKey = compositeKey;
        let counter = 0;
        while (map1.has(finalKey)) {
            counter++;
            finalKey = `${compositeKey}|||${counter}`;
        }

        map1.set(finalKey, { row, index, unit, date: useDateColumn && dateColumnIndex >= 0 ? row[dateColumnIndex] : null });
    });

    data2.forEach((row, index) => {
        const unit = row[keyColumnIndex] || '';
        let compositeKey;

        if (useDateColumn && dateColumnIndex >= 0) {
            const date = row[dateColumnIndex] || '';
            compositeKey = `${unit}|||${date}`;
        } else {
            compositeKey = unit;
        }

        let finalKey = compositeKey;
        let counter = 0;
        while (map2.has(finalKey)) {
            counter++;
            finalKey = `${compositeKey}|||${counter}`;
        }

        map2.set(finalKey, { row, index, unit, date: useDateColumn && dateColumnIndex >= 0 ? row[dateColumnIndex] : null });
    });

    const allKeys = new Set([...map1.keys(), ...map2.keys()]);

    const maxCols = Math.max(
        ...data1.map(row => row.length),
        ...data2.map(row => row.length),
        0
    );

    const columns = [];
    for (let i = 0; i < maxCols; i++) {
        columns.push(columnIndexToLetter(i));
    }

    const matrix = [];
    const stats = { total: 0, added: 0, removed: 0, modified: 0 };

    const sortedKeys = Array.from(allKeys).sort();

    sortedKeys.forEach(compositeKey => {
        const entry1 = map1.get(compositeKey);
        const entry2 = map2.get(compositeKey);

        const row1 = entry1 ? entry1.row : [];
        const row2 = entry2 ? entry2.row : [];

        const rowData = [];

        for (let c = 0; c < maxCols; c++) {
            const val1 = (row1[c] !== undefined) ? String(row1[c]) : '';
            const val2 = (row2[c] !== undefined) ? String(row2[c]) : '';

            let type = 'unchanged';

            if (!entry1 && entry2) {
                type = 'added';
                if (val2) {
                    stats.added++;
                    stats.total++;
                }
            } else if (entry1 && !entry2) {
                type = 'removed';
                if (val1) {
                    stats.removed++;
                    stats.total++;
                }
            } else {
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
                unit: entry1 ? entry1.unit : (entry2 ? entry2.unit : ''),
                date: entry1 ? entry1.date : (entry2 ? entry2.date : null)
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
        keyColumn: keyColumnIndex,
        dateColumn: dateColumnIndex,
        useDateColumn: useDateColumn
    };
}
