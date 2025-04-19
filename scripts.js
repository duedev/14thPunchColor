function toggleSection(button) {
    const section = button.parentElement.nextElementSibling;
    section.classList.toggle('collapsed');
    button.textContent = section.classList.contains('collapsed') ? 'Expand' : 'Collapse';
}

function filterByStatus() {
    const filter = document.getElementById('status-filter').value;
    const rows = document.querySelectorAll('tr[class="red"], tr[class="blue"], tr[class="green"], tr[class="purple"], tr[class="orange"]');
    rows.forEach(row => {
        if (filter === 'all' || row.classList.contains(filter)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}