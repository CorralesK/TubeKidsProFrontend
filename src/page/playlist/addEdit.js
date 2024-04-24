if (context == "f") {
    /**
     * Extracts video ID from current URL parameters.
     * @returns {string} Extracted video ID or null if not found.
     */
    const getID = () => {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        return params.get('id');
    }

    /**
     * Displays the form to add or edit a video.
     */
    const showForm = async () => {
        container.innerHTML = "";
        renderNavManager();
        renderHeader("Añadir  Playlist");

        await get()
            .then(profiles => {
                renderFormPlaylist(profiles);
                addPlaylistFormListener();
            })
            .catch(error => {
                document.getElementById("message").style.display = 'block';
                document.getElementById("message").textContent = "No hay perfiles registrados para esta cuenta, para comenzar registre uno!!!";
            });

        if (getID()) {
            await getPlaylist(getID()).then(playlist => {
                loadPlaylist(playlist);
            })
                .catch(error => {
                    errorContainer.innerHTML = '<div class="alert text-danger"> La playlist no fue encontrada. Vuelva a intentarlo más tarde. </div>';
                });
        }
    }

    const addPlaylistFormListener = () => {
        document.getElementById('playlist-form').addEventListener('submit', (e) => {
            e.preventDefault();

            const data = {
                id: document.getElementById('save-btn').getAttribute('data-id'),
                name: document.getElementById('name').value
            };

            // Obtener los ID de los perfiles seleccionados
            const selectedProfiles = Array.from(document.querySelectorAll('input[type=checkbox]:checked'))
                .map(checkbox => checkbox.value);

            if (selectedProfiles.length === 0) {
                document.getElementById('profilesError').style.display = "block";
                return;
            }

            data.profiles = selectedProfiles;

            savePlaylist(data)
                .then(() => {
                    document.location.href = "http://127.0.0.1:5500/html/videos/playlists.html?c=admin";
                })
                .catch(error => {
                    let errorMessage = '';
                    if (error.status === 404) {
                        errorMessage = 'No se ha encontrado la playlist.';
                    } else if (error.status === 422) {
                        errorMessage = 'Ha ocurrido un error al guardar los cambios.';
                    } else {
                        errorMessage = 'Algo ha salido mal. Vuelva a intentarlo más tarde.';
                    }
                    errorContainer.innerHTML = `<div class="alert text-danger">${errorMessage}</div>`;
                });
        });
    }

    showForm();
}