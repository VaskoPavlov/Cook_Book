window.addEventListener('load', start);

function start() {
    document.querySelector('form').addEventListener('submit', onRegister);
}

async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const email = data.email.trim();
    const password = data.password.trim();

    const url = 'http://localhost:3030/users/login';
    try {
        const res = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }

        const userData = await res.json();

        localStorage.setItem('user', JSON.stringify(userData));

        window.location = '/';
    } catch(err) {
        alert(err.message);
    }
}