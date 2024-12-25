document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    const ball = document.querySelector('.hero .ball');
    let initialTop = ball.offsetTop;
    let initialRight = ball.offsetLeft;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
              ball.classList.add('hidden');
            } else {
                ball.classList.remove('hidden');
            }
        });
    }, { threshold: 0.1 });
    observer.observe(heroSection);
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
          
          let topPosition = initialTop + scrollY * 0.8; 
          let rightPosition = initialRight + scrollY * 0.2; 
          ball.style.transform = `translate(${rightPosition - initialRight}px, ${topPosition - initialTop}px)`;

      });
});
