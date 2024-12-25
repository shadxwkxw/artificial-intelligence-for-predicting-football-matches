document.addEventListener('DOMContentLoaded', function() {
    const section = document.querySelector('.content-4');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
              section.classList.add('visible');
            } else {
              section.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    observer.observe(section);
});
