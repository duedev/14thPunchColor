function toggleSection(button) {
    const section = button.parentElement.nextElementSibling;
    section.classList.toggle('collapsed');
    button.textContent = section.classList.contains('collapsed') ? 'Expand' : 'Collapse';
}