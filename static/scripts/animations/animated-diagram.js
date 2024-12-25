document.addEventListener('DOMContentLoaded', function() {
    const section = document.querySelector('.content-3');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
              section.classList.add('visible'); // Добавляем класс, когда секция видна
            } else {
              section.classList.remove('visible'); // Удаляем класс, когда секция не видна
            }
        });
    }, { threshold: 0.1 });

    observer.observe(section);
});