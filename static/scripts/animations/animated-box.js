document.addEventListener('DOMContentLoaded', function() {
    const section = document.getElementById('about-project');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
              section.classList.add('active');
            }
            else{
             section.classList.remove('active')
            }
        });
    });

    observer.observe(section);
});