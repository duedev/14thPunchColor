function toggleSection(button) {
    const section = button.parentElement.nextElementSibling;
    section.classList.toggle('collapsed');
    button.textContent = section.classList.contains('collapsed') ? 'Expand' : 'Collapse';
}

function applyFilters() {
    const statusFilter = document.getElementById('status-filter').value;
    const tradeSort = document.getElementById('trade-sort').value;

    // Step 1: Filter by status
    const rows = document.querySelectorAll('tr[class="red"], tr[class="blue"], tr[class="green"], tr[class="purple"], tr[class="orange"]');
    rows.forEach(row => {
        if (statusFilter === 'all' || row.classList.contains(statusFilter)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

    // Step 2: Sort trade categories within each status section
    const statusSections = document.querySelectorAll('.section-content');
    statusSections.forEach(section => {
        const tradeHeaders = Array.from(section.querySelectorAll('.trade-header'));
        const tradeContents = Array.from(section.querySelectorAll('.trade-content'));

        // Pair trade headers and contents for sorting
        const tradePairs = tradeHeaders.map((header, index) => ({
            header: header,
            content: tradeContents[index],
            trade: header.getAttribute('data-trade')
        }));

        // Sort based on the selected trade category
        if (tradeSort !== 'default') {
            tradePairs.sort((a, b) => {
                if (a.trade === tradeSort && b.trade !== tradeSort) return -1;
                if (a.trade !== tradeSort && b.trade === tradeSort) return 1;
                return a.trade.localeCompare(b.trade);
            });
        } else {
            // Default order (as in HTML): Architectural, Interiors, Electrical, etc.
            const defaultOrder = ['Architectural', 'Interiors', 'Electrical', 'HVAC', 'Plumbing', 'Exterior', 'Site', 'General'];
            tradePairs.sort((a, b) => defaultOrder.indexOf(a.trade) - defaultOrder.indexOf(b.trade));
        }

        // Reattach sorted elements to the DOM
        tradePairs.forEach(pair => {
            section.appendChild(pair.header);
            section.appendChild(pair.content);
        });
    });
}