document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.querySelector('.menu-icon');

    menuIcon.addEventListener('click', () => {
        const isMenuOpen = menuIcon.getAttribute('name') === 'menu';
        menuIcon.setAttribute('name', isMenuOpen ? 'close' : 'menu');
        navLinks.classList.toggle('hidden');
    });
});