document.querySelectorAll('.filter-tab').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(b => {
            b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
            b.classList.add('text-on-surface-variant', 'hover:text-on-surface');
        });
        button.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
        button.classList.remove('text-on-surface-variant', 'hover:text-on-surface');

        document.querySelectorAll('.filter-content').forEach(content => {
            content.classList.add('hidden');
        });
        
        const filter = button.getAttribute('data-filter');
        document.getElementById(filter).classList.remove('hidden');
    });
});