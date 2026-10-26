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

const carouselPrevBtn = document.querySelector('.swiper-button-prev');
const carouselNextBtn = document.querySelector('.swiper-button-next');

window.addEventListener('load', () => {
    if (carouselPrevBtn) {
        carouselPrevBtn.querySelector('svg').remove();
    }
    if (carouselNextBtn) {
        carouselNextBtn.querySelector('svg').remove();
    }
});


window.addEventListener('load', () => {
    const productCountElement = document.querySelector('#product-count');

    const url = new URL(location.href);

    const currentPage = Number(url.searchParams.get('page')) || 1;
    const perPage = 12;

    const start = (currentPage - 1) * perPage + 1;
    const end = start + perPage - 1;
    const total = Number(productCountElement.dataset.total);

    productCountElement.textContent = `${start}-${end > total ? end + (total - end) : end}`;
})