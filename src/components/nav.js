/**
 * Render a navigation bar for account management.
 */
const renderNavManager = () => {
    const navElement = document.createElement('ul');
    navElement.classList.add('nav', 'col-lg-auto', 'me-lg-auto', 'justify-content-center');

    // Create inicio link
    const homeLink = document.createElement('a');
    homeLink.href = 'http://127.0.0.1:5500/html/index.html?c=1';
    homeLink.classList.add('nav-link', 'px-2', 'link-light');
    homeLink.textContent = 'Inicio';

    const homeListItem = document.createElement('li');
    homeListItem.appendChild(homeLink);

    // Create video link
    const videoLink = document.createElement('a');
    videoLink.href = 'http://127.0.0.1:5500/html/videos/playlists.html?c=admin';
    videoLink.classList.add('nav-link', 'px-2', 'link-light');
    videoLink.textContent = 'Playlists';

    const videoListItem = document.createElement('li');
    videoListItem.appendChild(videoLink);

    // Create profile link
    const profileLink = document.createElement('a');
    profileLink.href = 'http://127.0.0.1:5500/html/index.html?c=a';
    profileLink.classList.add('nav-link', 'px-2', 'link-light');
    profileLink.textContent = 'Perfiles';

    const profileListItem = document.createElement('li');
    profileListItem.appendChild(profileLink);

    // Add list items to navigation
    navElement.appendChild(homeListItem);
    navElement.appendChild(videoListItem);
    navElement.appendChild(profileListItem);

    // Create dropdown element (assuming basic structure)
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown', 'text-end', 'ms-5');
    dropdown.id = 'navbarNavDarkDropdown';

    const dropdownToggle = document.createElement('a');
    dropdownToggle.href = '#'; // Update with desired dropdown link (if applicable)
    dropdownToggle.classList.add('d-block', 'link-light', 'text-decoration-none', 'dropdown-toggle');
    dropdownToggle.setAttribute('data-bs-toggle', 'dropdown'); // Assuming Bootstrap usage
    dropdownToggle.setAttribute('aria-expanded', 'false');

    // Add user icon (replace with your image source)
    const userIcon = document.createElement('img');
    userIcon.src = 'https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-w3lqr61qe57e9yt8.webp';
    userIcon.alt = 'mdo';
    userIcon.width = 35;
    userIcon.height = 35;
    userIcon.classList.add('rounded-circle');

    dropdownToggle.appendChild(userIcon);
    dropdown.appendChild(dropdownToggle);

    // Create dropdown menu (basic structure)
    const dropdownMenu = document.createElement('ul');
    dropdownMenu.classList.add('dropdown-menu', 'dropdown-menu-dark', 'text-small');

    const disconnectItem = document.createElement('li');

    const disconnectLink = document.createElement('button');
    disconnectLink.classList.add('dropdown-item', 'text-white');
    disconnectLink.textContent = 'Desconectar';
    disconnectLink.setAttribute('onclick', 'logOut()')

    disconnectItem.appendChild(disconnectLink);
    dropdownMenu.appendChild(disconnectItem);

    dropdown.appendChild(dropdownMenu);

    const navContainer = document.getElementById('nav');
    navContainer.appendChild(navElement);
    navContainer.appendChild(dropdown);
}

const logOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("2FA");
    window.location.href = "http://127.0.0.1:5500/html/auth/login.html";
}

const renderNavProfiles = (profileId) => {
    const navElement = document.createElement('ul');
    navElement.classList.add('nav', 'col-lg-auto', 'me-lg-auto', 'justify-content-center');

    // Create inicio link
    const homeLink = document.createElement('a');
    homeLink.href = 'http://127.0.0.1:5500/html/index.html?c=1';
    homeLink.classList.add('nav-link', 'px-2', 'link-light', 'fw-bold');
    homeLink.textContent = 'Inicio';

    const homeListItem = document.createElement('li');
    homeListItem.appendChild(homeLink);

    // Create video link
    const videoLink = document.createElement('a');
    videoLink.href = 'http://127.0.0.1:5500/html/videos/playlists.html?c=home&key=' + profileId;
    videoLink.classList.add('nav-link', 'px-2', 'link-light', 'fw-bold');
    videoLink.textContent = 'Playlists';

    const videoListItem = document.createElement('li');
    videoListItem.appendChild(videoLink);

    // Create search input
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.classList.add('form-control', 'bg-transparent', 'text-light');
    searchInput.placeholder = "Buscar videos";
    searchInput.setAttribute('aria-label', "Buscar videos");
    searchInput.setAttribute('aria-describedby', "button-addon2");
    searchInput.id = 'search-input';

    // Create search button
    const searchButton = document.createElement('button');
    searchButton.classList.add('btn', 'btn-outline-info');
    searchButton.setAttribute('type', 'button');
    searchButton.id = 'button-addon2';
    searchButton.setAttribute('data-profile', `${profileId}`);
    // Aquí agregamos el icono de búsqueda dentro del botón
    searchButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
        </svg>
    `;

    // Create div to wrap input and button
    const searchInputGroup = document.createElement('div');
    searchInputGroup.classList.add('input-group', 'mb-3', 'text-light');
    searchInputGroup.appendChild(searchInput);
    searchInputGroup.appendChild(searchButton);

    // Create list item for search input group
    const searchListItem = document.createElement('li');
    searchListItem.appendChild(searchInputGroup);

    // Add list items to navigation
    navElement.appendChild(homeListItem);
    navElement.appendChild(videoListItem);

    const navContainer = document.getElementById('nav');
    navContainer.appendChild(navElement);
    navContainer.appendChild(searchListItem);
}