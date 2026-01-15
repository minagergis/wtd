/**
 * Create combined panel with old/new values and status
 */
function createCombinedPanel(title, columns, matrix) {
    const panel = document.createElement('div');
    panel.className = 'sheet-panel';
    panel.style.maxWidth = '100%';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'sheet-title';

    const totalRows = matrix.length;
    const displayRows = Math.min(totalRows, state.displayLimit);

    titleDiv.innerHTML = `${title} <span style="font-size: 0.9em; opacity: 0.8;">(showing ${displayRows.toLocaleString()} of ${totalRows.toLocaleString()} rows)</span>`;
    panel.appendChild(titleDiv);

    const table = document.createElement('table');
    table.className = 'excel-table';

    // Create header row
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Row number header
    const cornerCell = document.createElement('th');
    cornerCell.className = 'row-header';
    headerRow.appendChild(cornerCell);

    // Column headers with Old/New/Status sub-headers
    columns.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col;
        th.colSpan = 3;
        th.style.textAlign = 'center';
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);

    // Sub-header row
    const subHeaderRow = document.createElement('tr');
    const emptyCorner = document.createElement('th');
    emptyCorner.className = 'row-header';
    subHeaderRow.appendChild(emptyCorner);

    columns.forEach(() => {
        ['Old Value', 'New Value', 'Status'].forEach(label => {
            const th = document.createElement('th');
            th.textContent = label;
            th.style.fontSize = '0.75rem';
            th.style.fontWeight = '500';
            subHeaderRow.appendChild(th);
        });
    });

    thead.appendChild(subHeaderRow);
    table.appendChild(thead);

    // Create body rows
    const tbody = document.createElement('tbody');
    renderCombinedRowsChunked(tbody, matrix, columns, 0, displayRows);

    table.appendChild(tbody);
    panel.appendChild(table);

    // Add "Load More" button if there are more rows
    if (totalRows > state.displayLimit) {
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.className = 'btn btn-secondary';
        loadMoreBtn.style.marginTop = '1rem';
        loadMoreBtn.textContent = `Load More Rows (${(totalRows - displayRows).toLocaleString()} remaining)`;
        loadMoreBtn.onclick = () => {
            state.displayLimit += 1000;
            renderGrid(state.comparisonData, state.currentView);
        };
        panel.appendChild(loadMoreBtn);
    }

    return panel;
}

/**
 * Render combined rows in chunks (old/new/status format)
 */
function renderCombinedRowsChunked(tbody, matrix, columns, startRow, endRow) {
    const chunkSize = 50;
    let currentRow = startRow;

    function renderChunk() {
        const chunkEnd = Math.min(currentRow + chunkSize, endRow);
        const fragment = document.createDocumentFragment();

        for (let r = currentRow; r < chunkEnd; r++) {
            const tr = document.createElement('tr');

            // Row header
            const rowHeader = document.createElement('td');
            rowHeader.className = 'row-header';
            rowHeader.textContent = r + 1;
            tr.appendChild(rowHeader);

            // For each column, show: Old Value | New Value | Status
            for (let c = 0; c < matrix[r].length; c++) {
                const cellData = matrix[r][c];

                // Old Value cell
                const oldTd = document.createElement('td');
                oldTd.textContent = cellData.oldValue;
                oldTd.style.minWidth = '120px';
                if (cellData.type === 'removed' || cellData.type === 'modified') {
                    oldTd.style.textDecoration = 'line-through';
                    oldTd.style.opacity = '0.7';
                }
                tr.appendChild(oldTd);

                // New Value cell
                const newTd = document.createElement('td');
                newTd.textContent = cellData.newValue;
                newTd.style.minWidth = '120px';
                if (cellData.type === 'added' || cellData.type === 'modified') {
                    newTd.style.fontWeight = '500';
                }
                tr.appendChild(newTd);

                // Status cell with badge
                const statusTd = document.createElement('td');
                statusTd.style.minWidth = '100px';
                statusTd.style.textAlign = 'center';

                if (cellData.type !== 'unchanged') {
                    const badge = document.createElement('span');
                    badge.className = 'change-badge';

                    if (cellData.type === 'added') {
                        badge.classList.add('badge-added');
                        badge.textContent = 'NEW';
                        statusTd.style.background = '#c8e6c9';
                    } else if (cellData.type === 'removed') {
                        badge.classList.add('badge-removed');
                        badge.textContent = 'DELETED';
                        statusTd.style.background = '#ffcdd2';
                    } else if (cellData.type === 'modified') {
                        badge.classList.add('badge-modified');
                        badge.textContent = 'CHANGED';
                        statusTd.style.background = '#fff9c4';
                    }

                    statusTd.appendChild(badge);

                    // Add tooltip
                    statusTd.dataset.cellData = JSON.stringify(cellData);
                    statusTd.addEventListener('mouseenter', showTooltipLazy);
                } else {
                    statusTd.textContent = '-';
                    statusTd.style.color = '#999';
                }

                tr.appendChild(statusTd);
            }

            fragment.appendChild(tr);
        }

        tbody.appendChild(fragment);

        currentRow = chunkEnd;
        if (currentRow < endRow) {
            requestAnimationFrame(renderChunk);
        }
    }

    renderChunk();
}
