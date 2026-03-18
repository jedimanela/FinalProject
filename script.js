function bestPicturePressed() {
    createStars();

   document.body.classList.add("fade-out");

    setTimeout(() => {
        window.location.href = "bestPicture.html";
    }, 500);
}

function redCarpetPressed() {
    createStars();

    document.body.classList.add("fade-out");

    setTimeout(() => {
        window.location.href = "bestLooks.html";
    }, 500);
}

function winnersPressed() {
    createStars();
    
    document.body.classList.add("fade-out");

    setTimeout(() => {
        window.location.href = "winners.html";
    }, 500);
}

function createStars() {
    const container = document.getElementById("star-container");

    for (let i = 0; i < 20; i++) {
        let star = document.createElement("div");
        star.classList.add("star");
        star.innerHTML = "★";

        // random position
        star.style.left = Math.random() * window.innerWidth + "px";
        star.style.top = Math.random() * window.innerHeight + "px";

        // random size
        star.style.fontSize = (Math.random() * 20 + 10) + "px";

        container.appendChild(star);

        // remove after animation
        setTimeout(() => {
            star.remove();
        }, 1000);
    }
}