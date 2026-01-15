/**
 * Initialize diff filter functionality
 */
function initializeDiffFilter() {
    const filterButtons = document.querySelectorAll('.filter-group .btn-filter');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update filter state
            const filter = btn.dataset.filter;
            state.showDiffsOnly = (filter === 'diffs');

            // Re-render if we have data
            if (state.comparisonData) {
                renderGrid(state.comparisonData, state.currentView);
            }
        });
    });
}
