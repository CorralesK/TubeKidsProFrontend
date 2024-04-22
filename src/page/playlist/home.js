const errorContainer = document.getElementById('error-container');

/**
 * Check if there is an active session token stored in sessionStorage. If not, redirect the user to the login page.
 */
if (sessionStorage.getItem("token") == null) {
    window.location.href = "http://127.0.0.1:5500/html/auth/login.html";
}

/**
 * Extracts the context identifier ('c') from the query parameters of the current URL.
 *
 * @returns {string|null} The context identifier ('c') or `null` if not found.
 */
const getContext = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return params.get('c');
}

const getID = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return params.get('key');
}

const context = getContext();


// Playlists Page
if (context === "home") {
    /**
     * Fetches and displays profile playlists.
     *  - Clears container, renders header.
     *  - Renders playlist on success, error messages otherwise.
     */
    const showPlalists = async () => {
        container.innerHTML = "";
        renderNavProfiles(getID());
        renderHeader("Bienvenido!");

        await getByProfile(getID())
            .then(playlists => {
                renderPlaylists(playlists);

                const lists = document.querySelectorAll('.card-playlist');
                lists.forEach(cardList => {
                    const cardLink = cardList.querySelector('.card-link');
                    if (cardLink) {
                        cardLink.href += "&p=" + getID();
                    }
                });
            })
            .catch(error => {
                document.getElementById("message").style.display = 'block';
                document.getElementById("message").textContent = "No hay playlists registradas para este perfil";
                console.log(error);
            });
    }
    showPlalists();
}