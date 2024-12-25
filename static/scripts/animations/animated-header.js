document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-button');
    const menu = document.querySelector('header ul');
    const menuItems = document.querySelectorAll('header ul li a');

    menuButton.addEventListener('click', () => {
        menu.classList.toggle('active');

        if (menu.classList.contains('active')) {
            menu.style.height = menu.scrollHeight + 'px';
        } else {
            menu.style.height = '0px';
        }
    });

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('active');
            
        });
    });
    
   document.addEventListener('click', (event) => {
       if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
            menu.classList.remove('active');
            menu.style.height = '0px';
        }
   })
});
