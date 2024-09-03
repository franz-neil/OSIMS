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


    const branchesLink = document.getElementById('branchesLink');
    const branchesDropdown = document.getElementById('branchesDropdown');

    branchesLink.addEventListener('click', (e) => {
        e.preventDefault();
        branchesDropdown.classList.toggle('branches_hidden');
    });

    //for clicking user photo

    const dropdownToggle = document.getElementById('dropdownToggle');
    const dropdownMenu = document.getElementById('dropdownMenu');

    dropdownToggle.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hide');
    });

    // Optional: Close the dropdown if clicking outside of it
    document.addEventListener('click', (event) => {
        if (!dropdownMenu.contains(event.target) && event.target !== dropdownToggle) {
            dropdownMenu.classList.add('hide');
        }
    });
});
