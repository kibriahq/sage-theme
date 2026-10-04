const announcementBar = document.querySelector('#announcement-bar');
const header = document.querySelector('#header');

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        announcementBar.classList.add('-translate-y-full');
        header.classList.add('-translate-y-10');
    } else {
        // Scrolling up
        announcementBar.classList.remove('-translate-y-full');
        header.classList.remove('-translate-y-10');
    }

    lastScrollY = currentScrollY;
});