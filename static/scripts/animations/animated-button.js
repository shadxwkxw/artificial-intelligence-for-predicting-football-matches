document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('.button-predict');

    button.addEventListener('click', function() {
        
        button.classList.remove('active');

        setTimeout(() => {
            button.classList.add('active');
        }, 800);
    });
});