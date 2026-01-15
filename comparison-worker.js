/**
 * Excel Comparison Web Worker
 * Performs position-based comparison in background thread
 */

self.onmessage = function (e) {
    const { data1, data2 } = e.data;

    try {
        const result = compareSheetsByPosition(data1, data2);
        self.postMessage({ success: true, data: result });
    } catch (error) {
        self.postMessage({ success: false, error: error.message });
    }
};

/**
 * Position-based comparison algorithm (same as main thread)
 */
function compareSheetsByPosition(data1, data2) {
    // Normalize to max dimensions
    const maxRows = Math.max(data1.length, data2.length);
    const maxCols = Math.max(
        ...data1.map(row => row.length),
        ...data2.map(row => row.length),
        0
    );

    // Generate column headers (A, B, C, ...)
    const columns = [];
    for (let i = 0; i < maxCols; i++) {
        columns.push(columnIndexToLetter(i));
    }

    // Build comparison matrix
    const matrix = [];
    let stats = { total: 0, added: 0, removed: 0, modified: 0 };

    for (let r = 0; r < maxRows; r++) {
        const row = [];
        for (let c = 0; c < maxCols; c++) {
            const val1 = (data1[r] && data1[r][c] !== undefined) ? String(data1[r][c]) : '';
            const val2 = (data2[r] && data2[r][c] !== undefined) ? String(data2[r][c]) : '';

            let type = 'unchanged';
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

            row.push({
                row: r,
                col: c,
                oldValue: val1,
                newValue: val2,
                type: type
            });
        }
        matrix.push(row);

        // Send progress updates every 100 rows
        if (r % 100 === 0) {
            self.postMessage({
                progress: true,
                current: r,
                total: maxRows,
                percent: Math.round((r / maxRows) * 100)
            });
        }
    }

    return {
        matrix,
        columns,
        stats,
        data1,
        data2,
        maxRows,
        maxCols
    };
}

/**
 * Convert column index to letter
 */
function columnIndexToLetter(index) {
    let letter = '';
    while (index >= 0) {
        letter = String.fromCharCode((index % 26) + 65) + letter;
        index = Math.floor(index / 26) - 1;
    }
    return letter;
}
