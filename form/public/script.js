window.addEventListener('DOMContentLoaded', async () => {
    const authLinks = document.getElementById('authLinks');
    const welcomeMessage = document.getElementById('welcomeMessage');

    try {
        const response = await fetch('/api/me');
        if (response.ok) {
            const user = await response.json();
            authLinks.innerHTML = `<span>Welcome, ${user.name}</span> <a href="#" id="logoutLink">Logout</a>`;
            welcomeMessage.textContent = `Welcome back, ${user.name}!`;
        } else if (response.status === 401) {
            // User is not authenticated
            authLinks.innerHTML = '<a href="/login.html">Login</a> <a href="/register.html">Register</a>';
            welcomeMessage.textContent = 'Please log in to access your account.';
        } else {
            throw new Error('Failed to fetch user data');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        authLinks.innerHTML = '<a href="/login.html">Login</a> <a href="/register.html">Register</a>';
        welcomeMessage.textContent = 'An error occurred. Please try again later.';
    }

    // Handle logout
    authLinks.addEventListener('click', async (event) => {
        if (event.target.id === 'logoutLink') {
            event.preventDefault();
            try {
                const response = await fetch('/api/logout', { method: 'POST' });
                if (response.ok) {
                    location.reload(); // Reload the page to update UI
                } else {
                    throw new Error('Logout failed');
                }
            } catch (error) {
                console.error('Error logging out:', error);
                welcomeMessage.textContent = 'Logout failed. Please try again.';
            }
        }
    });
});
