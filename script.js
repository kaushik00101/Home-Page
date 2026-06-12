// Home Slider
const homeSlides = document.querySelectorAll('.home-slide');
const homeArrowPrev = document.querySelector('.home-arrow.prev');
const homeArrowNext = document.querySelector('.home-arrow.next');
const homeDots = document.querySelectorAll('.home-dot');
let homeIndex = 0;
let homeAutoplay = null;

function updateHomeSlide(index) {
    homeSlides.forEach(slide => slide.classList.remove('active'));
    homeDots.forEach(dot => dot.classList.remove('active'));
    
    homeSlides[index].classList.add('active');
    homeSlides[index].style.backgroundImage = `url(${homeSlides[index].dataset.bg})`;
    homeDots[index].classList.add('active');
}

function moveHomeSlide(offset) {
    homeIndex = (homeIndex + offset + homeSlides.length) % homeSlides.length;
    updateHomeSlide(homeIndex);
    clearInterval(homeAutoplay);
    startHomeAutoplay();
}

homeArrowPrev?.addEventListener('click', () => moveHomeSlide(-1));
homeArrowNext?.addEventListener('click', () => moveHomeSlide(1));

homeDots.forEach(dot => {
    dot.addEventListener('click', () => {
        homeIndex = Number(dot.dataset.slide);
        updateHomeSlide(homeIndex);
        clearInterval(homeAutoplay);
        startHomeAutoplay();
    });
});

function startHomeAutoplay() {
    homeAutoplay = setInterval(() => {
        homeIndex = (homeIndex + 1) % homeSlides.length;
        updateHomeSlide(homeIndex);
    }, 5000);
}

updateHomeSlide(0);
startHomeAutoplay();

const aboutData = {
    web: {
        columns: ['Project Title', 'Budget', 'Deadline', 'Client'],
        rows: [
            ['Website Redesign', '$1,500 to $2,200', '2022 Dec 12', 'Web Biz'],
            ['Website Renovation', '$2,500 to $3,600', '2022 Dec 10', 'Web Biz'],
            ['Marketing Plan', '$2,500 to $4,200', '2022 Dec 8', 'Web Biz'],
            ['All-new Website', '$3,000 to $6,600', '2022 Dec 2', 'Web Presence'],
        ],
    },
    graphics: {
        columns: ['Project Title', 'Budget', 'Deadline', 'Client'],
        rows: [
            ['Graphics Redesign', '$500 to $800', '2022 Nov 24', 'Media One'],
            ['Digital Graphics', '$1,500 to $3,000', '2022 Nov 18', 'Second Media'],
            ['New Artworks', '$2,200 to $4,400', '2022 Nov 10', 'Artwork Push'],
            ['Complex Arts', '$1,100 to $2,400', '2022 Nov 3', 'Media One'],
        ],
    },
    coding: {
        columns: ['Project Title', 'Budget', 'Estimated', 'Technology'],
        rows: [
            ['Backend Coding', '$2,000 to $5,000', '2022 Nov 28', 'PHP MySQL'],
            ['New Web App', '$1,500 to $3,000', '2022 Nov 18', 'Python Programming'],
            ['Frontend Interactions', '$3,000 to $6,000', '2022 Nov 10', 'JavaScripts'],
            ['Video Creations', '$1,800 to $4,400', '2022 Nov 3', 'Multimedia'],
        ],
    },
};

const buttons = document.querySelectorAll('.about-btn');
const aboutDataContainer = document.getElementById('about-data');

function renderAboutSection(key) {
    const section = aboutData[key];
    if (!section) return;

    const headerRow = `
        <div class="data-grid header">
            ${section.columns.map(label => `<div class="cell">${label}</div>`).join('')}
        </div>
    `;

    const rowHtml = section.rows
        .map(row => `
            <div class="data-grid">
                ${row.map((cell, index) => `
                    <div class="cell${index === 3 && key === 'coding' ? ' tech' : ''}" data-label="${section.columns[index]}">${cell}</div>
                `).join('')}
            </div>
        `)
        .join('');

    aboutDataContainer.innerHTML = headerRow + rowHtml;
}

function setActiveButton(target) {
    buttons.forEach(btn => btn.classList.toggle('active', btn === target));
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const group = button.dataset.group;
        setActiveButton(button);
        renderAboutSection(group);
    });
});

renderAboutSection('web');

const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const testimonialPrev = document.querySelector('.testimonial-arrow.prev');
const testimonialNext = document.querySelector('.testimonial-arrow.next');
const totalSlides = testimonialDots.length;
let testimonialIndex = 0;
let isTransitioning = false;

function updateTestimonialSlide(index, smooth = true) {
    if (smooth) {
        testimonialTrack.style.transition = 'transform 0.7s ease';
    } else {
        testimonialTrack.style.transition = 'none';
    }
    testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
    const displayIndex = index % totalSlides;
    testimonialDots.forEach(dot => dot.classList.toggle('active', Number(dot.dataset.slide) === displayIndex));
}

function moveToSlide(offset) {
    if (isTransitioning) return;
    isTransitioning = true;
    testimonialIndex += offset;
    updateTestimonialSlide(testimonialIndex, true);
    
    setTimeout(() => {
        if (testimonialIndex >= totalSlides) {
            testimonialIndex = 0;
            updateTestimonialSlide(testimonialIndex, false);
        } else if (testimonialIndex < 0) {
            testimonialIndex = totalSlides - 1;
            updateTestimonialSlide(testimonialIndex, false);
        }
        isTransitioning = false;
    }, 700);
}

testimonialDots.forEach(dot => {
    dot.addEventListener('click', () => {
        testimonialIndex = Number(dot.dataset.slide);
        updateTestimonialSlide(testimonialIndex, true);
    });
});

testimonialPrev?.addEventListener('click', () => {
    moveToSlide(-1);
});

testimonialNext?.addEventListener('click', () => {
    moveToSlide(1);
});

setInterval(() => {
    moveToSlide(1);
}, 4200);
