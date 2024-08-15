document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.getElementById('logoutLink');

    logoutLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior

        // Display the custom confirmation dialog
        const confirmation = confirm("Are you sure you want to logout?");

        if (confirmation) {
            // Redirect to the login page
            window.location.href = '/';
            
            // Prevent the user from navigating back to the home page
            // You can use the history.replaceState to remove the current page from the history stack
            window.history.replaceState(null, '', '/');
        }
        // If the user cancels, do nothing (the page remains the same)
    });
});
