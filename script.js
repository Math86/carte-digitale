let currentPage = 0;
const pages = document.querySelectorAll(".page");

function updatePages() {
    pages.forEach((page, index) => {
        page.classList.remove("active", "prev");

        if (index === currentPage) {
            page.classList.add("active");
        } else if (index === currentPage - 1) {
            page.classList.add("prev");
        }
    });
}

// Navigation
function nextPage() {
    currentPage = (currentPage + 1) % pages.length;
    vibrate();
    updatePages();
}

function prevPage() {
    currentPage = (currentPage - 1 + pages.length) % pages.length;
    vibrate();
    updatePages();
}

// Vibration mobile
function vibrate() {
    if (navigator.vibrate) {
        navigator.vibrate(20);
    }
}

// CLIC → toggle simple (aller / retour)
document.addEventListener("click", () => {
    if (currentPage === 0) {
        nextPage();
    } else {
        prevPage();
    }
});

// SWIPE
let startX = 0;

document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

document.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
        nextPage(); // gauche → suivant
    } else if (endX - startX > 50) {
        prevPage(); // droite → retour
    }
});

// Initialisation
updatePages();