function bestPicturePressed() {
    createStars();

    document.querySelectorAll('.content-wrapper')
        .forEach(el => {el.classList.add('fade-out')});

    setTimeout(() => {
        window.location.href = "bestPicture.html";
    }, 500);
}

function redCarpetPressed() {
    createStars();

    document.querySelectorAll('.content-wrapper')
        .forEach(el => {el.classList.add('fade-out')});

    setTimeout(() => {
        window.location.href = "bestLooks.html";
    }, 500);
}

function winnersPressed() {
    createStars();

    document.querySelectorAll('.content-wrapper')
        .forEach(el => {el.classList.add('fade-out')});

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

// pre seed some fake results
const votes = {
    women: {
        'Jessie Buckley': 33,
        'Demi Moore': 21,
        'Teyana Taylor': 47
    },
    men: {
        'Michael B. Jordan': 44,
        'Timothee Chalamet': 33,
        'Shaboozey': 23
    }
};
const hasVoted = {
    women: false,
    men: false
};

async function vote(category, name, btn) {
    if (hasVoted[category]) return;

    // record vote locally
    votes[category][name] = (votes[category][name] || 0) + 1;
    hasVoted[category] = true;

    // disable all buttons in this category
    const section = btn.closest('.poll-section');
    section.querySelectorAll('.vote-btn').forEach(b => b.disabled = true);

    // POST to Google Script
    try {
        await fetch('https://script.google.com/macros/s/AKfycbz6cewkwC6P68-qotOokhBb_v1Zxr3aozRItX-rFramd4p_7R3XzwHLj7o1mN-6Okez/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, name })
        });
    } catch (error) {
        console.error('Vote submission failed:', error);
    }

    showResults(category); 
}

function showResults(category) {
    const container = document.getElementById(`${category}-results`);
    const categoryVotes = votes[category];
    const total = Object.values(categoryVotes).reduce((a, b) => a + b, 0);

    container.innerHTML = '<h4>Results</h4>';

    for (const [name, count] of Object.entries(categoryVotes)) {
        const pct = total ? Math.round((count / total) * 100) : 0;
        container.innerHTML += `
            <div class="result-bar-container">
                <p>${name} — ${pct}%</p>
                <div class="result-bar" style="width: ${pct}%"></div>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('women-results')) showResults('women');
    if (document.getElementById('men-results')) showResults('men');
});

function submitWriteIn(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value.trim();
    const category = form.category.value;

    if (!name || !category) return;

    try {
        fetch('https://script.google.com/macros/s/AKfycbz6cewkwC6P68-qotOokhBb_v1Zxr3aozRItX-rFramd4p_7R3XzwHLj7o1mN-6Okez/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, name, type: 'write-in' })
        });
    } catch (error) {
        console.error('Write-in submission failed:', error);
    }

    const resultDiv = document.getElementById('writein-result');
    resultDiv.innerHTML = `<p class="writein-confirmation">Thanks! You nominated <strong>${name}</strong> for <strong>Best Dressed ${category === 'women' ? 'Woman' : 'Man'}</strong>.</p>`;

    form.querySelectorAll('input, select, button').forEach(el => el.disabled = true);
}